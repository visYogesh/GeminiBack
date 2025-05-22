import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || "AIzaSyC-BDD6OlV2-CVyURebS1Yxx_48AmfXAlo"
});

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const model = "gemini-2.0-flash-001";
    const result = await ai.models.generateContent({
      model,
      contents: prompt
    });

    res.json({ response: result.text });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
