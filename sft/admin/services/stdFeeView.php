<?php

    include_once("conn.php");

    //Get the variables here
    $data=getJsonParams();
    $classId = $data['classId'];
     $year = $data['year'];
      $month = $data['month'];
    $schId = $data['schId'];
    $secId = $data['secId'];
    $rows =array();    
    $sql = "CALL stdFeeView('$classId','$schId','$month','$year','$secId')";
  
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
    if($rows)
    {
        $result = array("data"=>$rows, 'status' => 1);
    }

    if(!$rows)
    {
       $result = array("status" => 0);
    }

    header('Content-type: application/json');
    echo json_encode($result);

?>