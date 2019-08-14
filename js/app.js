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

Animal.prototype.renderWithJquery = function(){
  const $myTemplate = $('#animal-template');
  const myTemplateHtml = $myTemplate.html();

  const $newSection = $('<section></section>')
  $newSection.html(myTemplateHtml);

  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('#pic-title').text(this.title);
  $newSection.find('#descriptor').text(this.description);
  $newSection.find('#keyword').text(this.keyword);
  $newSection.find('#horns').text(this.horns);
  
  $('main').append($newSection);
}


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