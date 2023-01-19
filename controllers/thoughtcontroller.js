const { Thought, User } = require('../models');

module.exports = {
  // Get all thought
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
            {
                _id: req.params.thoughtId,
            },
            {
               $push: {thoughts: thoughts._id},
            },
            {
                new: true,
            }
        );
      }
        )
        .then((user) => {
            if (!user){
                return res.status(404).json({ message: 'thought created but no user decided'});
            }
            res.json({
                message: "thought successfully created"
            })
        })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : user.deleteMany({ _id: { $in: thoughts.user } })
      )
      .then(() => res.json({ message: 'Thought amd user have been deleted! :0' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId },
      {
         $set: req.body 
        },
      { runValidators: true, 
        new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add reaction 
  addReaction(req, res){
    console.log('You are adding a reaction!');
    console.log(req.body);
    reactionSchema.findOneAndUpdate(
        {_id: req.params.reactionId},
        { $addToSet: {reactions: req.params.reactionId}}
        {new: true}
    )
    .then((thoughts) =>
    !thoughts
    ? res
        .status(404)
        .json({ message: 'No reaction with this id!' })
    : res.json(thought)
    )
    .catch(err => res.status(500).json(err));
  }

  // delete reaction
};
