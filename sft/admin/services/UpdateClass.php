<?php
    include_once("conn.php"); 

        //Get the variables here start
    $data=getJsonParams();

    $title = $data['clsTitle'];
    $capacity = $data['clsCapacity'];
    $teacher = $data['stf_id'];
    $schId =$data['schId'];
    $classId = $data['clsId'];
    $subjects='';
    $subjects = $data['subjects'];
    $sections='';
    $sections =$data['sections'];
    $rows =array();
    
if ($title != '' && $schId != '') {
    $sql = "CALL UpdateClass('$title','$capacity','$teacher','$schId','$classId','$sections','$subjects')";
    $result1 = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($result1, MYSQLI_ASSOC);
   
}
if ($result1) {
 $conn->next_result();
    
  
    if($classId!=0)
    {
 
if(count($sections)!=0 || $sections!=''){
    foreach ($sections as $value) {
      $secId=$value['sec_id'];
      $secTitle = $value['sec_title'];
     $sqlSec = "CALL insertSecCls('$secId','$classId','$schId','$title','$secTitle')";
    $resultSec = mysqli_query($conn, $sqlSec);
    $rows1 = mysqli_fetch_all($resultSec);
    echo 'sec',$sqlSec;

   }
   }
   $conn->next_result();
   if(count($subjects)!=0||$subjects!=''){
    foreach ($subjects as $v) {
    $subId=$v['sub_id'];
    $subTitle=$v['sub_title'];
     $sqlSub = "CALL insertSubCls('$subId','$classId','$schId','$title','$subTitle')";
    $resultSub = mysqli_query($conn, $sqlSub);    
    $rows2 = mysqli_fetch_all($resultSub);
    echo 'subj',$sqlSub;
    }
  

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
?>