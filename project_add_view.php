<?php 
	header('Content-Type: application/json; charset=utf-8'); 
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	$connect = mysqlconnect('localhost', 'artema41_simpro', 'QT3*a1uz', 'artema41_simpro'); 
 
	$projectElement = getProjectData($_GET['name']);
	$projectID = $projectElement['id'];

	$projectImages = getImages($projectID);

	$result = array("data" => $projectElement,
	"images" => $projectImages);

	echo json_encode($result,JSON_UNESCAPED_UNICODE); 

	function getProjectData($_projectName){
		$query = mysqlselectquery("SELECT * FROM `projects` WHERE `name` LIKE '".$_projectName."'");
		$rows = array();
		while($r = mysql_fetch_assoc($query)) {
		    $rows[] = $r;
		} 
		mysql_free_result($connect); 
		return $rows[0];
	}

	function projectAddView($_projectID){
		$query = mysqlselectquery("SELECT `url` FROM `project_images` WHERE `project_id` = ".$_projectID);
		$rows = array();
		while($r = mysql_fetch_assoc($query)) {
		    $rows[] = $r;
		} 
		mysql_free_result($connect); 
	}
 
	function mysqlconnect($host, $user, $password, $database){
		$link = mysql_connect($host, $user, $password); 
		mysql_set_charset("utf8");
		mysql_select_db($database);
		return $link;
	} 

	function mysqlselectquery($query){
		return mysql_query($query);
	}

	mysql_free_result($connect); 
	mysql_close($query);
?>