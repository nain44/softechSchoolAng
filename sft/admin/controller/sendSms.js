app.controller("sendSms-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {

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
    $scope.seleteditems = [];
    $scope.checkall1 = function () {

        $scope.seleteditems = [];
        angular.forEach($scope.dataStd, function (cate1) {

            console.log(cate1, "cate1", $scope.object2.selected1, "obje2")

            $scope.seletedones[cate1.std_id] = $scope.object2.selected1;
            if ($scope.object2.selected1 == false || $scope.object2.selected1 == undefined) {
                $scope.seleteditems = [];
            }
            if ($scope.seletedones[cate1.std_id] == true) {
                
                $scope.seleteditems.push(cate1.std_fContact);

            }

        });

    }
    $scope.selectchecked = function () {
        $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.dataStd, function (cate1) {

            if ($scope.seletedones[cate1.std_id] == true) {
                $scope.seleteditems.push(cate1.std_fContact);

            }
            else {
                $scope.object2.selected1 = false;
            }
        });

    }
     $scope.srch = {}   
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
    $scope.getallStudentsFunc = function () {
        
        $scope.loadingdata = true;

       
            var param = {
                "schId": $scope.userId
            }
            if ($scope.srch != undefined && $scope.srch != "" && $scope.srch.classId!=undefined) { param["classId"] = $scope.srch.classId.cls_id; }
            if ($scope.srch != undefined && $scope.srch != "" ) { param["stdId"] = $scope.srch.stdId; }
            if ($scope.srch != undefined && $scope.srch != "" && $scope.srch.section!=undefined) { param["secId"] = $scope.srch.section.sec_id; }
        var serviceData = serF.serverCall(param, $scope.GetAllStudent);

        serviceData.then(function (result) {
          
            $scope.loadingdata = false;
            $scope.dataStd = result.data.data;
            $scope.seleteditems=$scope.dataStd;
           
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
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
    $scope.getAllStudentsContactsFunc = function () {
        
        $scope.loadingdata = true;
       
       
            var param = {
                "schId": $scope.userId
            }
            if ($scope.srch != undefined && $scope.srch != "" && $scope.srch.classId!=undefined) { param["classId"] = $scope.srch.classId.cls_id; }
            if ($scope.srch != undefined && $scope.srch != "" ) { param["stdId"] = $scope.srch.stdId; }
            if ($scope.srch != undefined && $scope.srch != "" && $scope.srch.section!=undefined) { param["secId"] = $scope.srch.section.sec_id; }
        var serviceData = serF.serverCall(param, $scope.getAllStudentsContacts);

        serviceData.then(function (result) {
          
            $scope.loadingdata = false;
            $scope.dataStdcont = result.data.data;
           angular.forEach($scope.dataStdcont,function(k,v){
            $scope.seleteditems.push(k.std_fContact)


           } )
           {

           }
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.selectSubjects = function () {
        $scope.getallStudentsFunc();
       $('#selectSubjects').modal();
   }


   $scope.sendSmsFunc=function(sms){
    var param = {
        
         "msgContent": sms.smsContent,
         "numbers": $scope.seleteditems
     }        
      console.log(param)
           var serviceData = serF.serverCall(param, $scope.sendSms);
           serviceData.then(function (result) {
             $scope.obtMArr = []; 
           })            
              
             
        
   }
   $scope.clearData = function () {
    $state.reload();
    $scope.sms = "";
}

}]);