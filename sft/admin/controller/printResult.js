app.controller("printResult", ['$scope','$timeout', '$state', '$scope', '$window', 'serF', function ($scope,$timeout, $state, $window, serF) {

    $scope.printFunction = function (printTable) {
        var printContents = document.getElementById(printTable).innerHTML;
        var originalContents = document.body.innerHTML;
        window.print();
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));

    }
    $scope.stdId = getParameterByName('stdId');
    var objLink = getParameterByName('obj');
    var objVal = JSON.parse(objLink)
    var termId = objVal.term.trm_id;
    $scope.examHeldDate = objVal.term.trm_heldDate;
    $scope.userId=objVal.term.sch_id;
    var prnt = 0;
    prnt = getParameterByName('prnt');
  
    $scope.loadingBtn = false;
    $scope.studentList = [];

   
      var circularText = function(txt, radius, classIndex) {
        txt = txt.split(""), classIndex = document.getElementsByClassName("circTxt")[classIndex];

        var deg = 180 / txt.length, origin = -90;

        txt.forEach((ea) => {
            ea = `<p style='height:300px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 120%'>${ea}</p>`;
            classIndex.innerHTML += ea;
            origin += deg;
        });
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
            
            $scope.stdPosition = $scope.allStudentArray[0].rs_position;
            $scope.totalMarks = $scope.allStudentArray[0].rs_totalMarks;
            $scope.obtTotalMarks = $scope.allStudentArray[0].rs_obtMarks;
            $scope.stdPercentage = $scope.allStudentArray[0].rs_percentage;
            $scope.subPercentage = $scope.allStudentArray[0].rslt_average;
            $scope.stdName = $scope.allStudentArray[0].std_name;
            $scope.stdFName = $scope.allStudentArray[0].std_fName;
            $scope.stdDob = $scope.allStudentArray[0].std_dob;
            $scope.stdRollNo = $scope.allStudentArray[0].std_rollNo;
            $scope.stdAdmissionNo = $scope.allStudentArray[0].std_admissionNo;
            $scope.stdClass = $scope.allStudentArray[0].cls_id;
            $scope.stdSession = $scope.allStudentArray[0].std_session;
            $scope.stdPicture = $scope.allStudentArray[0].std_picture;
            $scope.stdSection = $scope.allStudentArray[0].sec_id;
            $scope.term = $scope.allStudentArray[0].trm_title;
            $scope.clsTitle = $scope.allStudentArray[0].cls_title;
            $scope.secTitle = $scope.allStudentArray[0].sec_title;
            $scope.totalStudents = $scope.allStudentArray[1].totalStudents;
            $scope.stdRollNo=$scope.allStudentArray[0].std_rollNo;
            
            var d = new Date($scope.allStudentArray[0].dateCreated);
            $scope.dateCreatedV = d;
            
            if (prnt == 1) {
                $timeout(function () {

                    window.print();
                    window.close();

                }, 1200);

            }
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getDataForMarksFunc = function (trm) {
        
        $scope.loadingdata = true;
        var sId = '';
        if ($scope.stdId)
        {
            sId = $scope.stdId;
        }
        else {
            sId = stdId;
        }
        var param = {
            "schId": $scope.userId,
            "stdId": sId
        }
        if (trm != undefined && trm != "") {
            param["term"] = trm;
        } 
        var serviceData = serF.serverCall(param, $scope.getDataForMarks);
        serviceData.then(function (result) {
            $scope.loadingdata = false;
         
            $scope.dataForMarksArr = result.data.data;
            
            var studentId = $scope.dataForMarksArr[0].std_id;          
            $scope.stdClass = $scope.dataForMarksArr[0].cls_id;
            $scope.stdSession = $scope.dataForMarksArr[0].std_session;     
            $scope.stdSection = $scope.dataForMarksArr[0].sec_id;
            
            if (result) {
                getMarksStatusFunc($scope.stdClass, studentId, $scope.stdSection, trm)
                $scope.loadingBtn = false;

            }
            
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getDataForMarksFunc(termId);

    var getSchoolInfoFunc = function () {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getSchoolInfo);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.getSchoolInfoData = result.data.data;
            $scope.sch_title = $scope.getSchoolInfoData[0].sch_title;
            $scope.sch_district = $scope.getSchoolInfoData[0].sch_district;
            $scope.sch_tehsil = $scope.getSchoolInfoData[0].sch_tehsil;
             $scope.sch_address = $scope.getSchoolInfoData[0].sch_address;
             $scope.schoolLogo = $scope.getSchoolInfoData[0].schoolLogo;
             $scope.sch_contactNo = $scope.getSchoolInfoData[0].sch_contactNo;
             $scope.sch_regId = $scope.getSchoolInfoData[0].sch_regId;
             
            circularText($scope.sch_title, 100, 0);

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    getSchoolInfoFunc();
    
    $scope.getAllTermsFunc = function () {

        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getAllTerms);
        serviceData.then(function (response) {

            $scope.loadingdata = false;

            $scope.allTermArr = response.data.data;
        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
    $scope.getAllTermsFunc();

    $scope.clearData = function () {
        $state.reload();
        $scope.rslt.classId = "";
        $scope.rslt.section = "";
        $scope.rslt.term = "";
        $scope.studentName = "";
    }

}]);