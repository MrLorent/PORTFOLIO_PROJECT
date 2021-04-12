<?php
// IMPORTATION DES MODELS
require_once('galleryModels.php');

// CONTROLEURS

function getAllProjectsAsJSON() {
    return json_encode(getAllProjects());
}