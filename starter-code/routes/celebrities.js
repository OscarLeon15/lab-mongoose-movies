const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  console.log('------------------------')
  console.log(req.session)
  Celebrity.find()
  .then((result)=>{
    // console.log(result)

    res.render('celeb-views/list-of-celebs', {listOfCelebs: result, user: req.session.currentlyLoggedIn});
  })
  .catch((err)=>{
    next(err);
  })
});


router.get('/details/:idVariable', (req, res, next)=>{
const theID = req.params.idVariable;

Celebrity.findById(theID)
.then((result)=>{
  res.render('celeb-views/celeb-details', {theSingleCelebrity: result})
})
.catch((err)=>{
  next(err)
})
})


router.get('/create', (req, res, next)=>{
  res.render('celeb-views/celeb-creation')
  //res render take a relative path as the argument
})


router.post('/creation', (req, res, next)=>{
  let newName = req.body.theName;
  let newJob = req.body.theOccupation;
  let newPhrase = req.body.theCatchphrase;


    Celebrity.create({
      name: newName,
      occupation: newJob,
      catchphrase: newPhrase
    })
    .then((result)=>{

      res.redirect('/celebrities')
      //res redirect take a url as the argument

    })
    .catch((err)=>{
      next(err)
    })
})


router.post('/:id/destroy', (req, res, next)=>{
  const id=req.params.id;

  Celebrity.findByIdAndRemove(id)
  .then(()=>{
    res.redirect('/celebrities')
  })
  .catch((err)=>{
    next(err);
  })
})


router.get('/edit/:id', (req, res, next)=>{
  Celebrity.findById(req.params.id)
  .then((result)=>{
    res.render('celeb-views/edit', {theCelebrity: result})
  })
  .catch((err)=>{
    next(err)
  })

})

router.post('/update/:id', (req, res, next)=>{

  Celebrity.findByIdAndUpdate(req.params.id,req.body)
  .then(()=>{
    res.redirect('/celebrities/details/'+req.params.id)
  })
 .catch((err)=>{
   next(err)
 })
 
//  Celebrity.findByIdAndUpdate(id, 
  //{
//   name: req.body.name,
//   occupation: req.body.occupation,
//   catchphrase: req.body.catchphrase
// } this is the update we want to do so we just send req.body directly instead to be fancy but this is what is actually happening
//  )
})

module.exports = router;
















// const express = require("express");
// const router = express.Router();
// // require Author model in orderr to use it for CRUD
// const Celebrity = require("../models/Celebrity");

// router.get("/celebrities", (req, res, next) => {
//   Celebrity
//   .find()                               //"celebrities" come from the collection on the DB
//   .then(celebritiesFromDB => res.render("celebrities", {celebrities: celebritiesFromDB} ))
//   .catch(err => console.log("error while getting the celebrities from the DB: ", err))
// })

// router.post('/celebrities/create', (req, res, next) => {
//   Celebrity
//   .create(req.body)
//   .then(newCeleb => {res.redirect("/celebrities")})
//   .catch(err => console.log("error while creating the Celebs: ", err));

// });




// module.exports = router;

