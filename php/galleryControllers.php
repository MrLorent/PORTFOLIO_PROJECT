<?php
// IMPORTATION DES MODELS
require_once('galleryModels.php');
require_once('mediaModels.php');

// CONTROLEURS

function getAllProjectsFromACategoryAsJSON($idCategory){
    return json_encode(getAllProjectsFromACategory($idCategory));
}

function getAllProjectsAsJSON() {
    return json_encode(getAllProjects());
}

function getAllProjectsCategoriesAsJSON() {
    return json_encode(getAllProjectsCategories());
}

function getProjectAsJSON($idProject) {
    $project = array(
        "infos" => getProjectInfos($idProject),
        "media" => getProjectMedia($idProject),
    );
        
    return json_encode($project);
}

function getAllCategoriesOfAProjectAsJSON($idProject) {
    return json_encode(getAllCategoriesOfProject($idProject));
}

function deleteProjectAndRefresh($idProject){
    deleteProject($idProject);
    return json_encode(getAllProjects());
}


function addProjectAndRefresh(){
    $projet=$_POST;
    $files=$_FILES;
    $categories = json_decode($projet['categorie']);
    move_uploaded_file($files['miniature']['tmp_name'], '../img/gallery/miniatures/'.basename($files['miniature']['name']));
    $cheminfichier='./img/gallery/miniatures/'.basename($files['miniature']['name']);
    addProject($projet['titre'], $projet['date'], $projet['technique'], $projet['description'], $cheminfichier, $projet['ordre']);
    foreach($categories as $value){
        linkProjectToCategory($projet['titre'], $value);
    }
    return json_encode(getAllProjects());
}



function updateProjectAndRefresh($idProject){
    if(isset($_FILES['miniature'])){
        $infosfichier = pathinfo($_FILES['miniature']['name']);
        $extension = $infosfichier['extension'];
        $extensions_images = array('jpg', 'jpeg', 'gif', 'png');
    
        if (in_array($extension, $extensions_images)) {
            //récupérer chemin image
            $cnx = connection();
            $rqt = $cnx->prepare('SELECT `miniature` FROM `projets` WHERE `idProjet`=?');
            $rqt->execute(array($idProject));
            $pathImg = $rqt->fetch();
    
            //supprimer image
            unlink('.'.$pathImg[0]);

            //insertion de l'image dans les dossiers
            move_uploaded_file($_FILES['miniature']['tmp_name'], '../img/gallery/miniatures/'.basename($_FILES['miniature']['name']));
            $cheminfichier='./img/gallery/miniatures/'.basename($_FILES['miniature']['name']);
            
            updateProjectMiniature($cheminfichier, $idProject);
        }
    }

    //update des infos
    updateProject($_POST['titre'], $_POST['date'], $_POST['technique'], $_POST['description'],$idProject);

    deleteAllCategoriesOfAProject($idProject);

    $categories = json_decode($_POST['categorie']);
    foreach($categories as $value){
        UpdateProjectToCategory($idProject, $value);
    }

    return json_encode(getAllProjects());
}