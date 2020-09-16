<?php
include_once("conn.php");

//Get the variables here start
$data = getJsonParams();
$title = $data['Title'];
$description = $data['description'];
$schId = $data['schId'];
$sql = "CALL insertSection('$schId','$title','$description')";
$result1 = mysqli_query($conn, $sql);
   
if($result1)
{
    $result = array("status" => 1, "description" => "Success");

}
   else {
    //User is not availaible
    $result = array("status" => 0, "description" => "Failed");
}
/* Output header */
header('Content-type: application/json');
echo json_encode($result);
