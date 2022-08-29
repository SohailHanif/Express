// Import Lodash
const _ = require('lodash');
const Person = require("./person")

const person1 = new Person("John Smith", 25)

// Create array of people
let people = [
    person1,
    new Person("Jane Smith", 23),
    new Person("Kevin Smith", 20),
    new Person("Fred Smith", 20)
]

// console.log("Hello World!")
person1.greeting()

// Get random person from array using lodash
random_person = _.sample(people)
console.log(random_person)
random_person.greeting() 

// Use findIndex to get index of queried object/value
person1_index = _.findIndex(people, person1);
random_person_index = _.findIndex(people, random_person);

// console.log(person1_index)
// console.log(random_person_index)

// Get difference between people array and provided array
difference = _.difference(people, [person1, random_person])
console.log(difference)