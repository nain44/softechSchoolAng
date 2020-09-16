<?php

    include_once("conn.php");
        
    //Get the variables here
    $data=getJsonParams();
    $schId = $data['schId'];
    $stdId = $data['stdId'];
    $term = $data['term'];
    $rows =array();    
    //Get the variables here end

    $sql = "CALL getDataForMarks('$schId','$stdId','$term')";
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
   
      //  $conn->next_result();


    if($rows)
    {
       
        $result = array("data"=>$rows,"description"=>"success", 'status' => 1);
        

    }

    if(!$rows)
    {
        //Data is not availaible
       $result = array("description"=>"Failed","status" => 0);
    }

    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);

?>