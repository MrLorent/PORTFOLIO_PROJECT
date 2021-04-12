<?php
// IMPORTATION DES MODELS
require_once('categoriesModels');

// CONTROLEURS

function getAllCategoriesAsJSON ()
{
    return json_encode(getAllCategories());
}