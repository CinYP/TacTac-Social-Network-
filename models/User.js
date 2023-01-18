const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
     // match: 
      //use regex here 
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    thoughts: [
        {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',  
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function (){
    return this.friends.length; 
});

const User = model('user', userSchema);

module.exports = User;
