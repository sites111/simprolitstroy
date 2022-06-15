<?php 
	header('Content-Type: application/json; charset=utf-8'); 
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	$connect = mysqlconnect('localhost', 'artema41_simpro', 'QT3*a1uz', 'artema41_simpro'); 
 
	$projectElement = getProjectData($_GET['name']);
	$projectID = $projectElement['id'];
	$projectViews = $projectElement['views'];

	setProjectViews($projectID, $projectViews+1);

	function setProjectViews($_projectID, $_projectViews){
		$query_text = "UPDATE `projects` SET `views` = '".$_projectViews."' WHERE `projects`.`id` = ".$_projectID.";";
		echo $query_text;
		$query = mysqlselectquery($query_text);
		$rows = array();
		while($r = mysql_fetch_assoc($query)) {
		    $rows[] = $r;
		} 
		mysql_free_result($connect); 
	}

	function getProjectData($_projectName){
		$query = mysqlselectquery("SELECT * FROM `projects` WHERE `name` LIKE '".$_projectName."'");
		$rows = array();
		while($r = mysql_fetch_assoc($query)) {
		    $rows[] = $r;
		} 
		mysql_free_result($connect); 
		return $rows[0];
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