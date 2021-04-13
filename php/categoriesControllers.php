<?php
// IMPORTATION DES MODELS
require_once('categoriesModels.php');

// CONTROLEURS

function getAllCategoriesAsJson ()
{
    return json_encode(getAllCategories());
}

function deleteACategoryAndRefresh($idCategory) {
    return json_encode(deleteCategory($idCategory));
}