<?php

include_once("conn.php"); 

//Get the variables here
    $data=getJsonParams();
    $schId = $data['schId'];
    $fDate = $data['IncomeDateF'];
    $tDate = $data['IncomeDateT'];
    $rows =array();  
$rows2 =array();  
$rw =array();    
    //Get the variables here end

    $sql = "CALL GetallIncomes('$schId','$fDate','$tDate')";
    $query = mysqli_query($conn, $sql);   
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
  
        $conn->next_result();


      $sql2 = "CALL getFeeForIncome('$schId','$fDate','$tDate')";
    $query2 = mysqli_query($conn, $sql2);
    $rows2 = mysqli_fetch_all($query2, MYSQLI_ASSOC);
   
    $rw = array_merge($rows, $rows2);
      
    if($rw)
    {
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