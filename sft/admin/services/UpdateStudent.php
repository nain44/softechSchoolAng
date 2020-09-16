<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();

    $AddNo = $data['AddNo'];
    $Name = $data['Name'];
    $FName =$data['FName'];
    
    $FCnic =$data['FCnic'];
  
    $FContact =$data['FContact'];
   
    $GRelation = $data['GRelation'];
    $DOB = $data['DOB'];
    $Gender = $data['Gender'];
    $Address = $data['Address'];
    $RegNo = $data['RegNo'];
   
   
    $clsId = $data['clsId'];
 
    $studentImage = $data['studentImage'];
    $ID = $data['ID'];
    $secId=$data['secId'];
    $secTitle=$data['secTitle'];
    $clsTitle=$data['clsTitle'];
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL UpdateStudent('$AddNo','$Name','$FName','$FCnic','$FContact',
    '$GRelation','$DOB','$Gender','$Address','$RegNo','$AdmissionFee','$clsId','$studentImage','$ID','$secId','$secTitle','$clsTitle')";
    $result1 = mysqli_query($conn,$sql);
    echo $sql;
    //$rows[]= mysqli_fetch_all($result1);
    // print_r($rows);exit;
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