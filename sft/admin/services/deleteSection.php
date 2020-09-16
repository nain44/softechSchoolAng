<?php
    include_once("conn.php");
    error_reporting(E_ALL);
    //Get the variables here start
    $data=getJsonParams();
    $secId = $data['secId'];
    $schId = $data['schId'];
    $rows =array();
    //Get the variables here end

    $sql = "CALL deleteSection('$secId','$schId')";
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