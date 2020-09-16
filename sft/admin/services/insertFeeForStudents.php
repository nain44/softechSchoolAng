<?php
    include_once("conn.php"); 

    $data=getJsonParams();
    //$Amount = $data['amount'];   
    //$Month = $data['feeMonth'];
    //$Year = $data['feeYear'];
    //$clsId = $data['clsId'];
    //$stdId = $data['stdId'];
    $schId =$data['schId'];
    $datad = $data['fArry'];
  //  $submitedFee =$data['submitedFee'];
   // print_r($datad);
    foreach ($datad as $value) {
    $clsId =$value['cls_id'];
    $clsTitle =$value['cls_title'];
    $submitedFee = $value['fee_payable'];
    $stdId = $value['std_id'];
    $stdName = $value['std_name'];
    $stdFName = $value['std_fName'];
    $Year =$value['pwf_year'];
    $Month = $value['pwf_month'];
    $amount = $value['fee_chng'];
    $balance=$value['std_balance'];
    $sql = "CALL insertFeeForStudents('$amount','$Month','$Year','$stdId','$schId','$submitedFee','$clsId','$balance','$clsTitle','$stdName','$stdFName')";
    $result1 = mysqli_query($conn,$sql);
}
    $rows =array();
    $rows[]= mysqli_fetch_all($result1);
    $result = array();
   
    if($result1)
    {
        //User is availaible
        $result= array("status" => 1, "description" => "Success", "data"=>$rows);
    }else 
    {
        //User is not availaible
        $result= array("status" => 0, "description" => "Failed");
    }
    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>