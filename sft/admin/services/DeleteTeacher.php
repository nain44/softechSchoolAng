<?php
    include_once("conn.php"); 
   

    //Get the variables here start
    $data=getJsonParams();
    $ID = $data['ID'];
    $schId = $data['schId'];
    $rows =array();
    //Get the variables here end

    $sql = "CALL DeleteTeacher('$ID','$schId')";
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