const express = require('express');     //Framework for server-side
const cors = require('cors');           //To exchange data with the client
const app = express();                  //As a Framework
// const lowDb = require('lowdb');         //To build local database at JSON file
// const FileSync = require('lowdb/adapters/FileSync');
// const db = lowDb(new FileSync('db.json'));
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Bullettime:230595lll@gettingstarted.shpux.mongodb.net/app_subscribers?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log("Connected to MongoDB") },

  err => { console.log("Failed to connect Mongo", err.message) }
);
const db = mongoose.connection;

const subscriberSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    email: String,
    password: String,
    _id: mongoose.Schema.Types.ObjectId
});

const Sub = mongoose.model('Sub', subscriberSchema);


// const subsData = db.get('subscribers').value();

// db.defaults({
//   subscribers: []= [
//     {
//       "firstName": "Arnold",
//       "lastName": "Swartzneger",
//       "gender": "male",
//       "age": "73",
//       "email": "qwerty@mail.ru",
//       "password": "qwety123"
//     }
//   ]
// }).write();

app.use(express.json());              //Handle JSON parse
app.use(cors());

app.get('/api/subscribers', (req, res) => {
//   Sub.find({}).exec(function(err, subs) {
//       if (err) throw err;
//       res.send(subs);
  Sub.find().where('createdDate').exec(function(err, subs) {
    if (err) throw err;

    res.send(subs);
    res.end(console.log("Subscribers're sent"));
    });

});

app.post('/api/subscribers/new', (req, res) => {
    const newSub = new Sub ({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      _id: new mongoose.Types.ObjectId(),
    });
    newSub.save(function (err) {
      if (err) return handleError(err);
      // saved!
        console.log('Author successfully saved.');
    res.send(newSub);
  });
});

app.get('/', (req, res) => {
  res.send("Hello! I'm database serevr application.");
});



const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

// app.get('/api/subscribers', (req, res) => {
//
//   res.send(subsData);
//   res.end(console.log("Subscribers're sent"));
// });
//
// app.post('/api/subscribers/new', (req, res) => {
//     const newSub = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       gender: req.body.gender,
//       age: req.body.age,
//       email: req.body.email,
//       password: req.body.password
//     };
//     db.get('subscribers').push(newSub).write();
//     res.send(newSub);
// });
