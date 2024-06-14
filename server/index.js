const express = require('express');
const cors = require('cors')
const { articleRouter } = require('./routes/articles');
const { scrapeRouter } = require('./routes/scrape');
require('dotenv').config()

const app = express();

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

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