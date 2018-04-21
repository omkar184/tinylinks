<?php 
include("boot.php");
$url_arr = explode("/",$_SERVER["REDIRECT_URL"]);
echo $rand_string = $url_arr[count($url_arr) - 1];

?>