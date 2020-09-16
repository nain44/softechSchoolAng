<?php
    include_once("conn.php"); 

    //Get the variables here start
    $data=getJsonParams();

    $Name = $data['Name'];
    $Qualification = $data['Qualification'];
    $Contact = $data['Contact'];
    $Address = $data['Address'];
    $Gender = $data['Gender'];
    $DOB = $data['DOB'];
    // $cId = $data['cId'];
    $schId =$data['schId'];
    $staffLogo =$data['staffLogo'];
    $doj=$data['doj'];
    $prfId=$data['prfId'];
    $isTeacher=$data['isTeacher'];
    
    $sql = "CALL InsertTeacher('$Name','$Qualification','$Contact','$Address','$Gender','$DOB','$schId','$staffLogo','$doj','$prfId','$isTeacher')";
    $result1 = mysqli_query($conn,$sql);
   
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