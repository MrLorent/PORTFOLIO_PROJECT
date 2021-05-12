<?php
// IMPORTATION DES MODELS
require_once('skillsModels.php');

// CONTROLEURS

function getAllSkillsByCategoryAsJSON(){
    $categories = getAllSkillCategories();

    foreach($categories as $category){
        $skillsByCategory[$category['nom']]['idCategory'] = $category['idCategorie'];

        $skills = getAllSkillsFromACategory($category['idCategorie']);
        $skillsByCategory[$category['nom']]['skills'] = $skills;

    }

    return json_encode($skillsByCategory);
}

function getSkillAsJSON($idSkill){
    return json_encode(getSkill($idSkill));
}

function deleteSkillAndRefresh($idSkill) {
    deleteSkill($idSkill);
}

function addSkillAndRefresh() {

    addSkill();

    return getAllSkillsByCategoryAsJSON();
}


function updateSkillAndRefresh($idSkill) {
    updateSkillWithOrWithoutImage($idSkill);
    
    return getAllSkillsByCategoryAsJSON();
}