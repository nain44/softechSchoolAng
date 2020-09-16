<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();

    $Fee = $data['Fee'];
    $ID = $data['ID'];
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL updatePWfees('$Fee','$ID')";
    $result1 = mysqli_query($conn,$sql);
    //$rows[]= mysqli_fetch_all($result1);
    //print_r($rows);exit;
    $result = array();
   
    if($result1)
    {
        //User is availaible
        $result= array("status" => 1, "description" => "Success");
    }
    else 
    {
        //User is not availaible
        $result= array("status" => 0, "description" => "Failed");
    }
        /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>