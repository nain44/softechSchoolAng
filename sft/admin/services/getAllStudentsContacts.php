<?php

    include_once("conn.php"); 

    //Get the variables here
    $data=getJsonParams();
    $classId = $data['classId'];
    $schId =$data['schId'];
    $stdId =$data['stdId'];
    $secId =$data['secId'];
    //Get the variables here end

    $sql = "CALL getAllStudentsContacts('$classId','$schId','$stdId','$secId')";
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