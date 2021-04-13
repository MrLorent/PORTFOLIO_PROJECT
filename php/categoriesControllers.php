<?php
// IMPORTATION DES MODELS
require_once('categoriesModels.php');

// CONTROLEURS

function getAllCategoriesAsJson ()
{
    return json_encode(getAllCategories());
}

function deleteACategory($idCategory) {
    return json_encode(deleteCategory($idCategory));
}