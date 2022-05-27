<?php
	header('Content-Type: application/json; charset=utf-8'); 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	$connect = mysqlconnect('localhost', 'artema41_simpro', 'QT3*a1uz', 'artema41_simpro');

	$query = mysqlselectquery('SELECT * FROM projects');

	$rows = array();
	while($r = mysql_fetch_assoc($query)) {
	    $rows[] = $r;
	} 

	echo json_encode($rows);

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