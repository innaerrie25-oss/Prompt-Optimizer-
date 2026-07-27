import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Please enter a prompt." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing from Vercel." }, { status: 500 });
    }

    const cleanApiKey = apiKey.trim();

    const systemInstruction = `You are a world-class Expert Prompt Engineer. The user will provide a simple, vague, or poorly written prompt in any language. Your task is to deeply analyze their intent and rewrite their request into a highly optimized, single-shot prompt using the exact 5-part structure:

### Act as:
[Assign the perfect expert persona]

### Context:
[Infer the background, situation, or target audience based on their request]

### Task:
[Define the exact objective using strong action verbs]

### Constraints:
[Set strict rules, tone of voice, formatting limits, and things to avoid]

### Format:
[Specify the best visual layout for the output, like a table, markdown, code block, etc.]

Rules:
- Output the final engineered prompt clearly formatted in Markdown.
- Match the language used by the user.
- Output ONLY the 5-part engineered prompt. Do not add conversational intro/outro comments.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${cleanApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\nUser Input Prompt: "${prompt}"` }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Google says: " + (data.error?.message || "Unknown error") },
        { status: 400 }
      );
    }

    const outputText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate prompt.";

    return NextResponse.json({ result: outputText });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

