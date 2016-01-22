//get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//set up mongoose model and pass it using module.exports
var ScheduleSchema = new mongoose.Schema({
  worker: String, //_id
  workerName: String, //full name or nickname
  task: String,
  subtask: String, //can be a css class?
  start: Number, //store as "seconds since midnight jan, 1, 1970"
  finish: Number, //by using new Date("November 27, 2016 09:15:00").getTime();
  cat: Date, //date the register was created
  mat: Date  //date it was last modified
});
