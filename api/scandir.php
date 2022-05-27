<?php
	header('Content-Type: application/json; charset=utf-8'); 

	print_r(dirToArray('gallery'));

	function dirToArray($dir) {
		$result = array();
		$cdir = scandir($dir);
		foreach ($cdir as $key => $value) {
			if (!in_array($value,array(".",".."))) {
				if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
					$result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
				} else {
					$result[] = 'https://simprolitstroy.ru/api/'.$dir.'/'.$value;
					// 			 https://simprolitstory.ru/api/gallery
				}
			}
		}
		return $result;
	}
?>