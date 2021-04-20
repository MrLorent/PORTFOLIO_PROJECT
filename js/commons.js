"use strict"

// CONSTANTES
var SKILLS_SECTION;
var SKILL_SECTION;
var GALLERY_SECTION;
var PROJECT_SECTION;

// METHODES
function removeAllChildren(parent){
    if(parent.firstElementChild){
        do{
            parent.removeChild(parent.firstElementChild);
        }while(parent.firstElementChild);
    }
}

function generateBackButton(currentSection){
    var backButton = document.createElement('span');
    backButton.classList.add('back_button');
    backButton.innerHTML = '< BACK';
    backButton.addEventListener('click',()=>{
        displayOrHideSection(currentSection);
    });
    currentSection.append(backButton);
}

function displayOrHideSection(section){
    let body = document.querySelector('body');

    section.classList.toggle('displayed');
    body.classList.toggle('locked');
}