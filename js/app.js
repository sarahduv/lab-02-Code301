'use strict';

const allAnimals = [];

const Animal = function (description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  allAnimals.push(this);
};




// Ajax
const getAllAnimalsFromFile = () => {
  $.get('data/page-1.json').then(animals => {
    console.log('animals from the .then', animals);

    animals.forEach(eachAnimal => {
      new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title);
    })

    allAnimals.forEach(animal => {
      animal.renderWithJquery();
    })
  })

}
getAllAnimalsFromFile();