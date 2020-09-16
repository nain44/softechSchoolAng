<?php
include_once("conn.php");

//Get the variables here start
$data = getJsonParams();
$stdId = $data['stdId'];
$wDate = $data['wDate'];
$wClsId = $data['wClsId'];
$schId = $data['schId'];
$wRemarks = $data['wRemarks'];
$wClsTitle =$data['wClsTitle'];
$wSchool=$data['wSchool'];

if ($data) {
    $sql = "CALL insertWithdrawlStudent ('$stdId','$wDate','$wClsId','$wRemarks','$wClsTitle','$wSchool')";
    $result1 = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($result1, MYSQLI_ASSOC);   
    echo $sql;
}
if($result1)
{
      $result = array("status" => 1, "description" => "Success");

    
} else {
    //User is not availaible
    $result = array("status" => 0, "description" => "Failed");
}
/* Output header */
header('Content-type: application/json');
echo json_encode($result);
