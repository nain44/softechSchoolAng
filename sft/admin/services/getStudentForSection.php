<?php
    include_once("conn.php"); 
    $data=getJsonParams();
    $classId = $data['classId'];
    $stdName = $data['stdName'];
    $schId = $data['schId'];
    $secId = $data['secId'];
    $regNo = $data['regNo'];
    $sql = "CALL getStudentForSection('$schId','$stdName','$regNo','$classId','$secId')";
    $query = mysqli_query($conn, $sql);
    $rows =array();
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
    if($rows)
        {
        $result = array("data"=>$rows, 'status' => 1);
        }

    if(!$rows)
    {
        $result = array("status" => 0);
    }

    header('Content-type: application/json');
    echo json_encode($result);
?>