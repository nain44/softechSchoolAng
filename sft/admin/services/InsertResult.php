<?php
    include_once("conn.php"); 
    $data='';
    $data=getJsonParams();
   
    $count=0;
    $gTotal=0;
    $gObtainMarks=0;
    $percentage=0;
    foreach ($data as $value) { 
    
    $count++;    
    $obtMarks = $value['obtMarks'];
    $subId = $value['subId'];
    $schId = $value['schId'];
    $stdId = $value['stdId'];
    $clsId = $value['clsId'];
    $term = $value['term'];
    $secId = $value['secId'];
    $totalMarks = $value['totalMarks'];
    $sql = "CALL InsertResult('$obtMarks','$subId','$schId','$term','$totalMarks','$clsId','$stdId','$secId')";
    $result1 = mysqli_query($conn,$sql);    
   $gTotal+= $totalMarks;
   $gObtainMarks+= $obtMarks;
   
   $conn->next_result(); 
 if($count>=count($data))
{

  $percentage = ($gObtainMarks/$gTotal)*100;
  $sql2 = "CALL insertMarksStatus('$schId','$stdId','$clsId','$term','$percentage','$gObtainMarks','$gTotal','$secId')";
    $result2 = mysqli_query($conn, $sql2);
     if($result2)
    {
      
        //User is availaible
        $result= array("status" => 1, "description" => "Success");
        $conn->close();
        
    }else 
    {
        //User is not availaible
        $result= array("status" => 0, "description" => "Failed");
    }
    
}

 }
    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
   
?>