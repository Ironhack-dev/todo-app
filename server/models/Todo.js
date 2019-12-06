const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  done: { type: Boolean, default: false}
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      return ret;
    }
  }
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;