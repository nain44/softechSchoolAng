<?php

    include_once("conn.php");

    //Get the variables here
    $data=getJsonParams();
    $classId = $data['classId'];
    $term = $data['term'];
    $secId = $data['secId'];
    $schId = $data['schId'];
    $stdId = $data['stdId'];
 $rows =array();  
$rows2 =array();  
$rw =array();  
    $sql = "CALL getMarksStatus('$schId','$classId','$stdId','$secId','$term')";
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
     $conn->next_result();

     $sql2 = "CALL getStudentCount('$schId','$classId','$term','$secId')";
    $query2 = mysqli_query($conn, $sql2);
    $rows2 = mysqli_fetch_all($query2, MYSQLI_ASSOC);
    $rw = array_merge($rows, $rows2);
      
    if($rw)
    {
        //Data is availaible 
        $result = array("data"=>$rw, 'status' => 1);
    }

    if(!$rw)
    {
        //Data is not availaible
       $result = array("status" => 0);
    }

    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>