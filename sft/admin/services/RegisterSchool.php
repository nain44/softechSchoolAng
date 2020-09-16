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
    $schoolLogo = $data['schoolLogo'];
    
    $rows = array();

    $sql = "CALL RegisterSchool('$RegNo','$Code','$Name','$Owner','$Cperson','$Contact','$Email','$District','$Tehsil','$Address','$Level','$schoolLogo')";
    $rs = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($rs, MYSQLI_ASSOC);

   
    if($rows)
    {
        //User is availaible
        $result= array( "data"=>$rows,"status" => 1, "description" => "Success");
    }else 
    {
        //User is not availaible
        $result= array("status" => 0, "description" => "Failed");
    }
    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
?>