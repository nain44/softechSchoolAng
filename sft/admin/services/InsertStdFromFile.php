<?php
require_once('vendor/php-excel-reader/excel_reader2.php');
  require_once('vendor/SpreadsheetReader.php');
    include_once("conn.php");
    
    
   

    //Get the variables here start
    $data=getJsonParams();
    $dfile = $data['dfile'];
    $schId = $data['schId'];
    $rows =array();
    //Get the variables here end
    
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
            foreach ($Reader as $Row)
            {
                $std_name = "";
                if(isset($Row[0])) {
                    $std_name = mysqli_real_escape_string($conn,$Row[0]);
                }
                
                $std_fName = "";
                if(isset($Row[1])) {
                    $std_fName = mysqli_real_escape_string($conn,$Row[1]);
                }

                $std_fContact = "";
                if(isset($Row[2])) {
                    $std_fContact = mysqli_real_escape_string($conn,$Row[2]);
                }

                $std_admissionNo = "";
                if(isset($Row[3])) {
                    $std_admissionNo = mysqli_real_escape_string($conn,$Row[3]);
                }

                $std_gName = "";
                if(isset($Row[4])) {
                    $std_gName = mysqli_real_escape_string($conn,$Row[4]);
                }

                $std_gContact = "";
                if(isset($Row[5])) {
                    $std_gContact = mysqli_real_escape_string($conn,$Row[5]);
                }

                $std_dob = "";
                if(isset($Row[6])) {
                    $std_dob = mysqli_real_escape_string($conn,$Row[6]);
                }

                $std_gender = "";
                if(isset($Row[7])) {
                    $std_gender = mysqli_real_escape_string($conn,$Row[7]);
                }

                $std_address = "";
                if(isset($Row[8])) {
                    $std_address = mysqli_real_escape_string($conn,$Row[8]);
                }

                $std_regNo = "";
                if(isset($Row[9])) {
                    $std_regNo = mysqli_real_escape_string($conn,$Row[9]);
                }

                $std_discountFee = "";
                if(isset($Row[10])) {
                    $std_discountFee = mysqli_real_escape_string($conn,$Row[10]);
                }

                $std_fee = "";
                if(isset($Row[11])) {
                    $std_fee = mysqli_real_escape_string($conn,$Row[11]);
                }

                $std_siblings = "";
                if(isset($Row[12])) {
                    $std_siblings = mysqli_real_escape_string($conn,$Row[12]);
                }

                $std_admisionFee = "";
                if(isset($Row[13])) {
                    $std_admisionFee = mysqli_real_escape_string($conn,$Row[13]);
                }

                $std_AdvanceFee = "";
                if(isset($Row[14])) {
                    $std_AdvanceFee = mysqli_real_escape_string($conn,$Row[14]);
                }

                $std_monthFee = "";
                if(isset($Row[15])) {
                    $std_monthFee = mysqli_real_escape_string($conn,$Row[15]);
                }

                $std_balance = "";
                if(isset($Row[16])) {
                    $std_balance = mysqli_real_escape_string($conn,$Row[16]);
                }

                $std_concisionAmount = "";
                if(isset($Row[17])) {
                    $std_concisionAmount = mysqli_real_escape_string($conn,$Row[17]);
                }

                $std_concisionRemarks = "";
                if(isset($Row[18])) {
                    $std_concisionRemarks = mysqli_real_escape_string($conn,$Row[18]);
                }

                $cls_id = "";
                if(isset($Row[19])) {
                    $cls_id = mysqli_real_escape_string($conn,$Row[19]);
                }

                $std_gRelation = "";
                if(isset($Row[20])) {
                    $std_gRelation = mysqli_real_escape_string($conn,$Row[20]);
                }

                $std_mobileForSms = "";
                if(isset($Row[21])) {
                    $std_mobileForSms = mysqli_real_escape_string($conn,$Row[21]);
                }

                $std_disability = "";
                if(isset($Row[22])) {
                    $std_disability = mysqli_real_escape_string($conn,$Row[22]);
                }

                $std_disabilityDescription = "";
                if(isset($Row[23])) {
                    $std_disabilityDescription = mysqli_real_escape_string($conn,$Row[23]);
                }

                $std_fCnic = "";
                if(isset($Row[24])) {
                    $std_fCnic = mysqli_real_escape_string($conn,$Row[24]);
                }

                $std_gCnic = "";
                if(isset($Row[25])) {
                    $std_gCnic = mysqli_real_escape_string($conn,$Row[25]);
                }
                
                if (!empty($std_name)|| !empty($cls_id)) {
                 $query = "CALL RegisterStudent('$std_name','$std_fName','$std_fContact','$std_admissionNo','$std_gName','$std_gContact','$std_dob','$std_gender','$std_address','$std_regNo','$std_discountFee','$std_fee','$std_siblings','$std_admisionFee','$std_AdvanceFee','$std_monthFee','$std_balance','$std_concisionAmount','$std_concisionRemarks','$cls_id','$std_gRelation','$std_mobileForSms','$std_disability','$std_disabilityDescription','$std_fCnic','$std_gCnic')";
                   // $query = "INSERT INTO tbl_student(std_name, std_fName, std_fContact, std_admissionNo, std_gName, std_gContact, std_dob, std_gender, std_address, std_regNo, std_discountFee, std_fee, std_siblings, std_admisionFee, std_AdvanceFee, std_monthFee, std_balance, std_concisionAmount, std_concisionRemarks, cls_id, std_gRelation, std_mobileForSms, std_disability, std_disabilityDescription, std_fCnic, std_gCnic) values('".$std_name."','$std_fName."','".$std_fContact."','".$std_admissionNo."','".$std_gName."','".$std_gContact."','".$std_dob."','".$std_gender."','".$std_address."','".$std_regNo."','".$std_discountFee."','".$std_fee."','".$std_siblings."','".$std_admisionFee."','".$std_AdvanceFee."','".$std_monthFee."','".$std_balance."','".$std_concisionAmount."','".$std_concisionRemarks."','".$cls_id."','".$std_gRelation."','".$std_mobileForSms."','".$std_disability."','".$std_disabilityDescription."','".$std_fCnic."','".$std_gCnic."')";
                  $result1 = mysqli_query($conn,$sql);
    echo $sql;
   // $rows[]= mysqli_fetch_all($result1);
    //print_r($rows);exit;
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
            }
        }
    }
    else
    {
        $type = "error";
        $message = "Invalid File Type. Upload Excel File.";
    }
?>