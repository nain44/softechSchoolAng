<?php 
 require_once('vendor/php-excel-reader/excel_reader2.php');
  require_once('vendor/SpreadsheetReader.php');
  include_once("conn.php");
   

  
$data=getJsonParams();
    $dfile = $data['dfile'];
    $schId = $data['schId'];
    //Get the variables here end
    $rows =array();
    $r1 =array();
    $allowedFileType = ['application/vnd.ms-excel','text/xls','text/xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if($dfile){

        $base64string = 'data:spreadsheetml/xlsx;base64,'.$dfile;
        $name = date('Y-m-d-h-m-s');
        
        file_put_contents('../uploads/'.$name.'.xlsx', base64_decode(explode(',',$base64string)[1]));
        $filename='../uploads//'.$name.'.xlsx';
        
        $targetPath = $filename;
        $Reader = new SpreadsheetReader($targetPath);

        
        $sheetCount = count($Reader->sheets());
        for($i=0;$i<$sheetCount;$i++)
        {            
            $Reader->ChangeSheet($i);  
            foreach ($Reader as $key=>$row)
            {
                
                
            if ($key == 0) continue;
            if($row){

             $std_rollNo = "";
                if(isset($row[0])) {
                    $std_rollNo = mysqli_real_escape_string($conn,$row[0]);
                }
                $std_admissionNo = "";
                if(isset($row[1])) {
                    $std_admissionNo = mysqli_real_escape_string($conn,$row[1]);
                }
                $std_name = "";
                if(isset($row[2])) {
                    $std_name = mysqli_real_escape_string($conn,$row[2]);
                }
                
                $std_fName = "";
                if(isset($row[3])) {
                    $std_fName = mysqli_real_escape_string($conn,$row[3]);
                }
                  

                $std_fCnic = "";
                if(isset($row[8])) {
                    $std_fCnic = mysqli_real_escape_string($conn,$row[8]);
                }

               
                $std_fContact = "";
                if(isset($row[5])) {
                    $std_fContact = mysqli_real_escape_string($conn,$row[5]);
                    if(strlen($std_fContact)<11)
                    {
                        $std_fContact='0'.$std_fContact;
                    }
                    else{
                        $std_fContact;
                    }
                }            

              

               
                $std_gRelation = "";
                if(isset($row[9])) {
                    $std_gRelation = mysqli_real_escape_string($conn,$row[9]);
                }
             
                $std_dob = "";
                if(isset($row[4])) {
                    $std_dob = mysqli_real_escape_string($conn,$row[4]);
                    //print_r($std_dob);
                    $std_dob=trim($std_dob);
                    $ke = preg_split("/[\s,-\/\/]+/", $std_dob);
                  
                    $s= $ke[0].$ke[1].$ke[2];
                  
                   if(strlen($s)==6)
                   {

                   $std_dob = '20'.$ke[2].'-'.$ke[1].'-'.$ke[0];
                    }                  
                     if(strlen($s)==7)
                   {
                  $std_dob= substr($s,3).'-'.substr($s,1,2).'-'.substr($s,0,1);

                    }
              
              if(strlen($s)==8)
                {
                 $std_dob= substr($s,4).'-'.substr($s,2,2).'-'.substr($s,0,2);
                   
                    }

                }

                $std_gender = "";
                if(isset($row[10])) {
                    $std_gender = mysqli_real_escape_string($conn,$row[10]);
                }

                $std_address = "";
                if(isset($row[11])) {
                    $std_address = mysqli_real_escape_string($conn,$row[11]);
                }

                
                  $std_admisionFee = "";
                if(isset($row[12])) {
                    $std_admisionFee = mysqli_real_escape_string($conn,$row[12]);
                }
                
               
               
                if($key==1){
                    
                   $teacher='';
                   $capacity =0;     
                  $clsTitle = ""; 
                  $clsId = ''; 
                 if(isset($row[6])) {
                    $clsTitle = mysqli_real_escape_string($conn,$row[6]);                 
                     $qcls = "CALL getClassId('$schId','$clsTitle')";
                     $resultcls = mysqli_query($conn,$qcls);
                     $rcls = mysqli_fetch_all($resultcls, MYSQLI_ASSOC);
                     $clsId=$rcls[0][cls_id];
                     $conn->next_result();   
                     if((!$clsId || $clsId=="") && $clsTitle!="")
                     {
                     $q2 = "CALL InsertClassForFile('$clsTitle','$capacity','$teacher','$schId')";
                     $result2 = mysqli_query($conn,$q2);
                     $r2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
                     $clsId=$r2[0][cId];
                     echo $q2;
                        }
                     $conn->next_result();

               }   
               $secTitle=""; 
               $secId = "";
                $description="From excel";
            if(isset($row[7])) 
                {    
                     
                    $secTitle = mysqli_real_escape_string($conn,$row[7]);       
                    $q3 = "CALL getSecId('$schId','$secTitle')";
                     $result3 = mysqli_query($conn,$q3);
                     $r3 = mysqli_fetch_all($result3, MYSQLI_ASSOC);
                     $secId=$r3[0][sec_id];
                    $conn->next_result();
                    if((!$secId || $secId=="") && $secTitle!="" )
                            {
                     $q4 = "CALL insertSection('$schId','$secTitle','$description')";
                     $result4 = mysqli_query($conn,$q4);
                     $r4 = mysqli_fetch_all($result4, MYSQLI_ASSOC);
                     $secId=$r4[0][secId]; 
                     echo $q4;
                     
                     
                                }  
                               
                     $conn->next_result(); 
                     $sqlSec = "CALL insertSecClsForFile('$secId','$clsId','$schId','$clsTitle','$secTitle')";
                     $resultSec = mysqli_query($conn, $sqlSec);
                     $conn->next_result(); 
                        }
                    }
                $studentImg = "";
                if(isset($row[13])) {
                    $studentImg = mysqli_real_escape_string($conn,$row[13]);
               }
        
         if ($std_name) {         
        
                 $query = "CALL RegisterStudent('$std_admissionNo','$std_name','$std_fName','$std_fCnic','$std_fContact','$std_gRelation','$std_dob','$std_gender','$std_address','$std_rollNo','$std_admisionFee','$clsId','$schId','$studentImg','$secId','$clsTitle','$secTitle')";
                 $result1 = mysqli_query($conn,$query);
                 $conn->next_result();               
 }
    
         
       }
}

}
$result = array();

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

    }
    else
    {
        $type = "error";
        $message = "Invalid File Type. Upload Excel File.";
    }
    ?>