<?php 
function saveShortUrl($long_url,$rand_string){	

	$res = mysql_query("insert into tbl_urls (long_url,short_url) values ('$long_url','$rand_string')");
	if(!$res){
		die(mysql_error());
	}
	else{
		return true;
	}
}

function getLongUrl($short_string){	
	$que = "select * from tbl_urls where short_url = '".trim($short_string)."'";
	$res = mysql_query($que);
	$row = mysql_fetch_array($res);
	return $row["long_url"];
}

function getTopUrlData($length){
	$que = "select * from tbl_urls order by id desc limit 0,".$length;
	$res = mysql_query($que);
	$short_urls = [];
	while($row = mysql_fetch_array($res)){
		$short_urls[] = $row["short_url"];
	}
	return $short_urls;
	// reutrn $data;
}
?>