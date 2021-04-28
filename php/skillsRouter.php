<?php
// IMPORTATION DES CONTROLEURS
require_once('skillsControllers.php');

// ROUTEUR

$request = explode('/', $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];

switch($request[4]){
    case "skill":
        switch($method){
            case 'GET':
                echo getSkillAsJSON($request[6]);
                break;
            case 'POST':
                $json = file_get_contents('php://input');
                addSkillAndRefresh($json);
                echo getAllSkillsByCategoryAsJSON();
                break;
            case 'PUT':
                updateSkillAndRefresh($json, $request[6]);
                echo getAllSkillsByCategoryAsJSON();
                
                break;
            case 'DELETE':
                deleteSkillAndRefresh($request[6]);
                echo getAllSkillsByCategoryAsJSON();
                break;
            default:
                http_response_code('404');
                echo 'OUPSI !';
                break;
        }
        break;
    case 'skills':
        switch($method){
            case 'GET':
                echo getAllSkillsByCategoryAsJSON();
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