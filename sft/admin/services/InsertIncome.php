<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();
    
    $Name = $data['Name'];
    $Description = $data['Description'];
    $Amount = $data['Amount'];
    $Date = $data['Date'];
    $schId = $data['schId'];    
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL InsertIncome('$Name','$Description','$Amount','$Date','$schId')";
    $result1 = mysqli_query($conn,$sql);
    //echo $sql;
   // $rows[]= mysqli_fetch_all($result1);
    //print_r($rows);exit;
    $result = array();
   
    if($result1)
    {
        //User is availaible
        $result= array("status" => 1, "description" => "Success");
    }else 
    {
        //User is not availaible
        $result= array("status" => 0, "description" => "Failed");
    }
    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>