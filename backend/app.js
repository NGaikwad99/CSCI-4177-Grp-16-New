//authors: Devon Turple B00851220,
const express = require('express'); //instance of an express application is created
const cors = require('cors');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const collectionName = 'users';
const bcrypt = require('bcrypt');
const User = require('./models/User');
const { getArticles, getVideos, getEntries } = require('./backendFunctions');

const MONGO_URI = 'mongodb+srv://admin:hm8KzxFO1RX4qArn@ssdata.tcuzl0t.mongodb.net/safespace?retryWrites=true&w=majority&appName=ssdata';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

function startServer(server, db){
    const app = express();
    app.use(cors());
    app.use(express.json());

    const crypto = require('crypto');

    const secret = crypto.randomBytes(64).toString('hex');
    console.log(secret);
    
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.collection(collectionName).findOne({ username });
            if (!user) return res.status(400).send('Invalid credentials');

           
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).send('Invalid credentials');

            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '5h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });

    app.post('/register', async (req, res) => {
        const { name, email, username, password, role } = req.body;

        // hashing password for secure storage
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User({ name: name, email: email, username: username, password: hashedPassword, role: role });

        try {
            await newUser.save();
            console.log('User saved successfully');
            res.status(201).send('User registered');
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send('Error registering user', error);
        }
    });

    app.put('/resetPassword', async (req, res) => {
        const { username, password } = req.body;
        
        try {
            // Find the user by username
            const user = await db.collection(collectionName).findOne({ username });
            if (!user) return res.status(400).send('User does not exist');
            
            // Hash the new password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // Update the user's password
            await db.collection(collectionName).updateOne(
                { username },
                { $set: { password: hashedPassword } }
            );
            
            res.status(200).json({ success: true, message: 'Password updated successfully!' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });    

    app.get('/articles', async (req, res) => {
        try {
            const articles = await getArticles();
            res.status(200).json(articles);
        } catch (err) {
            res.status(500).send('Error retrieving articles');
        }
    });
    
    app.get('/videos', async (req, res) => {
        try {
            const videos = await getVideos();
            res.status(200).json(videos);
        } catch (err) {
            res.status(500).send('Error retrieving videos');
        }
    });
    
    app.get('/journalEntries', async (req, res) => {
        try {
            const entries = await getEntries();
            res.status(200).json(entries);
        } catch (err) {
            res.status(500).send('Error retrieving entries');
        }
    });

    app.get('/journalEntries/:id', async (req, res) => {
        try{
            const entries = await db.collection('journalEntries').findOne({_id: new ObjectId(req.params.id)});
            res.status(201).json(entries);
        } catch(err){
            res.status(500).json({success: false, message: err.message});
        }

    });


    app.post('/newEntry', async (req, res) => {
        const { title, text } = req.body;

        const newEntry = new Entry({ title:title, text:text });
        try {
              const newEntry = await db.collection('journalEntries').insertOne(req.body);
            res.status(200).json(entries);
        } catch (err) {
            res.status(500).send('Error adding entries');
        }
    });


    server.on('request', app);
}

module.exports = {startServer};