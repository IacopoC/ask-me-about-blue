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
            model: process.env.OPENAI_MODEL,
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
                        - Identify colors mentioned or suggested in your answer and return their HEX values, if no color is mentioned use a random blue.
                        Goal:
                        "Make each answer interesting, concise, and with a blue touch."`
                },
                ...messages
            ],

            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "blue_assistant_response",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            text: {
                                type: "string",
                                description: "The blue assistant's response to user."
                            },
                            colors: {
                                type: "array",
                                description: "Colors of the answer.",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                        },
                                        hex: {
                                            type: "string",
                                        }
                                    },
                                    required: ["name", "hex"],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ["text", "colors"],
                        additionalProperties: false
                    }
                }
            }
        });

        const data = JSON.parse(completion.choices[0].message.content);
        response.json(data);

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
});

export default app;