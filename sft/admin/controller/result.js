app.controller("result", ['$scope', '$timeout', '$state', '$scope', '$window', 'serF', function($scope, $timeout, $state, $window, serF) {

    $scope.printFunction = function(printTable) {
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
    var stdId = getParameterByName('stdId');
    var term = getParameterByName('term');
    if (stdId && term) {
        location.assign('/#!/resultcard')
    }
    $scope.loadingBtn = false;
    $scope.studentList = [];
    $scope.printD = function() {
        window.print();
    }
    var getStudentInfo = function(schId, clsId, stdId, secId, trm) {

        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        if (clsId) { param["classId"] = clsId }
        if (stdId) { param["stdId"] = stdId; }

        var serviceData = serF.serverCall(param, $scope.GetAllStudent);

        serviceData.then(function(result) {

            $scope.loadingdata = false;
            $scope.allStudentArray = result.data.data;
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




        }, function myError(response) {
            console.log('Failed to load data')
                //$scope.res_data = response.statusText;
        });
    }
    var getStudentCountFunc = function(schId, clsId, secId, trm) {

        $scope.loadingdata = true;

        var param = {
            'schId': schId
        }


        if (clsId) { param["classId"] = clsId }
        if (secId) { param["secId"] = secId }
        if (stdId) { param["stdId"] = stdId }
        if (trm) { param["term"] = trm }
        var serviceData = serF.serverCall(param, $scope.getStudentCount);

        serviceData.then(function(result) {
            $scope.loadingdata = false;
            $scope.totalStudents = result.data.data[0].totalStudents;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    var getMarksStatusFunc = function(schId, clsId, stdId, secId, trm) {

        var param = {
            "schId": schId,
            "classId": clsId,
            "stdId": stdId,
            "secId": secId,

        }
        if (trm != undefined && trm != "") {
            param["term"] = trm;
        }
        var serviceData = serF.serverCall(param, $scope.getMarksStatus);
        serviceData.then(function(result) {

            $scope.loadingdata = false;
            $scope.allStudentArray = result.data.data;
            // $scope.totalStudents = $scope.allStudentArray.length;
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
            $scope.term = $scope.allStudentArray[0].term;
            $scope.rslt.class = $scope.allStudentArray[0].cls_id;
            $scope.rslt.section = $scope.allStudentArray[0].sec_id;
            $scope.clsTitle = $scope.allStudentArray[0].cls_title;
            $scope.secTitle = $scope.allStudentArray[0].sec_title;
            $scope.totalStudents = $scope.allStudentArray[1].totalStudents;
            var d = new Date($scope.allStudentArray[0].dateCreated);
            $scope.dateCreatedV = d;



        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getDataForMarksFunc = function(trm, rslt, stdName) {

        $scope.loadingdata = true;
        var sId = '';
        if ($scope.stdId) {
            sId = $scope.stdId;
        } else {
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
        serviceData.then(function(result) {
            $scope.loadingdata = false;

            $scope.dataForMarksArr = result.data.data;
            var studentId = $scope.dataForMarksArr[0].std_id;
            $scope.stdClass = $scope.dataForMarksArr[0].cls_id;
            $scope.stdSession = $scope.dataForMarksArr[0].std_session;
            $scope.stdSection = $scope.dataForMarksArr[0].sec_id;

            if (result) {
                getMarksStatusFunc($scope.userId, $scope.stdClass, studentId, $scope.stdSection, trm)
                    // getStudentInfo($scope.userId, $scope.stdClass, studentId, $scope.stdSection, trm)
                    //  getStudentCountFunc($scope.userId, $scope.stdClass, $scope.stdSection, trm)
                $scope.loadingBtn = false;

            }

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getDataForMarksFunc(term);
    $scope.rslt = {

        'AllClasses': [],
        'cls_id': [],
        'secData': [],
        'sec_id': [],
        'term': term

    };
    $scope.complete = function(studentName) {

        var output = [];

        angular.forEach($scope.studentList, function(v, k) {

            if (v.std_name.toLowerCase().indexOf(studentName.toLowerCase()) >= 0) {
                output.push(v);
            }
        })
        $scope.filterStudent = output
        $scope.hidethis = false;

    }
    $scope.fillTextBox = function(std) {

        $scope.studentName = std.std_name + '/' + std.std_fName;
        $scope.stdId = std.std_id
        $scope.hidethis = true;

    }
    $scope.nextFunc = function(term, r, print) {

        $scope.examHeldDate = term.trm_heldDate;
        if ($scope.studentList.length > 0) {
            $scope.loadingBtn = true;
        } else {
            $scope.loadingBtn = false;
            alert('Please select another callas or field')
        }
        var count = 0;

        angular.forEach($scope.studentList, function(v, k) {
            $scope.stdId = v.std_id

            if (k == 0 && count == 0) {
                $scope.getDataForMarksFunc(term.trm_id, v)


                $scope.nextPrint(print);

                $scope.studentList.splice(k, 1);
                console.log('after splice', $scope.studentList)

            }

        })

    }
    $scope.nextPrint = function(print) {
        if (print == 1) {
            $timeout(function() {
                window.print()
            }, 1500);

        }
    }
    var getSchoolInfoFunc = function() {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getSchoolInfo);

        serviceData.then(function(result) {

            $scope.loadingdata = false;
            $scope.getSchoolInfo = result.data.data;

            $scope.sch_title = $scope.getSchoolInfo[0].sch_title;
            $scope.sch_district = $scope.getSchoolInfo[0].sch_district;
            $scope.sch_tehsil = $scope.getSchoolInfo[0].sch_tehsil;
            $scope.sch_address = $scope.getSchoolInfo[0].sch_address;
            $scope.schoolLogo = $scope.getSchoolInfo[0].schoolLogo;
            $scope.sch_regId = $scope.getSchoolInfo[0].sch_regId;
            $scope.sch_contactNo = $scope.getSchoolInfo[0].sch_contactNo;
            $scope.circularText($scope.sch_title, 100, 0);

        }, function myError(response) {
            console.log('Failed to load data')
                //$scope.res_data = response.statusText;
        });
    }
    getSchoolInfoFunc();

    $scope.circularText = function(txt, radius, classIndex) {
        txt = txt.split(""), classIndex = document.getElementsByClassName("circTxt")[classIndex];

        var deg = 180 / txt.length,
            origin = -88;

        txt.forEach((ea) => {
            ea = `<p style='height:350px;position:absolute;transform:rotate(${origin}deg);transform-origin:0% 100%'>${ea}</p>`;
            classIndex.innerHTML += ea;
            origin += deg;
        });
    }

    $scope.getAllClassFunc = function() {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);
        serviceData.then(function(result) {
                $scope.loadingdata = false;
                $scope.getClasses = result.data.data


            },
            function myError(response) {
                console.log('Failed to load data')
            });
    }
    $scope.getAllClassFunc();
    $scope.getSections = function(obj) {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId,

        }
        if (obj) { param["classId"] = obj.classId.cls_id; }

        var serviceData = serF.serverCall(param, $scope.getClassSection);

        serviceData.then(function(result) {

            $scope.loadingdata = false;
            $scope.dataSection = result.data.data;
            $scope.getAllStudentsFunc(obj);

        }, function myError(response) {
            console.log('Failed to load data')
                //$scope.res_data = response.statusText;
        });
    }
    $scope.getAllStudentsFunc = function(aObj) {


        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }

        if (aObj) { param["classId"] = aObj.classId.cls_id; }
        if (aObj) { param["secId"] = aObj.section.sec_id; }
        if ($scope.rslt.term) { param["term"] = $scope.rslt.term.trm_id; }


        var serviceData = serF.serverCall(param, $scope.getAllStudentsForResultCard);

        serviceData.then(function(result) {
            $scope.loadingdata = false;
            $scope.studentList = result.data.data;
            console.log('before splice', $scope.studentList)


        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllStudentsFunc();
    $scope.getAllTermsFunc = function() {

        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getAllTerms);
        serviceData.then(function(response) {

            $scope.loadingdata = false;

            $scope.allTermArr = response.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
    $scope.getAllTermsFunc();

    $scope.clearData = function() {
        $state.reload();
        $scope.rslt.classId = "";
        $scope.rslt.section = "";
        $scope.rslt.term = "";
        $scope.studentName = "";
    }

}]);