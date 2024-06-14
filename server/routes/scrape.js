const express = require('express');
const { Router } = require('express');
const scraper = require('../services/scraper');

const scrapeRouter = Router();

scrapeRouter.post('/', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }
    try {
        const articles = await scraper.scrapeMedium(topic);
        res.json({ articles });
    } catch (error) {
        if (error.message.includes('No articles found')) {
            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

module.exports = { scrapeRouter };
