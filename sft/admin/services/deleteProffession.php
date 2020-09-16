<?php
    include_once("conn.php");

    //Get the variables here start
    $data=getJsonParams();
    $prfId = $data['prfId'];
    $schId = $data['schId'];
    $rows =array();
    //Get the variables here end

    $sql = "CALL deleteProffession('$prfId','$schId')";
    $result1 = mysqli_query($conn,$sql);
    //$rows[]= mysqli_fetch_all($result1);
    $result = array();
    if($result1)
    {
        //Data succsessfully Deleted
        $result= array("status" => 1, "description" => "Success");
    }else 
    {
        //If Data is not Deleted   
        $result= array("status" => 0, "description" => "Failed");
    }
        //Output header
    header('Content-type: application/json');
    echo json_encode($result);
?>