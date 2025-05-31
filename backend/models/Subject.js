const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  year: Number,
  semester: Number,
  branch: String,
  subjectName: String,
  // add other fields
});

module.exports = mongoose.model('Subject', SubjectSchema);
