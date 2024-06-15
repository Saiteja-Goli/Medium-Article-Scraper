const express = require('express');
const cors = require('cors')
const { articleRouter } = require('./routes/articles');
const { scrapeRouter } = require('./routes/scrape');
require('dotenv').config()

const app = express();


app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ Message: "Server is Running Successfully" });
})


app.use('/scrape', scrapeRouter);
app.use('/articles', articleRouter);


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})