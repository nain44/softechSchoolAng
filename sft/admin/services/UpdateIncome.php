<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();
    $Name = $data['Name'];
    $Description = $data['Description'];
    $Amount = $data['Amount'];
    $Date = $data['Date'];
    $ID = $data['ID'];
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL UpdateIncome('$Name','$Description','$Amount','$Date','$ID')";
    $result1 = mysqli_query($conn,$sql);
    
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