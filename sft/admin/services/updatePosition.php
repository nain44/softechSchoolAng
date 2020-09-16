<?php
    include_once("conn.php"); 
    $data=getJsonParams();
      
    $position = $data['position'];
    $stdId = $data['stdId'];
   
    $sql = "CALL updatePosition('$stdId','$position')";
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