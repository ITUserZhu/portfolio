const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  subtitle: String,
  bio: String,
  avatar: String,
  location: String,
  email: String,
  github: String,
  linkedin: String,
  resume: String,
  stats: {
    yearsExp: String,
    projects: String,
    clients: String,
    coffee: String,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
