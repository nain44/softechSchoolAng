<?php 
 require_once('vendor/php-excel-reader/excel_reader2.php');
  require_once('vendor/SpreadsheetReader.php');
  include_once("conn.php");
   

$data=getJsonParams();
    $dfile = $data['dfile'];
    $schId = $data['schId'];
    $result1=array();
    $rows =array();
    $r1 =array();
    $subjects=array();
    $students=array();
    $totalMarks=array();
    $prfId=0;
    $stfId=0;
    $secId=0;
    $clsId=0;
    $clsTitle="";
    $secTitle="";

    $term="";
    $session='';
    $tmsum = 0;
    $description="From Excel";
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
            foreach ($Reader as $key=>$Row)
            {
          // print_r($Row);
            if ($key == 0) continue;
               // {
                
               // $c1=mysqli_real_escape_string($conn,$Row[0]);
               //$temp = explode("(", $c1);
               //$schoolName=$temp[0];
               //$temp = explode(")",$temp[1]);
               //$regNo=$temp[0];
               //$temp = explode(".", $regNo);
               //$regNo=$temp[1];           
                     
               //      $sql = "CALL RegisterSchool('$regNo','$regNo','$schoolName','$Owner','$Cperson','$Contact','$Email','$District','$Tehsil','$Address','$Level','$schoolLogo')";

               //     $result1 = mysqli_query($conn,$sql);
               //      $r2 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
               //      $schId=$r2[0][cId];                     
               //     $conn->next_result();
   


               // }
            if ($key == 1) 
            {
                $c2 = mysqli_real_escape_string($conn,$Row[2]);
                $temp = explode("(", $c2);
                $temp = explode(")",$temp[1]);
                $temp = explode(" ",$temp[0]);
                $session = $temp[3];
                $term = $temp[0].' '.$temp[1];
 
               $sqlTerm = "CALL insertTerm('$schId','$term','$description','$session')";
               $resultTerm = mysqli_query($conn,$sqlTerm);
               $rTerm = mysqli_fetch_all($resultTerm, MYSQLI_ASSOC);
               $trmId=$rTerm[0][trm_id]; 
            }
                           $conn->next_result();

            if ($key == 2) 
            {
                            
                $c0 = mysqli_real_escape_string($conn,$Row[0]);
                 $temp = explode(":",$c0);
                $teacher = $temp[1];
                $proffession = $temp[0];              
                $c13 = mysqli_real_escape_string($conn,$Row[13]);
                $temp = explode(":", $c13);
                $clsTitle = trim($temp[1]); 
                $temp = explode("-", $clsTitle);
                $clsTitle = trim($temp[0]);
                $secTitle=trim($temp[1]);
               //$sql2 = "CALL InsertClass('$clsTitle','$capacity','$teacher','$schId')";
               //$result2 = mysqli_query($conn,$sql2);
               //$r2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
               //$clsId=$r2[0][cId]; 
               //$conn->next_result();
               
                    $qcls = "CALL getClassId('$schId','$clsTitle')";
                     $resultcls = mysqli_query($conn,$qcls);
                     $rcls = mysqli_fetch_all($resultcls, MYSQLI_ASSOC);
                     $clsId=$rcls[0][cls_id];
                     $conn->next_result(); 
                     echo $qcls.'clasid'.$clsId;
                     if(!$clsId || $clsId==0)
                     {
                     $q2 = "CALL InsertClass('$clsTitle','$capacity','$teacher','$schId')";
                     $result2 = mysqli_query($conn,$q2);
                     $rcls = mysqli_fetch_all($result2, MYSQLI_ASSOC);
                     $clsId=$rcls[0][cId];
                      echo 'classquery'.$q;

                        }
                     $conn->next_result();
                    $q3 = "CALL getSecId('$schId','$secTitle')";
                     $result3 = mysqli_query($conn,$q3);
                     $r3 = mysqli_fetch_all($result3, MYSQLI_ASSOC);
                     $secId=$r3[0][sec_id];
                    $conn->next_result();
                   echo 'secid'.$secId;
                    if(!$secId || $secId==0)
                            {
               $sqlSec = "CALL insertSection('$schId','$secTitle','$description')";
               $resultSec = mysqli_query($conn,$sqlSec);
               $rSec = mysqli_fetch_all($resultSec, MYSQLI_ASSOC);
               $secId=$rSec[0][secId]; 
               $conn->next_result();
                $sqlSecCls = "CALL insertSecCls('$secId','$clsId','$schId','$clsTitle','$secTitle')";
               $resultSecCls = mysqli_query($conn,$sqlSecCls);
               $conn->next_result();
                     
                                }  
                               
                     

               //$sqlSec = "CALL insertSection('$schId','$secTitle','$description')";
               //$resultSec = mysqli_query($conn,$sqlSec);
               //$rSec = mysqli_fetch_all($resultSec, MYSQLI_ASSOC);
               //$secId=$rSec[0][secId]; 
               //$conn->next_result();
               // $sqlSecCls = "CALL insertSecCls('$secId','$clsId','$schId','$clsTitle','$secTitle')";
               //$resultSecCls = mysqli_query($conn,$sqlSecCls);
               //$conn->next_result();
               

                $sql3 = "CALL insertProffession('$proffession','$description','$schId','$scale')";
               $result3 = mysqli_query($conn,$sql3);
               $r3 = mysqli_fetch_all($result3, MYSQLI_ASSOC);
               $prfId=$r3[0][prf_id]; 
              
               $conn->next_result();
                $sql4 = "CALL InsertTeacher('$teacher','$qualification','$contact','$address','$gender','$dob','$schId','$staffLogo','$doj','$prfId','1')";
               $result4 = mysqli_query($conn,$sql4);
               $r4 = mysqli_fetch_all($result4, MYSQLI_ASSOC);
               $stfId=$r4[0][stfId]; 
            
               $conn->next_result();

            }

            if($Row)
                    {

            if($key == 4)
            {
                
                $subName = "";
                if(isset($Row[2])) {
                    $subName = mysqli_real_escape_string($conn,$Row[2]);
                }
                
              
                $sub = 2;
                 while ($subName != "Total Marks") {                         

                    array_push($subjects,$subName);
                  
                    $sub++;
                     if(isset($Row[$sub])) {
                        $subName = mysqli_real_escape_string($conn,$Row[$sub]);
                    }else
                    {
                        // If there were no colmn named total markes
                    }
                }
               
              }
            else if($key == 7)
              {
                for($i=0;$i<count($subjects);$i++)
                {
                    $singleMarks = "";
                    if(isset($Row[$sub])) {
                        $singleMarks = mysqli_real_escape_string($conn,$Row[2+$i]);
                    }
                    array_push($totalMarks,$singleMarks);
                }
                
              }
              else if($key >= 8)
              {
              $myObj = "";
                if(isset($Row[0])) {
                
                    $myObj->id = mysqli_real_escape_string($conn,$Row[0]);
                }
                if(isset($Row[1])) {
                    $myObj->name = mysqli_real_escape_string($conn,$Row[1]);
                }
                if(isset($Row[1])) {
                    $myObj->obtainTotal = mysqli_real_escape_string($conn,$Row[2+count($subjects)]);
                }
                if(isset($Row[1])) {
                    $myObj->percentage = mysqli_real_escape_string($conn,$Row[2+count($subjects)+1]);
                }
                if(isset($Row[1])) {
                    $myObj->result = mysqli_real_escape_string($conn,$Row[2+count($subjects)+2]);
                }
                if(isset($Row[1])) {
                    $myObj->grade = mysqli_real_escape_string($conn,$Row[2+count($subjects)+3]);
                }
                if(isset($Row[1])) {
                    $myObj->position = mysqli_real_escape_string($conn,$Row[2+count($subjects)+4]);
                }
                $myObj->obtainedMarks = [];
                for($i=0;$i<count($subjects);$i++)
                {
                    $singleMarks = "";
                    if(isset($Row[$sub])) {
                        $singleMarks = mysqli_real_escape_string($conn,$Row[2+$i]);
                    }
                    array_push($myObj->obtainedMarks,$singleMarks);
                   
                }
                array_push($students,$myObj);
              }
              
                
         
       }
}
              
                
                     

                          
                
 
            $session;
              $term;
              $calssName;
              $temp = explode("-",$clsTitle);
              $clsTitle=$temp[0];
              $sec=$temp[1];

              $subjectIDs = array();
              
              for($i=0;$i<count($subjects);$i++)
              {
                $sbT=$subjects[$i] ;
               $tM= $totalMarks[$i] ;
               $tmsum = $tmsum+$tM;
               $sqlSub = "CALL InsertSubject('$sbT','$schId','$tM','$stfId')";
               $resultSub = mysqli_query($conn,$sqlSub);
               $rSub = mysqli_fetch_all($resultSub, MYSQLI_ASSOC);
               $sbId=$rSub[0][sbId]; 
               //push subject ids to an array for further use
               array_push($subjectIDs,$sbId);
               $conn->next_result();
               $sqlSubCls = "CALL insertSubCls('$sbId','$clsId','$schId','$clsTitle','$sbT')";
                $resultSubCls = mysqli_query($conn,$sqlSubCls);
                 $conn->next_result();

              }
             
              for($i=0;$i<count($students);$i++)
              {
                $rollNo=$students[$i]->id ;
                $Name= $students[$i]->name ;
                $RegNo=$students[$i]->id;
                           
               // $sqlStd = "CALL RegisterStudent('$rollNo','$Name','$FName','$FCnic','$FContact','$GRelation','$DOB','$Gender','$Address','$RegNo','$AdmissionFee','$clsId','$schId','$studentImage','$secId','$clsTitle','$secTitle')";
               $sqlStd = "CALL getStudentIds('$schId','$rollNo','$clsId','$secId')";
               $resultStd = mysqli_query($conn,$sqlStd);
               $rStd = mysqli_fetch_all($resultStd, MYSQLI_ASSOC);
               $stdId=$rStd[0][stdId]; 
               
               $conn->next_result();
               $obtTotal=$students[$i]->obtainTotal ;
               $percentage= $students[$i]->percentage ;
               $result= $students[$i]->result;
               $grade=$students[$i]->grade ;
               $position=$students[$i]->position;            
               $sqlmst = "CALL insertMarksStatus('$schId','$stdId','$clsId','$trmId','$percentage','$obtTotal','$tmsum','$secId')";
                $resultmst = mysqli_query($conn, $sqlmst);
                   $conn->next_result();
                    $sqlp = "CALL insertStudentsPosition('$schId','$stdId','$trmId','$position')";
                    $queryp = mysqli_query($conn, $sqlp);
                    $conn->next_result();
                 for($j=0;$j<count( $students[$i]->obtainedMarks);$j++)
                 {
                  $obtTotall=$students[$i]->obtainedMarks[$j] ;
                      $sbj=$subjects[$j] ;
                        $subIdl=$subjectIDs[$j];
                        $tml=$totalMarks[$j];
               $sqlrsl = "CALL InsertResult('$obtTotall','$subIdl','$schId','$trmId','$tml','$clsId','$stdId','$secId')";
               $resultrsl = mysqli_query($conn,$sqlrsl);
            $conn->next_result();
              
                       

                 }
              
               } 
                  
if($resultrsl)
    {
        //User is availaible
        $res= array("status" => 1, "description" => "Success");
    }else 
    {
        //User is not availaible
        $res= array("status" => 0, "description" => "Failed");
    }
    /* Output header */
    header('Content-type: application/json');
    echo json_encode($res);
    

}
    }
    else
    {
        $type = "error";
        $message = "Invalid File Type. Upload Excel File.";
    }
    ?>