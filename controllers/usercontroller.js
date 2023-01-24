const { ObjectId } = require('mongoose').Types;
const { receiveMessageOnPort } = require('worker_threads');
const { User, Thought } = require('../models');


module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
    .select('-__v')
      .then(async (users) => {
       res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then( (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user and remove them from the course
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json(user); 
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // Delete a user and remove them from the thought
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({_id:{ $in:user.thoughts}})
      })
      .then(() =>{
          res.json({ message: 'user successfully deleted' })
          })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend to a user
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a user
  removeFriend(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friends: req.params.friendId } } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
