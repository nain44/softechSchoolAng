app.controller("addPayments-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF){
    
    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    // console.log("date", today)

    ////////////////////// Date Picker \\\\\\\\\\\\\\\\\\\\

    $("#datepicker").datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
    });

   
    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\


    // --------------- Get All Classes Drp -------------


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
    
    $scope.getSections = function (clsId) {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        if (clsId) { param["classId"] = clsId;
    
    }

        var serviceData = serF.serverCall(param, $scope.getClassSection);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.dataSection = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getAllStudentsDrpFunc = function () {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
      //  if (clsId) { param["classId"] = clsId;  }

        var serviceData = serF.serverCall(param, $scope.getAllStudentsDrp);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.dataStudents = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllStudentsDrpFunc();
    $scope.getAllClassFunc= function () {

        var param = { 'schId': $scope.userId }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);

        serviceData.then(function (result) {

            $scope.getDataC = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllClassFunc();
    // --------------- Get All Classes Drp -------------
    var monthArr = [];
    $scope.loadingdata = false;
    $scope.addPaymentFunc = function (srch,ther) {
        debugger
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId,
            "Amount":srch.fee,
            'Year':srch.date2,
            'cId': srch.classId.cls_id,
            'clsTitle':srch.classId.cls_title,
            "Month" :ther.date      
        }
      

        var serviceData = serF.serverCall(param, $scope.addPayment);
        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.allFeeArray = result.data.data;
            $scope.getAllFees();
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.spinnerAllFees = false;
    $scope.loadingdata = false;
    $scope.getAllFees = function (srch) {
        
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId,
        }
        if ($scope.srch != undefined && $scope.srch != "") { param["classId"] = $scope.srch.classId.cls_id; }
        var serviceData = serF.serverCall(param, $scope.getAllClassFee);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.allFeeArray = result.data.data;


            setTimeout(function () {
                $('#acf').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.getAllFees();
    
        //------------------ Edit Fee-------------
        
    $scope.fee = {}
    $scope.editModal = function (feeEdit) {
        $scope.fee.feeId = feeEdit.pwf_id;
        $scope.fee.pwf_fee = feeEdit.pwf_fee;
    }


    $scope.editFee = function (edtObj) {
       $scope.spinner = true;
       var param = {
            "Fee": edtObj.pwf_fee,
            "ID": edtObj.pwf_id
        };        
        
        var serviceData = serF.serverCall(param, $scope.UpdatePWfees);
        serviceData.then(function (response) {

            $scope.spinner = false;
            console.log('edit fee', response.data.data);
            $scope.updatefeeArr = response.data.data;

            $scope.getAllFees();
            //  $scope.apply();

        }, function myError(response) {
            console.log('Failed to edit data')
            //$scope.res_data = response.statusText;
        });
    }

    //-----------------Delete Fee-------------
    $scope.spinnerD = [];
    $scope.deleteFee = function (ObjFee) {
        $scope.spinnerD[ObjFee] = true;
        console.log(ObjFee)

        var param = {
            "ID": ObjFee.pwf_id
        };        
        
        var serviceData = serF.serverCall(param, $scope.DeletePWfees);
        serviceData.then(function (response) {

            console.log('Delete PW fees', response.data);

            $scope.allSubjectArray = response.data.data;
            $scope.spinnerD[ObjFee] = false;
            // alert('fees Successfully Deleted')
           
            $scope.getAllFees();
        }, function myError(response) {
            console.log('Failed to Delete data')
            //$scope.res_data = response.statusText;
        });

    }

    // -------------------/Delete Fee---------
}]);