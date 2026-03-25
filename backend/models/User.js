const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['guest', 'user', 'admin'],
    default: 'user',
  },
  email: {
    type: String,
    sparse: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
  }],
  mastered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
  }],
}, {
  timestamps: true,
});

// 保存前加密密码
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// 校验密码
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// 返回 JSON 时隐藏密码
userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
