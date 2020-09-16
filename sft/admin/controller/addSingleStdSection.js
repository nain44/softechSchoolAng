app.controller("addSingleStdSection-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {

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
    $scope.srch = {}
    $scope.sec = {
       
       
    }
    $scope.comArr = [] 
   $scope.resetClassAttendanceFunc = function () {
       
       $scope.getStdSectionFunc();
   }
  
    $scope.addStdToSectionFunc = function () {
        angular.forEach($scope.comArr, function (v, k) {
            
        $scope.spinner = true;
       var serviceData = serF.serverCall(v, $scope.addStdToSection);
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
       
        $scope.comArr.push({ 'schId':$scope.userId,'secId': v.sec_id, 'stdId': stdId,'secTitle':v.sec_title })    }
    
    $scope.getStdSectionFunc = function (srch) {
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId
        }

        if (srch != undefined && srch != "" && srch.classId != undefined && srch.classId != "") { param["classId"] = srch.classId.cls_id; }
        if (srch != undefined && srch != "" && srch.regNo != undefined && srch.regNo != "") { param["regNo"] = srch.regNo; }
        if (srch != undefined && srch != "" && srch.stdName != undefined && srch.stdName != "") { param["stdName"] = srch.stdName; }
       
        var serviceData = serF.serverCall(param, $scope.getStudentForSection);
        serviceData.then(function (result) {
            $scope.allFeeArray = result.data.data;
           
            $scope.loadingdata = false;
            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getStdSectionFunc(srchObj);
    $scope.getAllClass = function () {

        var param = {'schId':$scope.userId}
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
            'schId': $scope.userId
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
    $scope.getSections();
    $scope.getAllSectionFunc = function () {

        $scope.loadingdata = true;

        var param = {
        }
        var serviceData = serF.serverCall(param, $scope.getAllSection);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.dataSection = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
  //  $scope.getAllSectionFunc();
    $scope.spinner = false;

    $scope.clearData = function () {

        $scope.srch = {}
    }

}]);