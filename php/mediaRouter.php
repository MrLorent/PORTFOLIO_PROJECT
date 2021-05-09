<?php
// IMPORTATION DES CONTROLEURS
require_once('mediaControllers.php');

// ROUTEUR

$request = explode('/', $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];

switch($request[5]){
    case "medium":
        switch($method){
            case 'GET':
                echo getMediumAsJSONByIDMedium($request[6]);
                break;
            case 'POST':
                echo updateMediumAndRefresh($request[6]);
                // if(isset($request[6]) != 0){
                //     echo updateMediumAndRefresh($request[6]);
                // }
                //echo addMediumToAProject();
                break;
            case 'PUT':
                //$json = file_get_contents('php://input');
                //echo updateMediumAndRefresh($request[6]);
                break;
            case 'DELETE':
                echo deleteMediumAndRefresh($request[6]);
                break;
            default:
                http_response_code('404');
                echo 'OUPSI !';
                break;
        }
        break;
    case 'media':
        switch($method){
            case 'GET':
                echo getMediaAsJSONbyIDProject($request[6]);
                break;
            case 'POST':
                
                break;
            case 'PUT':
                
                break;
            case 'DELETE':

                break;
            default:
                http_response_code('404');
                echo 'OUPSI !';
                break;
        }
        break;
    default :
        http_response_code('500');
        echo 'unknown endpoint';
        break;
}