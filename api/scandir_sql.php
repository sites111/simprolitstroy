<?php
//	header('Content-Type: application/json; charset=utf-8'); 

	dirToArray('gallery');

	function dirToArray($dir) {
		$result = array();
		$cdir = scandir($dir);
		foreach ($cdir as $key => $value) {
			if (!in_array($value,array(".",".."))) {
				if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
					$result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
				} else {
					$url = 'https://simprolitstroy.ru/api/'.str_replace("\\","/",$dir).'/'.$value;
					$result[] = $url;
					$projectID = preg_replace('/[^0-9]/', '', $dir);

					if($value == "main.jpg" || $value == "main.png")
						print_r("<br>UPDATE `projects` SET `image` = '".$url."' WHERE `projects`.`id` = ".$projectID.";");
					else 
						print_r("<br>INSERT INTO `project_images` (`id`, `project_id`, `url`) VALUES (NULL, '".$projectID."', '".$url."');");
				}
			}
		}
		return $result;
	}
?>