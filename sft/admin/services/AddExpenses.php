<?php
    include_once("conn.php"); 
  
    
    //Get the variables here start
    $data=getJsonParams();
    $ItemName = $data['ItemName'];
    $Description = $data['Description'];
    $Quantity = $data['Quantity'];
    $Price = $data['Price'];
    $Tprice = $data['Tprice'];
    $schId = $data['schId'];
    $StDate = $data['StDate'];
    
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL AddExpenses('$ItemName','$Description','$Quantity','$Price','$Tprice','$schId','$StDate')";
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