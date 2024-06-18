
// const puppeteer = require('puppeteer');

// let articlesCache = [];

// const scrapeMedium = async (topic) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(`https://medium.com/search?q=${topic}`);

//     const articles = await page.evaluate(() => {
//         const articleNodes = document.querySelectorAll('article');
//         return Array.from(articleNodes).slice(0, 5).map(article => {
//             const title = article.querySelector('h2') ? article.querySelector('h2').innerText.trim() : '';
//             const author = article.querySelector('p') ? article.querySelector('p').innerText.trim() : '';
//             const pubDate = article.querySelector('span') ? article.querySelector('span').textContent.trim() : '';
//             const url = article.querySelector('a') ? article.querySelector('a').href : '';
//             return { title, author, pubDate, url };
//         });
//     });

//     await browser.close();

//     articlesCache = articles;
//     return articles;
// };

// const getArticles = () => {
//     return articlesCache;
// };

// module.exports = {
//     scrapeMedium,
//     getArticles
// };

const puppeteer = require('puppeteer');

const scrapeMedium = async (topic) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://medium.com/search?q=${topic}`;

    await page.goto(url);

    const articles = await page.evaluate(() => {
        const articleNodes = document.querySelectorAll('article');
        return Array.from(articleNodes).slice(0, 5).map(article => {
            const title = article.querySelector('h2') ? article.querySelector('h2').innerText.trim() : '';
            const author = article.querySelector('p') ? article.querySelector('p').innerText.trim() : '';
            const pubDate = article.querySelector('span') ? article.querySelector('span').textContent.trim() : '';
            const url = article.querySelector('a') ? article.querySelector('a').href : '';
            return { title, author, pubDate, url };
        });
    });

    await browser.close();

    return articles;
};

module.exports = {
    scrapeMedium
};
