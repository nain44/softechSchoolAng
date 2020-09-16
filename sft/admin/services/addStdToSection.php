<?php
    include_once("conn.php"); 

    $data=getJsonParams();
  
    $sId = $data['stdId'];
    $secId = $data['secId'];
    $schId =$data['schId'];
    $secTitle =$data['secTitle'];
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL addStdToSection('$schId','$sId','$secId','$secTitle')";
    $result1 = mysqli_query($conn,$sql);
   
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