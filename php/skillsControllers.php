<?php
// IMPORTATION DES MODELS
require_once('skillsModels.php');

// CONTROLEURS

function getAllSkillsByCategoryAsJSON(){
    $categories = getAllSkillCategories();

    foreach($categories as $category){
        $skillsByCategory[$category['nom']]['idCategory'] = $category['idCategorie'];

        $skills = getAllSkillsFromACategory($category['idCategorie']);
        $count = 0;
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

function addSkillAndRefresh($skillInfo) {
    $skill = json_decode($skillInfo, true);
    addSkill($skill['outil'], $skill['description'], $skill['icone'], $skill['categorie']);
}

