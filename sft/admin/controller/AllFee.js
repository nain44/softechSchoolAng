app.controller("AllFee-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF){

    // if ($scope.userId == null || $scope.userId == undefined) {
    //     location.assign("../user")
    // }

    $scope.printFunction=function()
    {
        window.print();
    }

    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth()+1; 
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


    //------------- Get All Fees -------------

    $scope.spinnerAllFees = false;
    $scope.loadingdata=false;
    $scope.getAllFees = function (srch) {
        $scope.spinnerAllFees = true;
        $scope.loadingdata=true;

         var param = {
             "schId": $scope.userId,
         }

         if ($scope.srch != undefined && $scope.srch != "" && $scope.srch.classId!=undefined)

         { param["classId"] = $scope.srch.classId.cls_id; }
         if (srch != undefined && srch != "" && srch.section != undefined && srch.section != "") { param["secId"] = srch.section.sec_id; }

        if ($scope.srch != undefined && $scope.srch != "") { param["month"] = $scope.srch.date1;}
        // else{
        //     param["month"]= today;
        // }
        if ($scope.srch != undefined && $scope.srch != "") { param["year"] = $scope.srch.date2; }
        // else{
        //     param["year"]=today;
        // }
        var serviceData = serF.serverCall(param, $scope.stdFeeView);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.allFeeArray = result.data.data;

            
            setTimeout(function(){
               $('#example').DataTable();
             }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
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
   
    //------------------ Edit Fee-------------

    $scope.clearData = function () {
        $scope.srch.classId = "";
        $scope.srch.section = "";
        $scope.srch.date1 = "";
        $scope.srch.date2 = "";
        $state.reload();
    }

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable1').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "All_Fees.xls");
    }   
}]);