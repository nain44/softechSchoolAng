<?php
    include_once("conn.php");

    //Get the variables here start
    $data=getJsonParams();

    $RegNo = $data['RegNo'];
    $Code = $data['Code'];
    $Name =$data['Name'];
    $Owner = $data['Owner'];
    $Cperson =$data['Cperson'];
    $Contact = $data['Contact'];
    $Email =$data['Email'];
    $District =$data['District'];
    $Tehsil = $data['Tehsil'];
    $Address = $data['Address'];
    $Level = $data['Level'];
    $ID = $data['ID'];

    $rows =array();

    $sql = "CALL UpdateSchool('$RegNo','$Code','$Name','$Owner','$Cperson','$Contact','$Email','$District','$Tehsil','$Address','$Level','$ID')";

    $result1 = mysqli_query($conn,$sql);
    echo $sql;
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