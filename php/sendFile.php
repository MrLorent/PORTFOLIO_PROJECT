<?php

if (isset($_FILES['monfichier']) AND $_FILES['monfichier']['error'] == 0)
{

    // Testons si l'extension est autorisée
    $infosfichier = pathinfo($_FILES['monfichier']['name']);
    $extension_upload = $infosfichier['extension'];
    $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png', 'mp4');
    $extensions_images = array('jpg', 'jpeg', 'gif', 'png');
    $extensions_videos = array('mp4');

    $cheminfichier;
    $typefichier;
    $idProjet;
    $legende;
    
    if (in_array($extension_upload, $extensions_autorisees)) {
        if (in_array($extension_upload, $extensions_images)) {
            $typefichier = 'photo';
        }
        if (in_array($extension_upload, $extensions_videos)) {
            $typefichier = 'video';
        }
        move_uploaded_file($_FILES['monfichier']['tmp_name'], './img/gallery/'.$idProject.basename($_FILES['monfichier']['name']));
        $cheminfichier ='./img/gallery/'.$idProject.basename($_FILES['monfichier']['name'];
        echo "Fichier envoyé";
    } else {
        echo "Type (extension) non conforme. Extensions acceptées : jpg, jpeg, gif, png, mp4."
    }

    $cnx = connection();
    $rqt = $cnx->prepare('INSERT INTO media VALUES( NULL, ?, ?, ?, ?)');
    $rqt->execute(array($cheminfichier, $legende, $typefichier, $idProject));


}

?>