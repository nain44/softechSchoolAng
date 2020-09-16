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
   
    $prfId=$data['prfId'];
    $stfId=$data['stfId'];
    $isTeacher=$data['isTeacher'];
    $doj=$data['doj'];
   
    //Get the variables here end
        $sql = "CALL updateTeacher('$Name','$Qualification','$Contact','$Address','$Gender','$DOB','$stfId','$staffLogo','$doj','$prfId','$isTeacher','$schId')";
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