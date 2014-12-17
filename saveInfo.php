<?php

test_function();

function test_function(){
$return = intval($_POST["action"]) + 1;

//$return["json"] = json_encode($return);
echo json_encode($return);
}

?>
