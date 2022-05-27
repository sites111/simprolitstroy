<?php 
	$csv = file_get_contents('https://docs.google.com/spreadsheets/d/e/2PACX-1vTNvrXTQy70z6n9uyFcrxFsgaYCJaq6MdihUqCc7niCLlPXfw_olRU1VFnGb9QHF6XLzabga3o6FdqQ/pub?gid=0&single=true&output=csv');
	$csv = explode("\r\n", $csv);
	$array = array_map('str_getcsv', $csv);
	 
	file_put_contents('https://simprolitstroy.ru/api/get/catalog.json', json_encode($array));
?>