app.controller("staffAttendance-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {

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
            $scope.seletedones[cate1.stf_id] = $scope.object2.selected1;
            if ($scope.object2.selected1 == false || $scope.object2.selected1 == undefined) {
                     $scope.seleteditems = [];
            }
            if ($scope.seletedones[cate1.stf_id] == true) {
               
                var qObj = { "stfId": cate1.stf_id, "isPresent": 1 }
                if (qObj != '')
                    $scope.seleteditems.push(qObj);
            }
            debugger;
            if ($scope.seleteditems.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = false;
                $scope.disableChk2 = true;
                $scope.disableChk3 = true;

            }
            else {
                $scope.disableButton = true
                $scope.disableChk2 = false;
                $scope.disableChk3 = false;
            }
         
        });
        
    }
    $scope.selectchecked = function () {
        $scope.seleteditems = [];
         angular.forEach($scope.allFeeArray, function (cate1) {

            if ($scope.seletedones[cate1.stf_id] == true) {
                var qObj = { "stfId": cate1.stf_id, "isPresent": 1}
                if (qObj != '')
                    $scope.seleteditems.push(qObj);
                            }
            else {
                $scope.object2.selected1 = false;
            }

            if ($scope.seleteditems.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = false;
                $scope.disableChk2 = true;
                $scope.disableChk3 = true;

            }
            else {
                $scope.disableButton = true
                $scope.disableChk2 = false;
                $scope.disableChk3 = false;
            }

        });

    }
    $scope.checkall2 = function () {
       $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.allFeeArray, function (cate2) {

            $scope.seletedones2[cate2.stf_id] = $scope.object2.selected2;
            if ($scope.object2.selected2 == false || $scope.object2.selected2 == undefined) {
                $scope.count = 0;
                $scope.seleteditems = [];
            }
            if ($scope.seletedones2[cate2.stf_id] == true) {
                $scope.count++;
                var qObj = { "stfId": cate2.stf_id, "isPresent": -1 }

                console.log(qObj, "qobj")
                if (qObj != '')

                    $scope.seleteditems.push(qObj);

            }
            if ($scope.seleteditems.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = true;
                $scope.disableChk2 = false;
                $scope.disableChk3 = true;

            }
            else {
                $scope.disableButton = true
                $scope.disableChk = false;
                $scope.disableChk3 = false;
            }

        });

    }
    $scope.selectchecked2 = function () {
        $scope.seleteditems2 = [];


        angular.forEach($scope.allFeeArray, function (cate2) {

            if ($scope.seletedones2[cate2.stf_id] == true) {
                var qObj = { "stfId": cate2.stf_id, "isPresent": -1}

                if (qObj != '')
                    $scope.seleteditems2.push(qObj);

            }
            else {
                $scope.object2.selected2 = false;

            }

            if ($scope.seleteditems2.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = true;
                $scope.disableChk3 = true;
            }
            else {
                $scope.disableButton = true
                $scope.disableChk = false;
                $scope.disableChk3 = false;
            }

        });

    }
    $scope.checkall3 = function () {

        $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.allFeeArray, function (cate3) {

            $scope.seletedones3[cate3.stf_id] = $scope.object2.selected3;
            if ($scope.object2.selected3 == false || $scope.object2.selected3 == undefined) {
                $scope.count = 0;
                $scope.seleteditems = [];
            }
            if ($scope.seletedones3[cate3.stf_id] == true) {
                $scope.count++;
                var qObj = { "stfId": cate3.stf_id, "isPresent": 2}


                if (qObj != '')
                    $scope.seleteditems.push(qObj);
            }
            if ($scope.seleteditems.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = true;
                $scope.disableChk2 = true;
                $scope.disableChk3 = false;

            }
            else {
                $scope.disableButton = true
                $scope.disableChk2 = false;
                $scope.disableChk = false;
            }

        });

    }
    var qObj = {};
   $scope.selectchecked3 = function () {
        $scope.seleteditems3 = [];
        $scope.count = 0;

        angular.forEach($scope.allFeeArray, function (cate3) {
            if ($scope.seletedones3[cate3.stf_id] == true) {
                 qObj = { "stfId": cate3.stf_id, "isPresent": 2,}

                if (qObj != '')
                    $scope.seleteditems3.push(qObj);

            }
            else {
                $scope.object2.selected3 = false;

            }

            if ($scope.seleteditems3.length != 0) {
                $scope.disableButton = false
                $scope.disableChk = true;
                $scope.disableChk2 = true;
                $scope.disableChk3 = false;
            }
            else {
                $scope.disableButton = true
                $scope.disableChk = false;
                $scope.disableChk2 = false;
            }

        });

    }
 //$scope.pshdata = function (rmk) {
 //        qObj.comments = rmk;
 //        debugger
 //        $scope.seleteditems3.push(qObj)
 //    console.log($scope.seleteditems3)
 //   }
   

   $scope.resetAttendaceFunc=function()
   {
       var param = {

           "schId": $scope.userId
           

       };

       var serviceData = serF.serverCall(param, $scope.resetAttendance);
       serviceData.then(function (result) {
           $scope.spinner = false;
           $scope.updateStdFeeArr = result.data.data;
           $state.reload();
       }, function myError(response) {
           console.log('Failed to load data')
           $scope.res_data = response.statusText;
       });
   }

    $scope.comArr =[]
    $scope.addAttendanceFunc = function () {
        $scope.spinner = true;
        var newArr = [];
        newArr = $scope.seleteditems.concat($scope.seleteditems2, $scope.seleteditems3)
        var param = {

            "schId": $scope.userId,
            "atDate": today,
            "fArry": newArr

        };

         var serviceData = serF.serverCall(param, $scope.insertStaffAttendance);
        serviceData.then(function (result) {
            $scope.spinner = false;
            $scope.updateStdFeeArr = result.data.data;
            $state.reload();
        }, function myError(response) {
            console.log('Failed to load data')
            $scope.res_data = response.statusText;
        });
    }
    $scope.getAllAttendanceFunc = function (srch) {
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }

       
        if (srch != undefined && srch != "" && srch.day != undefined && srch.day != "") { param["day"] = srch.day; }
        else
        {
            param["day"] = today;
        }


        if (srch != undefined && srch != "") { param["stfId"] = srch.stf_id; }
        var serviceData = serF.serverCall(param, $scope.getStaffAttendance);
        serviceData.then(function (result) {
            $scope.allFeeArray = result.data.data;

            //if ($scope.allFeeArray.length != 0)
            //    $scope.object2.selected1 = true;
            //    $scope.checkall1();
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
    $scope.spinner = false;
}]);