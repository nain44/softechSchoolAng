<?php 

  include_once("conn.php");
   

$data=getJsonParams();
    $dImage = $data['dImage'];
    $schId = $data['schId'];
    
   
    if($dImage)
{
   define('UPLOAD_DIR', '../uploads/');
  //  $image_parts = explode(";base64,", $dImage);

    $image_type_aux = explode("../uploads/", $dImage);
    $image_type = $image_type_aux[1];
    
   
    $image_base64 = base64_decode($dImage);
    $file = UPLOAD_DIR . uniqid() . '.png';
    file_put_contents($file, $image_base64);
    if (!empty($dImage) || !empty($schId)) {                
         $result= array("data"=>$file,"status" => 1, "description" => "Success");
    }
    else 
    {
        $result= array("status" => 0, "description" => "Failed");
    }
    header('Content-type: application/json');
    echo json_encode($result);
         
}
    
   
    ?>