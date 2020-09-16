<?php
    include_once("conn.php"); 
    $data=getJsonParams();
    $Amount = $data['Amount'];   
    $Month = $data['Month'];
    $Year = $data['Year'];
    $cId = $data['cId'];
    $schId =$data['schId'];
    $clsTitle=$data['clsTitle'];
   // print_r($datad);
   $count=0;
    foreach ($Month as $value) {
       $count++;
       $Month=$value;
       if($count<=12){
   $sql = "CALL insertPWF('$cId','$Month','$Year','$Amount','$schId','$clsTitle')";
    $result1 = mysqli_query($conn,$sql);
    } 
    }
  $rows =array();
    $rows[]= mysqli_fetch_all($result1);
    //print_r($rows);exit;
    $result = array();
   
    if($result1)
    {
        //User is availaible
        $result= array("status" => 1, "description" => "Success", "data"=>$rows);
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