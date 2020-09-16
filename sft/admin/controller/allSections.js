app.controller("allSections-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {
	
 
    $scope.getAllClasses = function () {
        
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getAllSections);
        serviceData.then(function (response) {

            $scope.loadingdata = false;

            $scope.allClassArray = response.data.data;

            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
    $scope.getAllClasses();
    $scope.clss = {};
    $scope.AddClassLoader = false;
    $scope.addClass = function (clsObj) {
        
        $scope.AddClassLoader = true;
        
        var param = {
            
            "Title" : clsObj.Title,
            "description": clsObj.description,            
            "schId": $scope.userId,
           
        }
        
        var serviceData = serF.serverCall(param, $scope.insertSection);

        serviceData.then(function (result) {

            $scope.AddClassLoader = false;
            // console.log('insert Class', result.data);

            $scope.insertClassArr = result.data.data;
            $scope.getAllClasses();
           
        }, function myError(response) {
            console.log('Failed to load data')
        });       
    }
    $scope.clss = {}; 
    $scope.clear = function () {
        $scope.clss = {};       
    }
     $scope.spinnerD = [];
    $scope.deleteClass = function (cles) {
        $scope.spinnerD[cles] = true;

        var param = {
            "secId": cles,
            'schId':$scope.userId
        };

        var serviceData = serF.serverCall(param, $scope.deleteSection);
        serviceData.then(function (response) {
            $scope.allTestArray = response.data.data;
            $scope.spinnerD[cles] = false;           
            $scope.getAllClasses();
        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
  
}]);

