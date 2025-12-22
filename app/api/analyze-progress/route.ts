import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { beforeUrl, afterUrl, bodyPart } = await req.json();

    if (!beforeUrl || !afterUrl || !bodyPart)
      return Response.json(
        { success: false, message: "Missing required data" },
        { status: 400 }
      );

    const ai = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a highly skilled fitness progress analyzer. You ONLY analyze the mentioned body part. Compare two human body photos and describe visible improvements in muscle size, definition, fat reduction, tone and posture. Be honest, safe, and motivating. No medical claims."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze progress for ONLY this body part: ${bodyPart}. Focus only on this body area.`
            },
            { type: "image_url", image_url: { url: beforeUrl } },
            { type: "image_url", image_url: { url: afterUrl } }
          ]
        }
      ]
    });

    return Response.json({
      success: true,
      analysis: ai.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "AI failed" },
      { status: 500 }
    );
  }
}
