<?php


//echo $_POST["getWasteTimeInfo"];

if($_POST["getWasteTimeInfo"] == "getWasteTimeInfo") {
	get_wasteTimeInfo();		
}
else {
	get_totalTimeInfo();	
}


function get_wasteTimeInfo(){
//$return = intval($_POST["action"]) + 1;
	$my_file = "week.txt";
	$handle = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
	
	$timeArray = array();

	if ($handle) {
    	while (($line = fgets($handle)) !== false) {
        // process the line read.
    		$value = split(" ", $line);
    		$totalStudyTime += intval($value[1]);
   			$totalStudiedTime += intval($value[2]);
   			$value[3] = str_replace("\n", "", $value[3]);
   			if(isset($value[3])) {
   				$timeArray[$value[3]] = $timeArray[$value[3]] + 1;		
   			}
   			else {
   				$timeArray[$value[3]] = 1;
   			}
    	}
	} 

	fclose($handle);
	
	$data = $totalStudyTime." ".$totalStudiedTime. " ".$timeArray;
	echo json_encode($timeArray);
}


function get_totalTimeInfo(){
	$my_file = "week.txt";
	$handle = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
	
	$mondayStudyTime = 0;
	$mondayStudiedTime = 0;

	$tuesdayStudyTime = 0;
	$tuesdayStudiedTime = 0;

	$wednesdayStudyTime = 0;
	$wednesdayStudiedTime = 0;

	$thursdayStudyTime = 0;
	$thursdayStudiedTime = 0;

	$fridayStudyTime = 0;
	$fridayStudiedTime = 0;

	$patternInfo = array();
	
	if ($handle) {
    	while (($line = fgets($handle)) !== false) {
        // process the line read.
    		$value = split(" ", $line);

    		if($value[0] == "Monday") {
        		$mondayStudyTime += intval($value[1]);
   				$mondayStudiedTime += intval($value[2]);
    		}
    		else if($value[0] == "Tuesday") {
        		$tuesdayStudyTime += intval($value[1]);
   				$tuesdayStudiedTime += intval($value[2]);
    		}
    		else if($value[0] == "Wednesday") {
        		$wednesdayStudyTime += intval($value[1]);
   				$wednesdayStudiedTime += intval($value[2]);
    		}
    		else if($value[0] == "Thursday") {
        		$thursdayStudyTime += intval($value[1]);
   				$thursdayStudiedTime += intval($value[2]);
    		}
    		else if($value[0] == "Friday") {
        		$fridayStudyTime += intval($value[1]);
   				$fridayStudiedTime += intval($value[2]);
    		}
   			//$patternInfo[$value[0]] = $totalStudyTime, $totalStudiedTime;		
   		}
   	$patternInfo["Monday"] = $mondayStudyTime - $mondayStudiedTime;
   	$patternInfo["Tuesday"] = $tuesdayStudyTime - $tuesdayStudiedTime;
   	$patternInfo["Wednesday"] = $wednesdayStudyTime - $wednesdayStudiedTime;
   	$patternInfo["Thursday"] = $thursdayStudyTime - $thursdayStudiedTime;
   	$patternInfo["Friday"] = $fridayStudyTime - $fridayStudiedTime;
    }

	fclose($handle);
	
	//$data = $totalStudyTime." ".$totalStudiedTime;
	echo json_encode($patternInfo);

}

?>
