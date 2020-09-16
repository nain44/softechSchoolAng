app.controller("ResultTermBase-ct", ['$scope','$timeout', '$state','$scope', '$window', 'serF', function ($scope,$timeout, $state,$window, serF) {

    if ($scope.userId == null || $scope.userId == undefined) { location.assign("Login") }

    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;

    /////////////////////// Date Picker Start \\\\\\\\\\\\\\\\\\\\\\\\

    $('#enddate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });
    $('#startdate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    }).on('change', function (e, date) {
        $('#enddate').bootstrapMaterialDatePicker('setMinDate', date);
    });

    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\

    $scope.rslt = {};
    $scope.pos = {};
    
    //---------------get allStudents----------

    $scope.loadingdata = false;

    $scope.getAllStudents = function (objClass) {
        $scope.loadingdata = true;

        //if (!$scope.rslt.term)
        //{
        //    alert("Please! Select Term")
        //    return
        //}

        var param = {
            "schId": $scope.userId
        }
        if (objClass) {
            if (objClass.class) { param["classId"] = objClass.class.cls_id; }
            if (objClass.section) { param["secId"] = objClass.section.sec_id; }
            if ($scope.rslt.term) { param["term"] = $scope.rslt.term.trm_id }
        }
        var serviceData = serF.serverCall(param, $scope.getStudentsForMarks);
        serviceData.then(function (result) {
            $scope.loadingdata = false;
            $scope.allStudentArray = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getAllStudents();

    $scope.getDMC = function (pos, stdnt, prnt) {
        $scope.stdId = stdnt.std_id;
        var myWindow = window.open("http://localhost/softechschool/admin/#!/printResult?stdId=" + $scope.stdId + '&obj=' + JSON.stringify(pos)+'&prnt='+prnt, "newWin", "width="+screen.availWidth+",height="+screen.availHeight);
    }

    $scope.obtMArr = [];
    $scope.addOM = function (obj, term) { 
        
        $scope.saveLoading[obj.sub_id] = true;
        $scope.errorShow = false;
        if (term == '' || term == undefined) {            
            $scope.errorShow = true;
            return false;
        } else {
            $scope.errorShow = false;
        }
        if (obj.rslt_obtMarks) {
            $scope.errorShowM = [];
            $scope.errorShowM[0] = false;           
            $scope.errorShowR = false;
            if (parseInt(obj.sub_marks) < parseInt(obj.rslt_obtMarks)) {
                $scope.errorShowM[obj.sub_id] = true;
                $scope.errorSho = true;                
                $scope.saveLoading[obj.sub_id] = false;
                return false;
            }
            else {
                $scope.errorShowM[obj.sub_id] = false;
                $scope.errorSho = false;
            }
        }
        if (obj.rslt_obtMarks && obj.sub_id && obj.std_id && term) {

            $scope.obtMArr.push({
                'subId': obj.sub_id,
                'obtMarks': obj.rslt_obtMarks,
                'totalMarks': obj.sub_marks,
                'stdId': obj.std_id,
                'clsId': obj.cls_id,
                'schId':$scope.userId,
                "term": term.trm_id,
                "secId":obj.sec_id
            });
        }
    }

    $scope.getResult =function(objStd,term)
    {
        $scope.objTerm = objStd;
        $scope.studentName = objStd.std_name;
        $scope.fatherName = objStd.std_fName;
        $scope.admiNo = objStd.std_admissionNo;
        $scope.getDataForMarksFunc1(objStd,term.trm_id);        
        $('#addResult').modal({ show: true, backdrop:false,keyboard:false });
    }
    $scope.upos=function (stdId,pos){
        
        var param = {
           
            "stdId": stdId,
            "position": pos.position
        }        
         
              var serviceData = serF.serverCall(param, $scope.updatePosition);
              serviceData.then(function (result) {
                $scope.obtMArr = []; 
                if(result.description="Success")
                {             
                 
                var objclsec = {
                  'class': {'cls_id':$scope.rslt.class},
                  'section':{'sec_id': $scope.rslt.section }
              }
              
              
                  $('#updateStatus').modal('hide');  
                            
            $scope.getAllStudents(objclsec);
            }
            }, function myError(response) {
                console.log('Failed to load data')
            });
             
              
                          
               
          
         }
    $scope.getResultStatus =function(objStd,term)
    {
        $scope.objTerm = objStd;
        $scope.studentName = objStd.std_name;
        $scope.fatherName = objStd.std_fName;
        $scope.admiNo = objStd.std_admissionNo;
        $scope.stdId = objStd.std_id;
        $scope.getDataForMarksFunc1(objStd,term.trm_id);  
              
        $('#updateStatus').modal({ show: true, backdrop:false,keyboard:false });
    }

    var getMarksStatusFunc = function (clsId, stdId, secId, trm) {
        
        var param = {
            "schId": $scope.userId,
            "classId": clsId,
            "stdId": stdId,
            "secId": secId,
        }

        if (trm != undefined && trm != "") {
            param["term"] = trm;
        }

        var serviceData = serF.serverCall(param, $scope.getMarksStatus);
        serviceData.then(function (result) {
            $scope.loadingdata = false;
            $scope.allStudentArray = result.data.data;
            // $scope.totalStudents = $scope.allStudentArray.length;
            $scope.stdPosition = $scope.allStudentArray[0].rs_position;            
            $scope.pos.position=$scope.stdPosition;                  
            $scope.totalMarks = $scope.allStudentArray[0].rs_totalMarks;
            $scope.obtTotalMarks = $scope.allStudentArray[0].rs_obtMarks;
            $scope.stdPercentage = $scope.allStudentArray[0].rs_percentage;
            $scope.stdName = $scope.allStudentArray[0].std_name;
            $scope.stdFName = $scope.allStudentArray[0].std_fName;
            $scope.stdDob = $scope.allStudentArray[0].std_dob;
            $scope.stdRollNo = $scope.allStudentArray[0].std_rollNo;
            $scope.stdAdmissionNo = $scope.allStudentArray[0].std_admissionNo;
            $scope.stdClass = $scope.allStudentArray[0].cls_id;
            $scope.stdSession = $scope.allStudentArray[0].std_session;
            $scope.stdPicture = $scope.allStudentArray[0].std_picture;
            $scope.stdSection = $scope.allStudentArray[0].sec_id;
            $scope.term = $scope.allStudentArray[0].term;
            $scope.rslt.class = $scope.allStudentArray[0].cls_id;
            $scope.rslt.section = $scope.allStudentArray[0].sec_id;
            $scope.totalStudents = $scope.allStudentArray[1].totalStudents;
            $scope.cTitle = $scope.allStudentArray[0].cls_title;
            $scope.sTitle = $scope.allStudentArray[0].sec_title;
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getDataForMarksFunc1 = function (objStd, trm) {

        if (trm == '' || trm == undefined)
        {
            $scope.errorShow = true;
        }
        else{
            $scope.errorShow = false;
        }

        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId,
            "stdId": objStd.std_id
        }
        
        if (trm != undefined && trm != "") { param["term"] = trm; }
        var serviceData = serF.serverCall(param, $scope.getDataForMarks);
        serviceData.then(function (result) {
            $scope.loadingdata = false;
            $scope.dataForMarksArr = result.data.data;
            var studentId = $scope.dataForMarksArr[0].std_id;
            $scope.stdClass = $scope.dataForMarksArr[0].cls_id;
            $scope.stdSession = $scope.dataForMarksArr[0].std_session;
            $scope.stdSection = $scope.dataForMarksArr[0].sec_id;
            getMarksStatusFunc($scope.stdClass, studentId, $scope.stdSection, trm)
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.saveLoading = false;
    $scope.addResult = function () {
        $scope.loadingdata = true;
        $scope.saveLoading = true;

        if ($scope.obtMArr.length != 0) {

            var param = $scope.obtMArr;
            var serviceData = serF.serverCall(param, $scope.InsertResult);
            serviceData.then(function (result) {
                $scope.loadingdata = false;
                var objclsec = {
                    'class': {'cls_id':$scope.obtMArr[0].clsId},
                    'section':{'sec_id':$scope.obtMArr[0].secId}
                }
                $scope.obtMArr = [];
                $scope.lastId = result.data.lastId;
                if (result)
                  $('#addResult').modal('hide');

              $scope.getAllStudents(objclsec);
              $scope.saveLoading = false;
              $scope.loadingdata = false;

          }, function myError(response) {
            console.log('Failed to load data')
        });

               // })
           }
       }
       $scope.submitResultFunc = function (rslt) {
        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId,


        }
        if (rslt.class) { param["classId"] = rslt.class.cls_id; }
        if (rslt.section) { param["secId"] = rslt.section.sec_id; }
        if (rslt.term) {param["term"] = rslt.term;} 

        var serviceData = serF.serverCall(param, $scope.getMarksStatus);
        serviceData.then(function (result) {
            $scope.loadingdata = false;
            $scope.dataMStatus = result.data.data;
            $scope.totalStudents = $scope.dataMStatus.length;
            $scope.position1 = 1;
            angular.forEach($scope.dataMStatus, function (v, k) {


                if (k == 0) {
                    $scope.position1 = 1;
                    $scope.marks = v.rs_obtMarks;
                } else {
                    if ($scope.marks != v.rs_obtMarks) {
                        $scope.position1 = $scope.position1 + 1;
                        $scope.marks = v.rs_obtMarks;

                    }

                }
                var param = {
                    "schId": $scope.userId,
                    "stdId": v.std_id,
                    'stdPosition': $scope.position1  


                }
                if (rslt.term) { param["term"] = rslt.term.trm_id; }
                var serviceData = serF.serverCall(param, $scope.insertStudentsPosition);
                serviceData.then(function (result) {

                    if (k >= $scope.dataMStatus.length-1)
                    {

                        $scope.getAllStudents(rslt);
                    }
                })

            })

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    //-------------------------clear textboxes-----------

    $scope.clearData = function () {
        $state.reload();
        $scope.rslt.class = {};
        $scope.rslt.section = {};
        $scope.rslt.term = {};
    }
    $scope.clear = function () {
          
     
    var objclsec = {
      'class': {'cls_id':$scope.rslt.class},
      'section':{'sec_id': $scope.rslt.section }
  }                
$scope.getAllStudents(objclsec);
}

    //---------------/get allStudents-------------
    
    $scope.getAllClassFunc = function () {

        var param = {
            'schId': $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);

        serviceData.then(function (result) {


            $scope.allClassesArr = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.getAllClassFunc();
    $scope.getSections = function (clsId) {



        var param = {
            'schId': $scope.userId
        }
        if (clsId) { param["classId"] = clsId; }
        var serviceData = serF.serverCall(param, $scope.getClassSection);

        serviceData.then(function (result) {


            $scope.secData = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.getAllTermsFunc = function () {


        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getAllTerms);
        serviceData.then(function (response) {


            $scope.allTermArr = response.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
    $scope.getAllTermsFunc();
    //---------------/get all Suject drp-------------

    $scope.getallsbjdrp = function () {      

        var param = {
        }
        var serviceData = serF.serverCall(param, $scope.getAllSbjectDrp);

        serviceData.then(function (result) {


            $scope.getallsbjtdrp = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.getallsbjdrp();

}]);
app.controller('myCtrl', ['$scope', '$state', 'fileUpload', '$http', function ($scope, $state, fileUpload, $http) {

    $scope.pbl = {};
    $scope.sizeLimit = 10585760; // 10MB in Bytes
    $scope.uploadProgress = 0;
    $scope.creds = {};
    $scope.spinnerUp = false;
    $scope.uploadFile = function (file) {

        var fd = new FormData();
        fd.append('file', file);
        var dt = {
            "schId": $scope.userId,
            "dfile": file
        };

        $scope.res_data = {}
        var url_signup = 'http://localhost/softechschool/admin/services/addResultFromExcel.php';
        $http({
            method: "POST",
            url: url_signup,
            data: dt,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function mySuccess(response) {
            $state.reload();

        }, function myError(response) {
            console.log('Failed to load data')
        });
    };
    $scope.usl = function () {
        $scope.vs.vrd = true;
    }

    $scope.fileSizeLabel = function () {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.uniqueString = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}]);