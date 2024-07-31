const { getDatabase } = require('./db');

async function getArticles() {
    try {
        const db = getDatabase();
        if (!db) {
            throw new Error('Database not connected');
        }
        const articles = await db.collection('articles').find().toArray();
        return articles;
    } catch (err) {
        console.error('Error fetching articles:', err.message);
        throw err;
    }
}

async function getVideos() {
    try {
        const db = getDatabase();
        if (!db) {
            throw new Error('Database not connected');
        }
        const videos = await db.collection('videos').find().toArray();
        return videos;
    } catch (err) {
        console.error('Error fetching videos:', err.message);
        throw err;
    }
}

async function getEntries() {
    try {
        const db = getDatabase();
        if (!db) {
            throw new Error('Database not connected');
        }
        const entries = await db.collection('journalEntries').find().toArray();
        return entries;
    } catch (err) {
        console.error('Error fetching entries:', err.message);
        throw err;
    }
}

module.exports = { getArticles, getVideos, getEntries };
