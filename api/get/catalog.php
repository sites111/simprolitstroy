<?php 
	header('Content-Type: application/json');

	$opts = array(
	  'http'=>array(
	    'method'=>"GET",
	    'header'=>"Accept-language: en\r\n" .
	              "Cookie: foo=bar\r\n"
	  )
	);

	$context = stream_context_create($opts);

	$csv = file_get_contents('https://docs.google.com/spreadsheets/d/e/2PACX-1vTNvrXTQy70z6n9uyFcrxFsgaYCJaq6MdihUqCc7niCLlPXfw_olRU1VFnGb9QHF6XLzabga3o6FdqQ/pub?gid=0&single=true&output=csv', false, $context);
	$csv = explode("\r\n", $csv);
	$array = array_map('str_getcsv', $csv);
	$catalog = array(); 
	print_r($array);
	echo "string";
	echo "<br>count(array) = ".count($array);
	for($i = 1; $i < count($array); $i++) {
		$id = $array[$i][0];
		$image = $array[$i][1];
		$name = $array[$i][2];
		$price = $array[$i][3];
		$s = $array[$i][4];
		$l = $array[$i][5];
		$rooms = $array[$i][6];
		echo "<br>string12121221"; 
	//	$oldprice = (int) preg_replace('/[^0-9]/', '', $array[$i][11]);
	//	if($price < 1 || $image == null || $s == 0 || $l == 0) continue;
	/*	else */ 
		array_push($catalog, array('id' => $id, 'image' => $image, 'name' => $name, 'price' => (int) $price, 's' => (int) $s, 'l' => (int) $l, 'rooms' => (int) $rooms));	
	}
	echo "<br>string1";
	$result = array('catalog' => $catalog);
	print(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
?>