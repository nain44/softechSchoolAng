app.controller("AddstdFee-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {

    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;

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

    $("#datepickerY").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
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
    var cMonth = d.getMonth()+1;
    var cYear = d.getFullYear();
    //------------- Get All Fees -------------
    $scope.src={};
    $scope.spinnerAllFees = false;
    $scope.loadingdata = false;
   
    var srchObj = {
        cMonth: cMonth,
        cYear: cYear
    };

    $scope.object1 = {};
    $scope.object2 = {};
    $scope.seletedones = [];
    $scope.seleteditems = [];
    // ----- Check All ---------------

    $scope.checkall1 = function () {

        $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.allFeeArray, function (cate1) {
            $scope.seletedones[cate1.std_id] = $scope.object2.selected1;
            if ($scope.object2.selected1 == false || $scope.object2.selected1 == undefined) {
                $scope.count = 0;
                $scope.seleteditems = [];
            }
            if ($scope.seletedones[cate1.std_id] == true) {
                $scope.count++;
                var qObj = { "stdId": cate1.std_id }
                if (qObj != '')

                    $scope.seleteditems.push(cate1);
               
            }
           
        });
       
    }
    //-------checkbox checked new-----------
    $scope.selectchecked = function () {
        $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.allFeeArray, function (cate1) {

            if ($scope.seletedones[cate1.std_id] == true) {

                $scope.seleteditems.push(cate1);
                $scope.count++;
                //console.log("$singleselected", $scope.seleteditems)
            }
            else {
                $scope.object2.selected1 = false;
            }
        });
      
    }
    //-------checkbox checked new ended-----------

    $scope.getAllFees = function (srch) {
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId,
        }
        
        if (srch != undefined && srch != "" && srch.classId != undefined && srch.classId != "") { param["classId"] = srch.classId.cls_id; }
        if (srch != undefined && srch != "" && srch.section != undefined && srch.section != "") { param["secId"] = srch.section.sec_id; }

        if (srch != undefined && srch != "") {
            if (srch.date1 != undefined && srch.date2 != undefined) {
                $scope.month = srch.date1;
                param["month"] = srch.date1
                $scope.year = srch.date2;
                param["year"] = srch.date2;
            }
            else if(srch.date1 == undefined && srch.date2 != undefined) {
                $scope.month = cMonth;
                param["month"] = cMonth
                $scope.year = srch.date2;
                param["year"] = srch.date2;
            } else if (srch.date1 != undefined && srch.date2 == undefined) {
                $scope.month = srch.date1;
                param["month"] = srch.date1
                $scope.year = cYear;
                param["year"] = cYear
            }
            else {
                $scope.month = cMonth;
                param["month"] = cMonth
                $scope.year = cYear;
                param["year"] = cYear
            }           
        }
       
        if (srch != undefined && srch != "")
        { param["stdId"] = srch.std_id; }
        var serviceData = serF.serverCall(param, $scope.GetAllStdFee);
        serviceData.then(function (result) {            
            $scope.loadingdata = false;
            $scope.allFeeArray = result.data.data;
            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllFees(srchObj); 
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
    $scope.month = cMonth;
    $scope.year = cYear;
    $scope.spinner = false;
    $scope.addFee = function () {
        $scope.spinner = true;
        var param = {

            "schId": $scope.userId,
            "fArry": $scope.seleteditems

        };
        var serviceData = serF.serverCall(param, $scope.insertFeeForStudents);
        serviceData.then(function (result) {
            $scope.spinner = false;
            $scope.updateStdFeeArr = result.data.data;
            $state.reload();
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.resetFeeFunc = function () {
   
        $scope.spinner = true;
        var param = {
           
            "schId": $scope.userId,
           
        };
        var serviceData = serF.serverCall(param, $scope.resetFee);
        serviceData.then(function (result) {
            $scope.spinner = false;
            $scope.resetFeeVar = result.data.data;
            $state.reload();
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
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

}]);