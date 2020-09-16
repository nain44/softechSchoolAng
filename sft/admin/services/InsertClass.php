<?php
include_once("conn.php");

//Get the variables here start
$data = getJsonParams();
$title = $data['Title'];
$capacity = $data['Capacity'];
$teacher = $data['Teacher'];
$schId = $data['schId'];
$subjects = $data['subjects'];
$sections =$data['sections'];
$classId=0;
if ($title != '' && $schId != '') {
    $sql = "CALL InsertClass('$title','$capacity','$teacher','$schId')";
    $result1 = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($result1, MYSQLI_ASSOC);
    $classId=$rows[0][cId];
    $update =$rows[0][i];
    
}
if ($rows) {

     $conn->next_result();
  
    if($classId!=0)
    {
  
    foreach ($sections as $value) {
      $secId=$value['sec_id'];
      $secTitle = $value['sec_title'];
     $sqlSec = "CALL insertSecCls('$secId','$classId','$schId','$title','$secTitle')";
    $resultSec = mysqli_query($conn, $sqlSec);
    $rows1 = mysqli_fetch_all($resultSec);
   
   }
   $conn->next_result();

    foreach ($subjects as $v) {
    $subId=$v['sub_id'];
    $subTitle=$v['sub_title'];
     $sqlSub = "CALL insertSubCls('$subId','$classId','$schId','$title','$subTitle')";
    $resultSub = mysqli_query($conn, $sqlSub);    
    $rows2 = mysqli_fetch_all($resultSub);
  

}

  }
      $result = array("status" => 1, "description" => "Success");

    
} else {
    //User is not availaible
    $result = array("status" => 0, "description" => "Failed");
}
/* Output header */
header('Content-type: application/json');
echo json_encode($result);
