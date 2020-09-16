<?php
    include_once("conn.php"); 

    
    $data=getJsonParams();
    $schId =$data['schId'];
    $datad = $data['fArry'];
  $atDate =$data['atDate'];
  
    foreach ($datad as $value) {
    $isPresent = $value['isPresent'];
    $stfId = $value['stfId'];
    
    $comments = $value['comments'];
    $sql = "CALL insertStaffAttendance('$stfId','$schId','$isPresent','$comments','$atDate')";
   
    $result1 = mysqli_query($conn,$sql);
}
    
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