require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("Connected databases"))
  .catch((err)=>console.log(err))

const personSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchemas);


const createAndSavePerson = (done) => {
  Person = new Person({name: "Peter Smith", age: 34, favoriteFoods: ["rice", "chicken", "banana","fresh fruit"]});

  Person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: "Joe", age: 23, favoriteFoods: ["rice","eggs","tomatoes"]},
  {name: "Sofie", age: 46, favoriteFoods: ["potatoes","roast chicken","fresh fruit"]},
  {name: "Jhon", age: 52, favoriteFoods: ["beans","eggs","banana"]}
];

const createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
};

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
    });
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById(personId, function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = 'hamburger';

    // .findById() method to find a person by _id with the parameter personId as search key. 
    Person.findById(personId, (err, person) => {

        if(err) return console.log(err); 
    
        // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
        Person.favoriteFoods.push(foodToAdd);

        // and inside the find callback - save() the updated Person.
        Person.save((err, updatedPerson) => {
          if(err) return console.log(err);
          done(null, updatedPerson)
        })
    })
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    })
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove( personId, (err, removedDoc) => {
        if(err) return console.log(err);
        done(null, removedDoc);
      }
    ); 
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, (err, response) => {
      if(err) return console.log(err);
      done(null, response);
    })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })            //1 ascending, -1 descending.
      .limit(2)                     //limit of 2 items.
      .select({ name: 1, age: 0 })  // 0 = false and thus hide property; 1 = true property will be show.
      .exec(function(err, people) {
          if(err) return console.log(err);
          done(err, people)
      })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
