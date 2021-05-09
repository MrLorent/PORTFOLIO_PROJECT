<?php
// IMPORTATION DES MODELS
require_once('mediaModels.php');

// CONTROLEURS

function getMediaAsJSONbyIDProject($idProject) {
       return json_encode(getProjectMedia($idProject));
}