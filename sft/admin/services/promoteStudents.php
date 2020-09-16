<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();
  
    $stdId = $data['stdId'];
    $classId = $data['classId'];
    $schId =$data['schId'];
    $statusKey =$data['statusKey'];
    $clsTitle=$data['clsTitle'];
    $secId= $data['secId'];
    $secTitle=$data['secTitle'];
    
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL promoteStudents('$schId','$stdId','$classId','$statusKey','$clsTitle','$secId','$secTitle')";
    $result1 = mysqli_query($conn,$sql);
    $result = array();
   
    if($result1)
    {
        //User is availaible
        $result= array("status" => 1, "description" => "Success");
    }else 
    {
        //User is not availaible
        $result= array("status" => 0, "description" => "Failed");
    }
    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>