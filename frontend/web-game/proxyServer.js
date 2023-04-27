const PORT = 8000;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/getFilmPair", async (req, res) => {
    try {
        const response = await axios.get(
            "https://letterboxd-scraped-server.up.railway.app/api/films?twoFilmsWithDifferentRatings=true",
            {
                headers: {
                    "API-Key": process.env.API_KEY,
                },
            }
        );
        const filmsData = response.data;
        res.send(filmsData);
    } catch(err) {
        console.log(err);
    }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
