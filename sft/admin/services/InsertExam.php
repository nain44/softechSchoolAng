<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();

    $Title = $data['Title'];
    $Durtion = $data['Durtion'];
    $Term = $data['Term'];
    $Sdate = $data['Sdate'];
    $Edate = $data['Edate'];
    $Season = $data['Season'];
    $stdID = $data['stdID'];
    $clsID = $data['clsID'];
    $subID = $data['subID'];
    $schId =$data['schId'];
    
    $rows =array();
    //Get the variables here end

    $sql = "CALL InsertExam('$Title','$Durtion','$Term','$Sdate','$Edate','$Season','$stdID','$clsID','$subID','$schId')";
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