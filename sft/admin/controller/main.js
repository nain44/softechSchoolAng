app.controller("main-ct", ['$scope', '$http', function ($scope, $http) {

    $scope.log = {};

    var userID = sessionStorage.getItem("userid");
    var token = sessionStorage.getItem("token");
    var roleID = sessionStorage.getItem("roleId");
    $scope.schoolName = sessionStorage.getItem("SchoolName");
    $scope.username = sessionStorage.getItem("UserName");
    $scope.session = localStorage.getItem('schoolSession')

    $scope.logout=function()

    {
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("userName");

        location.assign("http://localhost/softechschool/admin/Login/#!/login")
    }

    $scope.awarddata=function()
    {
        window.open("dmc/#!/awardlist?sclname="+$scope.schoolName)
    }
    
}]);