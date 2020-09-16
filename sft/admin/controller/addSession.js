app.controller("addSession-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {
	
    /////////////////////// Date Picker Start \\\\\\\\\\\\\\\\\\\\\\\\
   

    $("#datepickerY").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
    });


    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\


    $scope.getAllTermsFunc = function () {
        
        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getAllTerms);
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
    $scope.getAllTermsFunc();
    $scope.clss = {};
    $scope.AddClassLoader = false;
    $scope.addClass = function (clsObj) {
        
        $scope.AddClassLoader = true;
        
        var param = {
            
            "Title" : clsObj.Title,
            "description": clsObj.description,            
            "schId": $scope.userId,
            "heldDate": clsObj.heldDate,

        }
        
        var serviceData = serF.serverCall(param, $scope.insertTerm);

        serviceData.then(function (result) {

            $scope.AddClassLoader = false;
            // console.log('insert Class', result.data);

            $scope.insertClassArr = result.data.data;
            $scope.getAllTermsFunc();

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

        var serviceData = serF.serverCall(param, $scope.deleteTerm);
        serviceData.then(function (response) {
            $scope.allTestArray = response.data.data;
            $scope.spinnerD[cles] = false;           
            $scope.getAllTermsFunc();
        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
    $scope.clssE = {}
    $scope.editModal = function (clssEdit) {
        debugger
        $scope.clssE.trmId = clssEdit.trm_id;
        $('#editClass').modal({ show: true })
    }
    $scope.EditClassLoader = false;
    $scope.editClass = function (clsObj, rs) {
        $scope.EditClassLoader = true;
        debugger
        var param = {
            "title": clsObj.trm_title,
            "heldDate": clsObj.trm_heldDate,
            "description": clsObj.trm_description,
            "schId": $scope.userId,
            "trmId": clsObj.trm_id,

        };
       

        var serviceData = serF.serverCall(param, $scope.updateTerm);
        serviceData.then(function (response) {
            $scope.EditClassLoader = false;
            $scope.updateClassArr = response.data.data;
            $scope.getAllTermsFunc();

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
}]);

