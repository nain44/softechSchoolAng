<?php
    include_once("conn.php"); 

        //Get the variables here start
    $data=getJsonParams();

    
    $prfScale = $data['prfScale'];
    $prfDescription = $data['prfDescription'];
    $prfTitle = $data['prfTitle'];
    $schId =$data['schId'];
    $prfId = $data['prfId'];
    
    $rows =array();
        //Get the variables here end

    $sql = "CALL updateProffession('$prfTitle','$prfScale','$prfDescription','$schId','$prfId')";
    $result1 = mysqli_query($conn,$sql);
    echo $sql;   
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