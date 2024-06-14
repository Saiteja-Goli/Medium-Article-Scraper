const express = require('express');
const { Router } = require('express');
const scraper = require('../services/scraper');

const articleRouter = Router();

articleRouter.get('/', (req, res) => {
    res.json({ articles: scraper.getArticles() });
});

module.exports = { articleRouter };
