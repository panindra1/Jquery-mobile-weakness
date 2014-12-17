<?php

get_totalTime();

function get_totalTime(){
//$return = intval($_POST["action"]) + 1;
	$my_file = "week.txt";
	$handle = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
	
	$totalStudyTime = 0;
	$totalStudiedTime = 0;

	if ($handle) {
    	while (($line = fgets($handle)) !== false) {
        // process the line read.
    		$value = split(" ", $line);
    		$totalStudyTime += intval($value[1]);
   			$totalStudiedTime += intval($value[2]);
    	}
	} 

	fclose($handle);
	
	$data = $totalStudyTime." ".$totalStudiedTime;
	


//$return["json"] = json_encode($return);
	echo json_encode($data);
}

?>
