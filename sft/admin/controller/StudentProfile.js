app.controller("StudentProfile-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF) {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));

    }
    var stdId = getParameterByName('stdId');
    $scope.loadingdata = true;
    $scope.getAllStudents = function (srch) {

        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        
        if (srch !== 'undefined' && srch !== '') { param['stdId'] = srch.stdId; }
      

        var serviceData = serF.serverCall(param, $scope.GetAllStudent);

        serviceData.then(function (result) {
            $scope.allStudentArray = result.data.data;
            $scope.stdName = $scope.allStudentArray[0].std_name;
            $scope.stdfName = $scope.allStudentArray[0].std_fName;
            $scope.stdfContact = $scope.allStudentArray[0].std_fContact;
            $scope.stdDob = $scope.allStudentArray[0].std_dob;
            $scope.stdaddress = $scope.allStudentArray[0].std_address;
            $scope.stdadmissionNo = $scope.allStudentArray[0].std_admissionNo;
            $scope.stdgender = $scope.allStudentArray[0].std_gender;
            $scope.stdpicture = $scope.allStudentArray[0].std_picture;
            $scope.stdregNo = $scope.allStudentArray[0].std_regNo;
            $scope.dateadd = $scope.allStudentArray[0].dateCreated;
            $scope.stdgRelation = $scope.allStudentArray[0].std_gRelation;
            $scope.stdfCnic = $scope.allStudentArray[0].std_fCnic;
            $scope.clstitle = $scope.allStudentArray[0].cls_title;
            $scope.sectitle = $scope.allStudentArray[0].sec_title;
            $scope.loadingdata = false;

            

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.getAllStudents(stdId);
}]);