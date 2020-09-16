<?php

    include_once("conn.php");
    error_reporting(E_ALL);
    $now = new DateTime('now');
    $monthd = $now->format('m');
    $yeard = $now->format('Y');
    //Get the variables here
    $data=getJsonParams();
    if($data){
        if(!empty($classId))
        {
            $classId = $data['classId'];
                }
                else{$classId=0;}
                if(!empty($secId)){
                    $secId = $data['secId'];
                }   else{$secId=0;}
                        if(!empty($year)){
                            $year = $data['year'];
                        }   else{$year=$yeard;}
                                if(!empty($month)){
                                    $month = $data['month'];
                                }   else{$month=$monthd;}
                                if(!empty($stdId)){
                                    $stdId = $data['stdId'];
                                }   else{$stdId=0;}
    $schId=$data['schId'];

        
    $rows =array();    
    $sql = "CALL getStudentsForFee('$classId','$schId','$month','$year','$stdId','$secId')";
    
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);

    if($rows)
    {
        //Data is availaible 
        $result = array("data"=>$rows,"description"=>"Succes", 'status' => 1);
    }

    if(!$rows)
    {
        //Data is not availaible
       $result = array("description"=>"Failed","status" => 0);
    }

    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);
    }
    else 
    {
        echo ("No parameters given");

    }
?>