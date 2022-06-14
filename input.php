<?php
	header('Content-Type: application/json');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	$result = array();
	if(isset($_FILES)){ // Проверяем, загрузил ли пользователь файл
		$destiation_dir = 'downloads/'.$_FILES['inputfile']['name']; // Директория для размещения файла
		move_uploaded_file($_FILES['inputfile']['tmp_name'], $destiation_dir); // Перемещаем файл в желаемую директорию
	
		$ext = pathinfo($destiation_dir, PATHINFO_EXTENSION);
		$newname = 'downloads/'.md5($_FILES['inputfile']['name'].time()).'.'.$ext;
		rename($destiation_dir, $newname);
 		$result = array('code' => 200, 'link' => 'https://simprolitstroy.ru/api/'.$newname); // Оповещаем пользователя об успешной загрузке файла
	}
	else{
 		$result = array('status' => 'error');
	}
	echo json_encode($result);
?>