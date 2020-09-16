app.controller("resultCardBulkPrint-ct", ['$scope', '$interval', '$state', '$scope', '$window', 'serF', function ($scope, $interval, $state, $window, serF) {

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
    var stdId = getParameterByName('stdId');
    var term = getParameterByName('term');
    if (stdId && term) {
        location.assign('/#!/resultcard')
    }
    var var1 = 0
    var var2 = 0
    var var3 = 0;
    var var4 = 0;
    var getStudentCountFunc = function (schId, clsId, secId, trm) {

        $scope.loadingdata = true;

        var param = {
            'schId': schId
        }
        
        if (clsId) { param["classId"] = clsId }
        if (secId) { param["secId"] = secId }
        if (stdId) { param["stdId"] = stdId }
        if (trm) { param["term"] = trm }
        var serviceData = serF.serverCall(param, $scope.getStudentCount);

        serviceData.then(function (result) {
            $scope.loadingdata = false;
            $scope.totalStudents = result.data.data[0].totalStudents;
            var4 = var4 + 1;
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    var getStudentInfo = function (schId, clsId, studentId, secId, trm) {
        
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        if (clsId) { param["classId"] = clsId}
        if (studentId) { param["stdId"] = studentId; }

        var serviceData = serF.serverCall(param, $scope.GetAllStudent);
	    
        serviceData.then(function (result) {

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
            $scope.rslt.sectionStd = ''
            switch ($scope.allStudentArray[0].sec_id) {
                   case '1':
                       $scope.rslt.sectionStd = "A";
                    break;
                case '2':
                    $scope.rslt.sectionStd = "B";
                    break;
                case '3':
                    $scope.rslt.sectionStd = "C";
                    break;
                case '4':
                    $scope.rslt.sectionStd = "D";
                    break;
                default:
                    $scope.rslt.sectionStd = 'Select Section'
                    
            }

             $scope.rslt.classStd=''
            switch ($scope.allStudentArray[0].cls_id) {
                case '-2':
                    $scope.rslt.classStd = "Play Group";
                    break;
                case '-1':
                    $scope.rslt.classStd = "Nursary";
                    break;
                case '0':
                    $scope.rslt.classStd = "KG";
                    break;

                case '1':
                    $scope.rslt.classStd = "1st";
                    break;
                case '2':
                    $scope.rslt.classStd = "2nd";
                    break;
                case '3':
                    $scope.rslt.classStd = "3rd";
                    break;
                case '4':
                    $scope.rslt.classStd = "4th";
                    break;
                case '5':
                    $scope.rslt.classStd = "5th";
                    break;
                case '6':
                    $scope.rslt.classStd = "6th";
                    break;
                case '7':
                    $scope.rslt.classStd = "7th";
                    break;
                case '8':
                    $scope.rslt.classStd = "8th";
                    break;
                case '9':
                    $scope.rslt.classStd = "9th";
                    break;
                case '10':
                    $scope.rslt.classStd = "10th";
                    break;
	            
	           
            }
            var3 = var3 + 1;
            getStudentCountFunc($scope.userId, clsId, secId, trm)

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    var getMarksStatusFunc = function (schId, clsId, studentId, secId, trm) {
	   
        var param = {
            "schId": schId,
            "classId": clsId,
            "stdId": studentId,
            "secId": secId,

        }
        if (trm != undefined && trm != "") {
            param["term"] = trm;
        }
        var serviceData = serF.serverCall(param, $scope.getMarksStatus);
        serviceData.then(function (result) {
            
            $scope.loadingdata = false;
            $scope.dataMStatus = result.data.data;
            $scope.totalStudents = $scope.dataMStatus.length;
            $scope.stdPosition = $scope.dataMStatus[0].rs_position;
            $scope.totalMarks = $scope.dataMStatus[0].rs_totalMarks;
            $scope.obtTotalMarks = $scope.dataMStatus[0].rs_obtMarks;
            $scope.stdPercentage = $scope.dataMStatus[0].rs_percentage;
            if (result) {
                var2 = var2 + 1;
                getStudentInfo($scope.userId, clsId, studentId, secId, trm)
            }
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getDataForMarksFunc = function (trm, rslt) {
        
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
                var1 = var1+1;
                getMarksStatusFunc($scope.userId, $scope.stdClass, studentId, $scope.stdSection, trm)
               
                
            }
	        
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getDataForMarksFunc(term);
    var getSchoolInfoFunc = function () {
	    
        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getSchoolInfo);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.getSchoolInfo = result.data.data;	        
            $scope.sch_title = $scope.getSchoolInfo[0].sch_title;
            $scope.sch_district = $scope.getSchoolInfo[0].sch_district;
            $scope.schoolLogo = $scope.getSchoolInfo[0].schoolLogo;
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    getSchoolInfoFunc();
    $scope.studentList = [];
     $scope.rslt = {

        'AllClasses': [],
        'cls_id': [],
        'secData': [],
        'sec_id': [],
         'term':term

    };
	$scope.getAllClass = function () {

	    $scope.loadingdata = true;

	    var param = {
	        'schId': $scope.userId
	    }
	    var serviceData = serF.serverCall(param, $scope.GetAllClassesdrp);
	    serviceData.then(function (result) {
	        $scope.loadingdata = false;
	        angular.forEach(result.data.data, function (v, k) {
	            $scope.rslt.AllClasses.push(v.cls_title)
	            $scope.rslt.cls_id.push(v.cls_id)
	            
	        })
	       
	    },
        function myError(response) {
	        console.log('Failed to load data')
	    });
	}
	$scope.getAllClass();
	$scope.getSections = function (clsId) {
        
	    $scope.loadingdata = true;

	    var param = {
	        'schId': $scope.userId,
            
	    }
	    if (clsId) { param["classId"] = clsId; }

	    var serviceData = serF.serverCall(param, $scope.getClassSection);

	    serviceData.then(function (result) {

	        $scope.loadingdata = false;
	        $scope.rslt.secData= []
	        angular.forEach(result.data.data, function (v, k) {
	            $scope.rslt.secData.push(v.sec_title)
	            $scope.rslt.sec_id.push(v.sec_id)

	        })

	    }, function myError(response) {
	        console.log('Failed to load data')
	        //$scope.res_data = response.statusText;
	    });
	}
	$scope.getAllStudentsFunc = function (aObj) {
        
        if(aObj!=undefined){
            $scope.filterStudent = ''
           // $scope.studentName = ''

            var clasId = '';
            switch (aObj.classStd) {
                case '"Play Group"':
                    clasId = '-2';
                    break;
                case 'Nursary':
                    clasId = "-1";
                    break;
                case 'KG':
                    clasId = "0";
                    break;

                case '1st':
                    clasId = "1";
                    break;
                case '2nd':
                    clasId = "2";
                    break;
                case '3rd':
                    clasId = "3";
                    break;
                case '4th':
                    clasId = "4";
                    break;
                case '5th':
                    clasId = "5";
                    break;
                case '6th':
                    clasId = "6";
                    break;
                case '7th':
                    clasId = "7";
                    break;
                case '8th':
                    clasId = "8";
                    break;
                case '9th':
                    clasId = "9";
                    break;
                case '10th':
                    clasId = "10";
                    break;
            }
            
            var secId = '';
            switch (aObj.sectionStd) {
               
                case 'A':
                    secId = "1";
                    break;
                case 'B':
                    secId = "2";
                    break;
                case 'C':
                    secId = "3";
                    break;
                case 'D':
                    secId = "4";
                    break;
              
            }

        }
        $scope.getSections(clasId);

	    $scope.loadingdata = true;

	    var param = {
	        "schId": $scope.userId
	    }
	    if (aObj) { param["classId"] = clasId; }
	    if (aObj) { param["secId"] = secId; }
	    if ($scope.rslt.term) { param["term"] = $scope.rslt.term; }


	    var serviceData = serF.serverCall(param, $scope.getAllStudentsForResultCard);

	    serviceData.then(function (result) {
	        $scope.loadingdata = false;
	        $scope.studentList = result.data.data;
	    }, function myError(response) {
	        console.log('Failed to load data')
	    });
	}
	$scope.getAllStudentsFunc();
	var count = 0;
	$scope.complete = function (term,rslt,stdname) {
	    var output = [];

	    angular.forEach($scope.studentList, function (v, k) {
          
	            if (v.std_name.toLowerCase()) {
	                $scope.stdId = v.std_id
	                $scope.getDataForMarksFunc(term, v);

	                count++;

	            }
	        

	    })
	  

	}

	
	

	

}]);