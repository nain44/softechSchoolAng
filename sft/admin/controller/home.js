app.controller("home-ct", ['$scope','$http', '$state','$scope', '$window', 'serF', function ($scope,$http, $state,$window, serF) {

    var userID = sessionStorage.getItem('userID');
    
	// if (userID == null || userID == undefined) {
 //        location.assign("Login")
 //    }
    $scope.schoolName = sessionStorage.getItem("SchoolName");

    $scope.awarddata=function()
    {
        location.assign("dmc/#!/awardlist?sclname="+$scope.schoolName)
    }
$scope.getBackup=function(){
    var dt = {
        //"schId": $scope.userId,
    };

    $scope.res_data = {}
    var url_signup = 'http://localhost/softechschool/admin/services/dbBackUp.php';
    $http({
        method: "POST",
        url: url_signup,
        data: dt,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function mySuccess(response) {
        
        $scope.imageData = response.data.data;
        img = '';
        $scope.imgLoader = false;

    }, function myError(response) {
        console.log('Failed to load data')
    });
}
}]);