<?php

    include_once("conn.php");

    //Get the variables here
    $data=getJsonParams();
    $classId = $data['classId'];   
    $schId = $data['schId'];
    $stdId = $data['stdId'];
    $month = $data['monthSelected'];
        $secId = $data['secId'];

    $monthArr = array(1,2,3,4,5,6,7,8,9,10,11,12);
    $rows =array();
     $rows1 =array();    
    //Get the variables here end

    $sql = "CALL getSingleStdForFee('$schId','$stdId','$classId','$month','$secId')";
    
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
     $rows1 =array(); 
  if($rows)
    {
        //Data is availaible 
        $result = array("data"=>$rows,"description"=>"success", 'status' => 1);
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