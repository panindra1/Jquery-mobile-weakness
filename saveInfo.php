<?php

test_function();

function test_function(){
//$return = intval($_POST["action"]) + 1;
	$studyTime = $_POST["studyTime"];
	$studiedTime = $_POST["studiedTime"];
	$wastedTimeSource = $_POST["wastedTimeSource"];
	$day = $_POST["day"];
    
    $data = $day . " ". $studyTime ." ". $studiedTime." ". $wastedTimeSource."\n";
	$my_file = "week.txt";
	$handle = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
	fwrite($handle, $data);


//$return["json"] = json_encode($return);
	echo json_encode($my_file);
}

?>
