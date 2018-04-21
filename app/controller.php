<?php 
include("boot.php");
$action = (isset($_POST["action"]) ? $_POST["action"] : "redirect");
$result = call_user_func($action, $_POST);

function redirect($data){	
	$url_arr = explode("/",$_SERVER["REDIRECT_URL"]);
	$short_code = $url_arr[count($url_arr) - 1];
	$long_url = getLongUrl($short_code);
	header("Location:".$long_url);
}
function shortUrl($data){
	$long_url = $data["long_url"];
	$random = generateRandomString(5);	
	if(saveShortUrl($long_url,$random)){
		echo $random;
	}
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function getTopUrls($data){
	$url_data = getTopUrlData($data['length']);
	echo json_encode($url_data);
}
?>