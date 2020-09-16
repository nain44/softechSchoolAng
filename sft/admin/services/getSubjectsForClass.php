<?php

    include_once("conn.php"); 

    //Get the variables here
    $data=getJsonParams();
    $schId =$data['schId'];
    $clsId =$data['clsId'];
    //Get the variables here end

    $sql = "CALL getSubjectsForClass('$schId','$clsId')";
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