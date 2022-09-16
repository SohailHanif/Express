const _ = require("lodash")
const Person = require("./person")

const person1 = new Person("John Smith", 25)

// Create array of people
let people = [
    person1,
    new Person("Jane Smith", 23),
    new Person("Kevin Smith", 20),
    new Person("Fred Smith", 20)
]

// console.log(person1)
// console.log(people)
// person1.greeting()
// people[2].greeting()

// For loop over people
for (const person_obj of people){
    person_obj.greeting()
}

random_person = _.sample(people)
// console.log(random_person)
// random_person.greeting()


person1_index = _.findIndex(people, person1)
random_person_index = _.findIndex(people, random_person)

// console.log(person1_index)
// console.log(random_person_index)
// people[random_person_index].greeting()


var sliced_array = _.take(people, 2)
console.log(sliced_array)


// different_people = _.difference(people, [person1, random_person])
// console.log(different_people)

// var concat_array = _.concat(people, [person1, random_person])
// console.log(concat_array)

var union_array = _.union(people, sliced_array)
console.log(union_array)

today = Date.now()
christmas = new Date("2022/12/25")
console.log((christmas.getTime() - today) / (1000 * 24 * 60 * 60))