const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/ai-search", async (req, res) => {

    try {

        const userText = req.body.text;

        if (!userText) {
            return res.status(400).json({
                error: "No search text provided."
            });
        }

        const response = await openai.responses.create({

            model: "gpt-5.6-luna",

            input: `
You are helping a movie recommendation website.

The user wrote:
"${userText}"

Return ONLY valid JSON in this format:

{
  "type": "movie",
  "genres": [],
  "keywords": [],
  "year_min": null,
  "year_max": null
}

type must be:
"movie"
"tv"
or
"both"

Possible genres:
Action
Adventure
Animation
Comedy
Crime
Documentary
Drama
Family
Fantasy
History
Horror
Music
Mystery
Romance
Science Fiction
Thriller
War
Western
`

        });

        res.json({
            result: response.output_text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "AI request failed."
        });

    }

});


app.listen(3000, () => {

    console.log(
        "CineMind AI server running on http://localhost:3000"
    );

});