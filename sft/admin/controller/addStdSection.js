app.controller("addStdSection-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {

    // if ($scope.userId == null || $scope.userId == undefined) {
    //     location.assign("../user")
    // }

    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var hh = ndate.getHours();
    var mni = ndate.getMinutes();
    var ss = ndate.getSeconds();
    var today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mni + ':' + ss;

    ////////////////////// Date Picker \\\\\\\\\\\\\\\\\\\\

    $("#datepickerM").datepicker({
        format: "mm",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
    });

    $("#datepickerEM").datepicker({
        format: "mm",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
    });

    $("#datepickerd").datepicker({


        autoclose: true,
    });


    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\

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

    //get current month and year
    var d = new Date();
    var cMonth = d.getMonth() + 1;
    var cYear = d.getFullYear();
    //------------- Get All Fees -------------
    $scope.src = {};
    $scope.spinnerAllFees = false;
    $scope.loadingdata = false;

    var srchObj = {
        day: today,

    };

    $scope.object1 = {};
    $scope.object2 = {};
    $scope.seletedones = [];
    $scope.seletedones2 = [];
    $scope.seletedones3 = [];
    $scope.seleteditems = [];
    $scope.seleteditems2 = [];
    $scope.seleteditems3 = [];
    $scope.disableButton = true;
    $scope.disableChk = false;
    $scope.disableChk2 = false;
    $scope.disableChk3 = false;

    $scope.checkall1 = function () {        
        $scope.seleteditems = [];
        angular.forEach($scope.allFeeArray, function (cate1) {
            
            $scope.seletedones[cate1.std_id] = $scope.object2.selected1;
            if ($scope.object2.selected1 == false || $scope.object2.selected1 == undefined) {
                     $scope.seleteditems = [];
            }
            if ($scope.seletedones[cate1.std_id] == true) {
               
                var qObj = cate1.std_id
                if (qObj != '')
                    $scope.seleteditems.push(qObj);
            }          
            
            if ($scope.seleteditems.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = false;

            }
            else {
                $scope.disableButton = true
            }
         
        });
        
    }
    $scope.selectchecked = function () {
        $scope.seleteditems = [];
         angular.forEach($scope.allFeeArray, function (cate1) {
             
            if ($scope.seletedones[cate1.std_id] == true) {
                var qObj = cate1.std_id
                if (qObj != '')
                    $scope.seleteditems.push(qObj);
                            }
            else {
                $scope.object2.selected1 = false;
            }
             
            if ($scope.seleteditems.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = false;

            }
            else {
                $scope.disableButton = true
            }

        });

    }
     $scope.srch = {}
    $scope.sec = {}
   $scope.resetClassAttendanceFunc = function () {
       
       $scope.getStudentForSection();
   }

   
    $scope.comArr =[]
    $scope.addStdToSectionFunc = function () {
        angular.forEach($scope.seleteditems, function (v, k) {       
        $scope.spinner = true;
    //    console.log(" $scope.sec.section.sec_id", $scope.sec.section.sec_id)
        var param = {

            "schId": $scope.userId,
            "stdId": v,
            "secId": $scope.sec.section.sec_id,
            'secTitle': $scope.sec.section.sec_title
        };
            
        var serviceData = serF.serverCall(param, $scope.addStdToSection);
        serviceData.then(function (result) {
            $scope.spinner = false;
            $scope.updateStdFeeArr = result.data.data;
            $state.reload();
        }, function myError(response) {
            console.log('Failed to load data')
            $scope.res_data = response.statusText;
        });
        })
    }
    $scope.getSec = function (v,stdId) {
       $scope.comArr.push({ 'sec_id': v.sec_id, 'std_id': stdId,'secTitle':v.sec_title })
    }
    $scope.getAllAttendanceFunc = function (srch) {
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId
        }

        if (srch != undefined && srch != "" && srch.classId != undefined && srch.classId != "") { param["classId"] = srch.classId.cls_id; }

        

        
        if (srch != undefined && srch != "") { param["stdId"] = srch.std_id; }
        var serviceData = serF.serverCall(param, $scope.getStudentForSection);
        serviceData.then(function (result) {
            $scope.allFeeArray = result.data.data;           
            $scope.loadingdata = false;
            console.log($scope.allFeeArray)
            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllAttendanceFunc(srchObj);
    $scope.getAllClass = function () {

        var param = { 'schId': $scope.userId }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);

        serviceData.then(function (result) {

            $scope.getAllClasses = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllClass();
    $scope.getSections = function (clsId) {

        $scope.loadingdata = true;

        var param = {
            'schId':$scope.userId
        }
        if (clsId) { param["classId"] = clsId; }

        var serviceData = serF.serverCall(param, $scope.getClassSection);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.dataSection = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.spinner = false;
}]);