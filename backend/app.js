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
        const { message } = request.body;
        if(!message) return response.status(400).json({ error: "message is required" });

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: message }],
        });

        const reply = completion.choices[0].message.content;
        response.json({ reply });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
});

export default app;