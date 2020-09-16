<?php

include_once("conn.php"); 
error_reporting(E_ALL);


    //Get the variables here
    $data=getJsonParams();
    $schId = $data['schId'];
    $rows =array();    
    //Get the variables here end

    $sql = "CALL getAllSections('$schId')";
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);

    if($rows)
    {
        //Data is availaible 
        $result = array("data"=>$rows, 'status' => 1);
    }

    if(!$rows)
    {
        //Data is not availaible
       $result = array("status" => 0);
    }

    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>