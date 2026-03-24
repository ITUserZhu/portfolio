const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  image: String,
  github: String,
  demo: String,
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Project', projectSchema);
