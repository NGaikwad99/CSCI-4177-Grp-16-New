const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: String, required: false},
  userId: { type: String, required: false },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Entry', EntrySchema);
