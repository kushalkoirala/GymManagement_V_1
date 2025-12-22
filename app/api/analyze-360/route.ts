import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { before, after } = await req.json();

    if (!before || !after)
      return Response.json(
        { success: false, message: "Missing images" },
        { status: 400 }
      );

    const ai = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are a professional body transformation analyst.
Compare BEFORE vs AFTER using 4 angles: Front, Right Side, Back, Left Side.
Rules:
- Analyze ONLY fitness visible changes
- Comment on fat loss, muscle gain, tone, shape, symmetry and posture
- Be encouraging but realistic
- Do NOT mention medical claims
- Give structured report
`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze 360 degree full body transformation using these angles." },

            { type: "text", text: "BEFORE - FRONT" },
            { type: "image_url", image_url: { url: before.front } },

            { type: "text", text: "BEFORE - RIGHT" },
            { type: "image_url", image_url: { url: before.right } },

            { type: "text", text: "BEFORE - BACK" },
            { type: "image_url", image_url: { url: before.back } },

            { type: "text", text: "BEFORE - LEFT" },
            { type: "image_url", image_url: { url: before.left } },

            { type: "text", text: "AFTER - FRONT" },
            { type: "image_url", image_url: { url: after.front } },

            { type: "text", text: "AFTER - RIGHT" },
            { type: "image_url", image_url: { url: after.right } },

            { type: "text", text: "AFTER - BACK" },
            { type: "image_url", image_url: { url: after.back } },

            { type: "text", text: "AFTER - LEFT" },
            { type: "image_url", image_url: { url: after.left } }
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
