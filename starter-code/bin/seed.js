const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
const dbName = 'lab-moongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`);
const testing = [
  {
    name: "Sir Hans",
    occupation: "Tesla Man",
    catchPhrase: "How's it going bro?!"
  },
  {
    name: "Fabrico",
    occupation: "Beast Programmer",
    catchPhrase: "Very Easy"
  },
  {
    name: "Jesus",
    occupation: "Mankind Savior",
    catchPhrase: "What the fuck"
  }
]

// if there are some spelling mistakes make sure to ether delete the first objects in the
//database then (ctrl c) the go to the folder that has the seed.js in this case cd bin
// then type again "$node seed.js"
Celebrity.create(testing, (err) =>{
  if(err) { throw(err) }
  console.log(`Created ${testing.length} testing`)
  mongoose.connection.close();
})