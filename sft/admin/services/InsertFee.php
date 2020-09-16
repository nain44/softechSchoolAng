<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();
    $Amount = $data['Amount'];
    $Current = $data['Current'];
    $Advance = $data['Advance'];
    $subDate = $data['subDate'];
    $Month = $data['Month'];
    $sId = $data['sId'];
    $cId = $data['cId'];
    $schId =$data['schId'];
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL InsertFee('$Amount','$Current','$Advance','$subDate','$Month','$sId','$cId','$schId')";
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