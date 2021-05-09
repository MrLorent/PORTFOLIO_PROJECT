<?php
// IMPORTATION DES MODELS
require_once('mediaModels.php');
require_once('galleryControllers.php');

// CONTROLEURS

function getMediaAsJSONbyIDProject($idProject) {
       return json_encode(getProjectMedia($idProject));
}

function getMediumAsJSONByIDMedium($idMedium) {
       return json_encode(getMedium($idMedium));
}

function addMediumToAProject() {

       //detection du type de fichier
       if (isset($_FILES['medium']) AND $_FILES['medium']['error'] == 0) {
              // Testons si l'extension est autorisée
              $infosfichier = pathinfo($_FILES['medium']['name']);
              $extension_upload = $infosfichier['extension'];
              $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png', 'mp4');
              $extensions_images = array('jpg', 'jpeg', 'gif', 'png');
              $extensions_videos = array('mp4');

       if (in_array($extension_upload, $extensions_autorisees)) {
              if (in_array($extension_upload, $extensions_images)) {
                     $typefichier = 'photo';
              }
              if (in_array($extension_upload, $extensions_videos)) {
                     $typefichier = 'video';
              }
       } else {
              echo "Type (extension) non conforme. Extensions acceptées : jpg, jpeg, gif, png, mp4.";
       }
       }

       addMedium($typefichier, $extension_upload);

       return getProjectAsJSON($_POST['idProjet']);
}

function deleteMediumAndRefresh($idMedium) {
       $idProjet = deleteMedium($idMedium);

       return json_encode(getProjectMedia($idProjet));
}

function updateMediumAndRefresh($idMedium){
       if (isset($_FILES['medium']) AND $_FILES['medium']['error'] == 0) {
              // Testons si l'extension est autorisée
              $infosfichier = pathinfo($_FILES['medium']['name']);
              $extension_upload = $infosfichier['extension'];
              $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png', 'mp4');
              $extensions_images = array('jpg', 'jpeg', 'gif', 'png');
              $extensions_videos = array('mp4');

       if (in_array($extension_upload, $extensions_autorisees)) {
              if (in_array($extension_upload, $extensions_images)) {
                     $typefichier = 'photo';
              }
              if (in_array($extension_upload, $extensions_videos)) {
                     $typefichier = 'video';
              }
              addMedium($typefichier, $extension_upload);
       } else {
              echo "Type (extension) non conforme. Extensions acceptées : jpg, jpeg, gif, png, mp4.";
       }
       }else if(isset($_FILES['medium']) == 0 AND $_FILES['medium']['error'] == 0){
              updateMedium($_POST['legende'], $idMedium);
       }

       

       return getProjectAsJSON($_POST['idProjet']);
}