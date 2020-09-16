<?php

    include_once("conn.php");
 
    $data=getJsonParams();
    $classId = $data['classId'];
    //$year = $data['year'];
    $day = $data['day'];
    $schId = $data['schId'];
    $stdId = $data['stdId'];
    $rows =array();    
    //Get the variables here end

    $sql = "CALL GetAllattendance('$classId','$schId','$day','$stdId')";
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
    if($rows)
    {
        //Data is availaible 
        $result = array("data"=>$rows,"description"=>"Success", 'status' => 1);
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
?>