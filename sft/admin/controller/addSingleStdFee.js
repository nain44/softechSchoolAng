app.controller("addSingleStdFee-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {

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
    $scope.stdIdArr = [];
    $scope.getAllFees = function (srch) {
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId,
        }
        if (srch != undefined && srch != "" && srch.classId != undefined && srch.classId != "") { param["classId"] = srch.classId.cls_id; }
        if (srch != undefined && srch != "" && srch.section != undefined && srch.section != "") { param["secId"] = srch.section.sec_id; }

        if (srch != undefined && srch != "") { param["stdId"] = srch.std_id; }       
        var serviceData = serF.serverCall(param, $scope.getSingleStdFee);
        serviceData.then(function (result) {
            
            $scope.loadingdata = false;
            $scope.allFeeArray = result.data.data;
            setTimeout(function () {
                $('#example1').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllFees();
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
    var month = cMonth;
    var year = cYear;
    $scope.spinner = false;
    $scope.addFee = function (addObj) {
        $scope.seleteditems = [];
        addObj.pwf_year = cYear;
        $scope.seleteditems.push(addObj);
        
        $scope.spinner = true;
        var param = {
            
            "schId": $scope.userId,
            "fArry":$scope.seleteditems,
          
        };
        var serviceData = serF.serverCall(param, $scope.insertFeeForStudents);
        serviceData.then(function (result) {
            $scope.spinner = false;
            $scope.updateStdFeeArr = result.data.data;            
            $state.reload();
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    //------------------ Edit Fee-------------
    $scope.getSpicMonthsFunc = function (stdIdArr) {
        $scope.monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var param = {
            'schId': $scope.userId,
            'stdId': stdIdArr
        }
        var serviceData = serF.serverCall(param, $scope.getSpicMonths);

        serviceData.then(function (result) {

            $scope.getSpM = result.data.data;
            console.log("getSpM",$scope.getSpM)
            if ($scope.getSpM.length != 0)

                angular.forEach($scope.getSpM, function (val, key) {
                    var index = $scope.monthArr.indexOf(parseInt(val.fee_month));
                    if (index > -1) {
                        $scope.monthArr.splice(index, 1);
                        console.log($scope.monthArr)
                    }
                  
            })
          
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