const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: String,
  icon: String,
  items: [
    {
      name: String,
      level: Number,
      color: String,
    },
  ],
});

module.exports = mongoose.model('Skill', skillSchema);
