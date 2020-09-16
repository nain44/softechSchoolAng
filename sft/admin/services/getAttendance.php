<?php

    include_once("conn.php");

    //Get the variables here
    $data=getJsonParams();
    $classId = $data['classId'];
    $secId = $data['secId'];
    $day = $data['day'];   
    $schId = $data['schId'];
    $stdId = $data['stdId'];

    $sql = "CALL getClassAttendance('$classId','$schId','$secId','$day','$stdId')";
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);

    if($rows)
    {
        //Data is availaible 
        $result = array("data"=>$rows,"description"=>"Failed", 'status' => 1);
    }

    if(!$rows)
    {
        //Data is not availaible
       $result = array("description"=>"Failed","status" => 0);
    }

    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);

?>