const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Students').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Students').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createStudent = async (req, res) => {
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    studentLevel: req.body.studentLevel
  };
  const response = await mongodb.getDb().db().collection('Students').insertOne(student);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the student.');
  }
};

const updateStudent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    studentLevel: req.body.studentLevel
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Students')
    .replaceOne({ _id: userId }, student);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the student.');
  }
};

const deleteStudent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('Students').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the student.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};