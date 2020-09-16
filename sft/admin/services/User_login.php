<?php   
    include_once("conn.php"); 
    
        //Get the variables here
    $data=getJsonParams();
    $UserName = $data['UserName'];
    $Password = $data['Password'];
   
    $rows =array();    
        //Get the variables here end
    $sql = "CALL UserLogin('$UserName','$Password')";
    $query = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);
  
    if($rows)
    {
        //User is availaible
        $result = array("data" => $rows, 'status' => 1);
    }

    if(!$rows)
    {
        //User is not availaible  
       $result = array("status" => 0);
    }

    /* Output header */
    header('Content-type: application/json');
    echo json_encode($result);

?>