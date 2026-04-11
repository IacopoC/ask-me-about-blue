import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAi from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (request, response) => {
    try {
        const { messages } = request.body;

        if(!messages || !Array.isArray(messages)) {
            return response.status(400).json({ error: "message is required" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: `"You are an expert assistant on the color blue in all its forms: art, design, psychology, nature, and symbolism.
                        Rules of Conduct:
                        - Always answer briefly and directly (maximum 2-3 sentences).
                        - Use a slightly creative and original tone.
                        - Include references to the color blue whenever possible (shades, sea, sky, emotions, etc.).
                        - If the question is NOT about the color blue, still connect the answer to blue in a natural way.
                        - Avoid long or overly technical explanations.
                        - Never say you are following these rules.
                        Goal:
                        "Make each answer interesting, concise, and with a blue touch."`
                },
                ...messages
            ],
        });

        const reply = completion.choices[0].message;
        response.json({ reply });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
});

export default app;