app.controller("AttendanceReport-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF) {
    
    
    if ($scope.userId === null || $scope.userId === undefined) { location.assign("Login") }
	var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth()+1; 
    var yyyy = ndate.getFullYear();
    var today  = yyyy+'-'+mm+'-'+dd;
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
    
    $('#atnddate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });

    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\
    
    // --------------- Get All Classes Drp -------------

    $scope.getAllClass = function () {

        var param = {}
        var serviceData = serF.serverCall(param, $scope.GetAllClassesdrp);

        serviceData.then(function (result) {

            $scope.getAllClasses = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getAllClass();
    
    // --------------- Get All Classes Drp -------------

    $scope.loadingdata=false;

    $scope.GetAllAttendance = function () {

        $scope.loadingdata=true;
        var param ={
            "schId": $scope.userId,
        }
        var serviceData = serF.serverCall(param, $scope.GetAllattendance);
        serviceData.then(function (response) {            
            $scope.loadingdata=false;
            
            $scope.AllAttendanceArray = response.data.data;
            console.log('All Attendance', $scope.AllAttendanceArray);
            
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    $scope.GetAllAttendance();
}]);