export const runtime = "nodejs";

import { NextResponse } from "next/server";
import sharp from "sharp";

// ======================
// 🔒 DAILY LIMIT CONFIG
// ======================
const DAILY_LIMIT = 5;

// In-memory usage tracker (MVP)
const usageMap = new Map<string, { count: number; date: string }>();

// ======================
// 🔁 RETRY CONFIG
// ======================
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000;
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function POST(req: Request) {
  try {
    // ======================
    // 📩 READ FORM DATA
    // ======================
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // ======================
    // 🔍 DAILY LIMIT CHECK
    // ======================
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const today = new Date().toISOString().slice(0, 10);
    const usage = usageMap.get(ip);

    if (!usage || usage.date !== today) {
      usageMap.set(ip, { count: 1, date: today });
      console.log(`🆕 ${ip} → 1/${DAILY_LIMIT}`);
    } else {
      if (usage.count >= DAILY_LIMIT) {
        console.warn(`🚫 Daily limit reached for ${ip}`);
        return NextResponse.json(
          { error: "Daily scan limit reached. Try again tomorrow." },
          { status: 429 }
        );
      }
      usage.count += 1;
      console.log(`📈 ${ip} → ${usage.count}/${DAILY_LIMIT}`);
    }

    // ======================
    // 🖼️ IMAGE RESIZE
    // ======================
    const arrayBuffer = await file.arrayBuffer();
    const originalBuffer = Buffer.from(arrayBuffer);

    const resizedBuffer = await sharp(originalBuffer)
      .resize({ width: 768, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    console.log(
      "Image size (KB):",
      Math.round(originalBuffer.length / 1024),
      "→",
      Math.round(resizedBuffer.length / 1024)
    );

    const base64Image = resizedBuffer.toString("base64");

    // ======================
    // 🤖 OPENAI CALL (WITH RETRY)
    // ======================
    let lastError: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.1,
            max_tokens: 2048,
            messages: [
              {
                role: "system",
                content: "You are a nutrition expert specializing in Indian cuisine.",
              },
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `
Analyze the food image and return ONLY valid JSON.

Format:
{
  "foods": [
    {
      "name": "",
      "hindiName": "",
      "portion": "",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number
    }
  ],
  "total": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },
  "confidence": "low | medium | high",
  "notes": ""
}
`,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/jpeg;base64,${base64Image}`,
                    },
                  },
                ],
              },
            ],
          }),
        });

        if (response.status === 429 || response.status === 503) {
          if (attempt < MAX_RETRIES) {
            console.warn(`⏳ Retry ${attempt + 1}`);
            await sleep(RETRY_DELAY);
            continue;
          }
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error?.message || "OpenAI request failed");
        }

        const text = data.choices?.[0]?.message?.content;
        if (!text) {
          throw new Error("OpenAI returned no content");
        }

        // ======================
        // 🧠 PARSE JSON
        // ======================
        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch {
          const match = text.match(/\{[\s\S]*\}/);
          if (!match) throw new Error("Invalid JSON returned by OpenAI");
          parsed = JSON.parse(match[0]);
        }

        if (!parsed.foods || !Array.isArray(parsed.foods)) {
          throw new Error("Invalid JSON structure");
        }

        console.log("✅ Food analysis successful");
        return NextResponse.json(parsed);
      } catch (err: any) {
        lastError = err;
        console.error(`❌ Attempt ${attempt + 1} failed:`, err.message);
        if (attempt === MAX_RETRIES) throw err;
        await sleep(RETRY_DELAY);
      }
    }
  } catch (err: any) {
    console.error("🔥 FINAL ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Analysis failed after multiple attempts" },
      { status: 500 }
    );
  }
}
