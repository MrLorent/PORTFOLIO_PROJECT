<?php
// IMPORTATION DES MODELS
require_once('skillsModels.php');

// CONTROLEURS

function getAllSkillsAsJSON(){
    $categories = getAllSkillsCategories();
    foreach($categories as $key => $value){
        foreach($value as $val){
            $skills[$val] = getAllSkillsByCategory($val);
        }
    }
    return json_encode($skills);
}