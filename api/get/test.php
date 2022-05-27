<?php 
//	header('Content-Type: application/json');
	$id = '1y-T78UhRhL4hxtMq5zmV8edchS4SlbpFivJL2NNumW0';
//	$gid = '117971440';
	$sheet = 'Catalog1';
//	$csv = file_get_contents('https://docs.google.com/spreadsheets/d/' . $id . '/export?format=csv&gid=' . $gid);
	$csv = file_get_contents('https://docs.google.com/spreadsheets/d/' . $id . '/gviz/tq?tqx=out:csv&sheet=' . $sheet);
	$csv = explode("\r\n", $csv);
	$array = array_map('str_getcsv', $csv);
	$catalog = array();
	echo "<br>string";
	echo "<br>count(array) = ".count($array);
	for($i = 1; $i < count($array); $i++) {
		$id = $array[$i][1];
		$image = $array[$i][3];
		$name = $array[$i][4];
		$price = (int) $array[$i][5];
		$s = (int) $array[$i][6];
		$l = (int) $array[$i][7];
		$rooms = (int) $array[$i][8];
		echo "<br>string12121221";
	//	$oldprice = (int) preg_replace('/[^0-9]/', '', $array[$i][11]);
	//	if($price < 1 || $image == null || $s == 0 || $l == 0) continue;
	/*	else */
		array_push($catalog, 
			array(
				'id' => $id, 
				'image' => $image, 
				'name' => $name, 
				'price' => (int) $price, 
				's' => (int) $s, 
				'l' => (int) $l, 
				'rooms' => (int) $rooms
			)
		);
	}
	echo "<br>string1";
	$result = array('catalog' => $catalog);
	print(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
?>