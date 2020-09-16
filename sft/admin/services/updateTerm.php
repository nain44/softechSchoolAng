<?php
    include_once("conn.php"); 

        //Get the variables here start
    $data=getJsonParams();

    $title = $data['title'];
    $schId =$data['schId'];
    $trmId = $data['trmId'];
    $heldDate = $data['heldDate'];
    $description=$data['description'];
    $rows =array();
if ($trmId) {
    $sql = "CALL updateTerm('$title','$heldDate','$description','$schId','$trmId')";
    $result1 = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($result1, MYSQLI_ASSOC);
    $result = array();
   }
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