require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Create a person schema called personSchema
const personSchema = new mongoose.Schema({
  // A required name field of type String
  name: {
    type: String,
    required: true
  },
  // An age field of type Number
  age: Number,
  // A favoriteFoods field of type [String]
  favoriteFoods: [String]
});

// Create a model from the personSchema and assign it to Person
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  // Create a document instance using the Person model constructor
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["pizza", "pasta"]
  });

  // Call the method document.save() on the returned document instance
  // Pass to it a callback using the Node convention
  person.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    
    person.favoriteFoods.push(foodToAdd);
    
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
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