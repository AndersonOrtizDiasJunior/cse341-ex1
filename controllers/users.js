const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create
const addUser = async (req, res) => { 
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    
    mongodb.contacts().insertOne(user).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    })
};

// Read
const getAll = async (req, res) => {
    const result = await mongodb.contacts().find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        console.log(err);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.contacts().find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateUser = async (req, res) => { 
    const id = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    mongodb.contacts().replaceOne({_id: id}, user)
    .then( response => {
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else if (response.matchedCount < 1) {
            res.status(404).json(response.error || `Not found any Contact with id ${id}`);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    })
};

// Delete
const deleteUser = async (req, res) => { 
    const id = new ObjectId(req.params.id);

    mongodb.contacts().deleteOne({_id: id})
    .then( response => {
        console.log(response)
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    })
};


module.exports = {
    addUser,
    getAll,
    getSingle,
    updateUser,
    deleteUser
};