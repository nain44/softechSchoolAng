app.controller("staffProffession-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF){
    
    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    // console.log("date", today)

    ////////////////////// Date Picker \\\\\\\\\\\\\\\\\\\\

    $("#datepickerM").datepicker({
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


    // --------------- Get All Classes Drp -------------

    $scope.getProffessionFunc = function () {
        
        var param = {'schId':$scope.userId}
        var serviceData = serF.serverCall(param, $scope.getProffession);

        serviceData.then(function (result) {

            $scope.allFeeArray = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getProffessionFunc();
    $scope.loadingdata = false;
    $scope.insertProffessionFunc = function (srch) {

        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId,
            "title": srch.title,
            'description': srch.description,
            'scale': srch.scale,

        }

        var serviceData = serF.serverCall(param, $scope.insertProffession);
        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.getProffessionFunc();
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }


    $scope.deleteProffessionFunc = function (prfId) {
        
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId,
            "prfId": prfId,
         

        }

        var serviceData = serF.serverCall(param, $scope.deleteProffession);
        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.getProffessionFunc();
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.editProffessionfunc = function (obj) {
        
        $scope.spinnerAllFees = true;
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId,
            "prfId": obj.prf_id,
            'prfTitle': obj.prf_title,
            'prfDescription': obj.prf_description,
            'prfScale':obj.prf_scale

        }

        var serviceData = serF.serverCall(param, $scope.updateProffession);
        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.getProffessionFunc();
        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    
}]);