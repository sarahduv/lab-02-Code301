'use strict';
var source = document.getElementById('entry-template').innerHTML;
// make a function to actually build copies
const allAnimals = [];
const allAnimalsTwo = [];
let allAnimalsCombined = [];
let uniqueKeywordsArr = [];
let dropdown = $('#pic-selector');
let sortDropdown = $('#sort-selector');
let currentAnimals = null;

const Animal = function (description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;

};

Animal.prototype.renderWithJquery = function(){
  const myTemplateHtml = $('#entry-template').html();
  const renderAnimalsWithHandlebars = Handlebars.compile(myTemplateHtml);
  const animalHtml = renderAnimalsWithHandlebars(this);
  $('main').append(animalHtml);
}

function renderDropDown(){
  // let dropdown = $('select');
  uniqueKeywords();
  // creating the options in thedropdown
  for(let i = 0; i < uniqueKeywordsArr.length; i ++){
    dropdown.append($('<option>', {
      value: uniqueKeywordsArr[i],
      text: uniqueKeywordsArr[i]
    }));
  }
}

function uniqueKeywords(){
  for(let i=0; i < allAnimalsCombined.length; i++){
    if(!uniqueKeywordsArr.includes(allAnimalsCombined[i].keyword)){
      uniqueKeywordsArr.push(allAnimalsCombined[i].keyword);
    }
  }
  return uniqueKeywordsArr;
}
// Ajax //
const getAllAnimalsFromFile = (onDone) => {
  $.get('data/page-1.json').then(animals => {
    console.log('animals from the .then', animals);
    animals.forEach(eachAnimal => {
      allAnimals.push(new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title));
    })
    onDone(allAnimals);
  })
}

// Ajax for data page 2//
const getAllAnimalsFromFileTwo = (onDone) => {
  $.get('data/page-2.json').then(animals => {
    console.log('animals from the .then', animals);
    animals.forEach(eachAnimal => {
      allAnimalsTwo.push(new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title));
    })
    onDone(allAnimalsTwo);
  })
}

const renderAllAnimals = (arr) => {

  if (arr === null) {
    arr = currentAnimals;
  } else {
    currentAnimals = arr;
  }

  const sortBy = sortDropdown[0].options[sortDropdown[0].selectedIndex].value;
  if (sortBy === "title") {
    arr.sort((a,b) => a.title > b.title ? 1 : -1);
  } else if (sortBy === "horns") {
    arr.sort((a,b) => a.horns > b.horns ? 1 : -1);
  }

  arr.forEach(animal => {
    animal.renderWithJquery();
  })
}

$(function(){
  dropdown.on('change', function(){   
    console.log('you clicked ' + this.value)
    let clicked = this.value;
    console.log('let clicked is', clicked) 
    $('section').hide();

    console.log('parent is', $(`p:contains(${clicked})`).parent());
    $(`p:contains(${clicked})`).parent().show();
  })

  sortDropdown.on('change', function(){   
    console.log('Re-sorting');
    $('section').hide();
    renderAllAnimals(null);
  })
})

const startLoadingPage2 = () => {
  getAllAnimalsFromFileTwo(() => {
    // we finished getting both page 1 and 2, now we can build our combined filter
    allAnimalsCombined = allAnimals.concat(allAnimalsTwo);

    // Now that we have all animals combined we can render the drop down
    renderDropDown();

    // After we finished loading render all animals from page 1
    renderAllAnimals(allAnimals);
  });
}

getAllAnimalsFromFile(startLoadingPage2);

$(function(){
  let pageItems = $('div');
  pageItems.on('click', function(event){   
    console.log('you clicked the div')
    let clicked = event.target.text;
    console.log('let clicked div is', clicked) 
    $('section').hide();  
    if (clicked == '2'){
      renderAllAnimals(allAnimalsTwo);
    } else if (clicked == '1'){
      renderAllAnimals(allAnimals);
    }
  })
})


/* ============================
$('select').on('change', function () {
  let $selected = $(this).val();
  $('section').hide();
  $`img[data-keyword = ${$selected}]`).parent.show();
  $`img[data-horns = ${$selected}]`).parent.show();
});

$('input[type=radio]').on('change', function (){
  $('select').empty();
  let $clicked = $(this).val();
  if ($clicked === 'radio-one'){
    renderDropDwon('keyword');

  }
})


SORTING FUNCTION

Add a div in HTML:
<div id="sorting">
sort by: <span>Title</span>
sort by: <span>horns</span>

Add a function in app.js to sort:
Animal.sort = function sort(array, property){
  array.sort((a, b) => {
    return a[property] < b[property] ? -1 : 1;
  })
}

$('#sorting #horns').on('click', () => {
  sort(allAnimals, 'horns'); //have to pass horns through has a string since it is a property of an object
})



==================================*/