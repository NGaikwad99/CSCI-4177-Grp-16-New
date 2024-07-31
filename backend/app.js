const express = require('express'); //instance of an express application is created
const cors = require('cors');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const collectionName = 'users';
const bcrypt = require('bcrypt');
const User = require('./models/User');
const { getDatabase } = require('./db');
const { getArticles, getVideos } = require('./OnlineResources');


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
    
            const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '5h' });
            res.json({ token, role: user.role });
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

 // Meeting scheduler routes
 app.get('/users', async (req, res) => {
    try {
        const db = getDatabase();
        const users = await db.collection('users').find().toArray();
        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users: users
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

  app.post('/meetings/schedule', async (req, res) => {
    try {
      const db = getDatabase();
      if (!db) {
        return res.status(500).json({ message: 'Database connection failed' });
      }

      const { date, person, type, userType } = req.body;
      const formattedDate = new Date(date).toLocaleDateString();

      const isDuplicate = await db.collection('meetings').findOne({
        date: formattedDate,
        person: person,
        userType: userType
      });

      if (isDuplicate) {
        return res.status(400).json({ message: 'The same person cannot book an appointment on the same day twice.' });
      }

      const meeting = {
        date: formattedDate,
        person,
        type,
        userType
      };

      const result = await db.collection('meetings').insertOne(meeting);

      if (!result || !result.insertedId) {
        throw new Error('Meeting insertion failed');
      }

      res.status(201).json({
        _id: result.insertedId,
        ...meeting
      });
    } catch (err) {
      res.status(500).json({ message: 'Error scheduling meeting', error: err.message });
    }
  });

  app.get('/meetings/user/:userType', async (req, res) => {
    try {
      const db = getDatabase();
      if (!db) {
        return res.status(500).json({ message: 'Database connection failed' });
      }

      const meetings = await db.collection('meetings').find({ userType: req.params.userType }).toArray();
      res.status(200).json(meetings);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching upcoming meetings', error: err.message });
    }
  });

  app.put('/meetings/reschedule/:id', async (req, res) => {
    try {
      const db = getDatabase();
      if (!db) {
        return res.status(500).json({ message: 'Database connection failed' });
      }

      const { date, person, type, userType } = req.body;
      const formattedDate = new Date(date).toLocaleDateString();

      const isDuplicate = await db.collection('meetings').findOne({
        date: formattedDate,
        person: person,
        userType: userType,
        _id: { $ne: new ObjectId(req.params.id) }
      });

      if (isDuplicate) {
        return res.status(400).json({ message: 'The same person cannot book an appointment on the same day twice.' });
      }

      const meeting = {
        date: formattedDate,
        person,
        type,
        userType
      };

      const result = await db.collection('meetings').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: meeting }
      );

      if (!result || result.modifiedCount === 0) {
        throw new Error('Meeting rescheduling failed');
      }

      res.status(200).json(meeting);
    } catch (err) {
      res.status(500).json({ message: 'Error rescheduling meeting', error: err.message });
    }
  });

  app.delete('/meetings/cancel/:id', async (req, res) => {
    try {
      const db = getDatabase();
      if (!db) {
        return res.status(500).json({ message: 'Database connection failed' });
      }

      console.log(`Cancelling meeting with _id: ${req.params.id}`);
      const result = await db.collection('meetings').deleteOne({ _id: new ObjectId(req.params.id) });

      if (!result || result.deletedCount === 0) {
        throw new Error('Meeting cancellation failed');
      }

      res.status(200).json({ message: 'Meeting cancelled successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error canceling meeting', error: err.message });
    }
  });

  server.on('request', app);
}

module.exports = { startServer };