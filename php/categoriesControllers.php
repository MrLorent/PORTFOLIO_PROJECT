<?php
// IMPORTATION DES MODELS
require_once('categoriesModels.php');

// CONTROLEURS

function getAllCategoriesAsJSON ()
{
    return json_encode(getAllCategories());
}