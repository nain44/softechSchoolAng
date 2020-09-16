app.controller("awardlist-ct", ['$scope','$timeout', '$state', '$scope', '$window', 'serF', function ($scope,$timeout, $state, $window, serF) {

    $scope.printFunction = function (printTable) {
        var printContents = document.getElementById(printTable).innerHTML;
        var originalContents = document.body.innerHTML;
        window.print();
    }

    $scope.printD=function()
    {
        window.print();
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    $scope.schoolname = getParameterByName('sclname');
    

    $scope.loadingBtn = false;
    $scope.studentList = [];

    $scope.printD=function()
    {
        window.print();
    }

    $scope.awardlist = function (srch) {

        $scope.loadingdata = true;
        
        $scope.subName= srch.subject.sub_title

        var param = {
            'schId': $scope.userId,
            'clsId': srch.class.cls_id,
            'term': srch.term.trm_id,
            'subId': srch.subject.sub_id
        }

        var serviceData = serF.serverCall(param, $scope.getSingleSubjectResult);
        serviceData.then(function (result) {
            $scope.getData = result.data.data;
            angular.forEach($scope.getData,function (v){
                console.log(v)

            })
            $scope.loadingdata = false;
        },

        function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getallsbjdrp = function (clsId) {
        debugger

        var param = {
            'schId':$scope.userId,
            'clsId':clsId
        }

        var serviceData = serF.serverCall(param, $scope.getSubjectsForClass);
        

        serviceData.then(function (result) {          
            $scope.dataSbj = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    

	$scope.getAllClassFunc = function () {

	    var param = {
	        'schId': $scope.userId
	    }

	    var serviceData = serF.serverCall(param, $scope.GetAllClasses);
	    serviceData.then(function (result) {
	        $scope.getClasses = result.data.data
	       

	    },
        function myError(response) {
            console.log('Failed to load data')
        });
	}

	$scope.getAllClassFunc();

	$scope.getSections = function (obj) {

	    var param = {
	        'schId': $scope.userId,

	    }

	    if (obj) { param["classId"] = obj.classId.cls_id; }

	    var serviceData = serF.serverCall(param, $scope.getClassSection);

	    serviceData.then(function (result) {
	        $scope.dataSection = result.data.data;

	    }, function myError(response) {
	        console.log('Failed to load data')
	        //$scope.res_data = response.statusText;
	    });
	}

	
$scope.getAllTermsFunc = function () 
{

	    $scope.loadingdata = true;
	    var param = {
	        "schId": $scope.userId
	    }

	
    var serviceData = serF.serverCall(param, $scope.getAllTerms);
	 
   serviceData.then(function (response) 
{

	        $scope.loadingdata = false;

	
        $scope.allTermArr = response.data.data;

	    }, 
function myError(response) 
{
	        console.log('Failed to load data')
	    });

	}

 
   
$scope.getAllTermsFunc();

    $scope.clearData = function () {
        $scope.srch.class = "";
        $scope.srch.subject = "";
        $scope.srch.term = "";
        $state.reload();
    }

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable1').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Award_List.xls");
    }

}]);



