<?php
// IMPORTATION DES MODELS
require_once('categoriesModels');

// CONTROLEURS

function getAllCategoriesasJSON ()
{
    return json_encode(getAll());
}