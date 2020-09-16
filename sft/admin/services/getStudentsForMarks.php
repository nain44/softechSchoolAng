<?php

    include_once("conn.php"); 
    // error_reporting(E_ALL);
     $data=getJsonParams();
     $schId =$data['schId'];
     $clsId =$data['classId'];
     $subId =$data['subId'];
     $stdId =$data['stdId'];
     $secId =$data['secId'];
     $term =$data['term'];
    
    $rows =array();
    $sql = "CALL getStudentsForMarks('$schId','$clsId','$subId','$stdId','$secId','$term')";

    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
  
     $result = array();
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