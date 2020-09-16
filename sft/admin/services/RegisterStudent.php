<?php
    include_once("conn.php");

    //Get the variables here start
    $data=getJsonParams();

    $AddNo = $data['AddNo'];
    $Name = $data['Name'];
    $FName =$data['FName'];   
    $FCnic =$data['FCnic'];   
    $FContact = $data['FContact'];
    $GRelation = $data['GRelation'];
    $DOB = $data['DOB'];
    $Gender = $data['Gender'];
    $Address = $data['Address'];
    $RegNo = $data['RegNo'];  
    $AdmissionFee = $data['AdmissionFee'];     
    $clsId = $data['clsId'];   
    $schId =$data['schId'];
    $studentImage=$data['studentImage'];
    $secId=$data['secId'];  
    $clsTitle=$data['clsTitle'];    
    $secTitle=$data['secTitle'];    
  
    $sql = "CALL RegisterStudent('$AddNo','$Name','$FName','$FCnic','$FContact','$GRelation','$DOB','$Gender','$Address','$RegNo','$AdmissionFee','$clsId','$schId','$studentImage','$secId','$clsTitle','$secTitle')";
    $result1 = mysqli_query($conn,$sql);
    
    if($result1)
    {
        $result= array("status" => 1, "description" => "Success");
    }else 
    {
        $result= array("status" => 0, "description" => "Failed");
    }
    header('Content-type: application/json');
    echo json_encode($result);
?>