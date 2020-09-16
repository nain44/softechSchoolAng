app.controller("login-ct", ['$scope', '$http', function($scope, $http) {

    ////////////////////// Date Picker Monthly and Yearly \\\\\\\\\\\\\\\\\\\\

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

    ////////////////////// Date Picker End Monthly and Yearly \\\\\\\\\\\\\\\\\\\

    $scope.log = {};
    $scope.loading = false;
    $scope.Showmsg = false;
    $scope.Authmsg = false;
    $scope.loginArr = {};

    $scope.login = function(lgob) {
        localStorage.setItem('schoolSession', lgob.sessionY);

        $scope.loading = true;
        var dt = {
            "UserName": lgob.name,
            "Password": lgob.Pass
        };
        $scope.res_data = {}
        var url_signup = 'http://localhost/softechschool/admin/services/User_login.php';
        $http({
            method: "POST",
            url: url_signup,
            data: dt,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }

        }).then(function mySuccess(response) {

            $scope.loginArr = response.data;
            $scope.loading = false;
            $scope.Showmsg = false;
            $scope.Authmsg = false;

            if ($scope.loginArr) {
                if ($scope.loginArr.status == -1) {
                    $scope.Showmsg = true;
                } else {
                    $scope.Showmsg = false;

                    var username = $scope.loginArr.data[0].usr_uName;
                    var userId = $scope.loginArr.data[0].usr_id;
                    var SchoolName = $scope.loginArr.data[0].sch_title;
                    var Schoolpic = $scope.loginArr.data[0].schoolLogo;

                    sessionStorage.setItem('userID', userId);
                    localStorage.setItem('userId', userId);
                    sessionStorage.setItem('UserName', username);
                    sessionStorage.setItem('SchoolName', SchoolName);

                    if ($scope.loginArr.data) {
                        location.assign("../#!/dashboard")
                    } else {
                        $scope.Authmsg = true;
                    }
                }
            }
        }, function myError(response) {
            console.log('Failed to load data')
                //$scope.res_data = response.statusText;
        });
    }

    //---------------insert  School-------------

    $scope.addSubjectForm = {};
    $scope.subjct = {};
    $scope.spinner = false;

    $scope.addSchool = function(schObj) {
        $scope.spinner = true;

        var dt = {
            "RegNo": schObj.RegNo,
            "Code": schObj.Code,
            "Name": schObj.Name,
            "Owner": schObj.Owner,
            "Cperson": schObj.Cperson,
            "Contact": schObj.Contact,
            "Email": schObj.Email,
            "District": schObj.District,
            "Tehsil": schObj.Tehsil,
            "Address": schObj.Address,
            "Level": schObj.Level,
            "schoolLogo": $scope.imageData
        };

        var url_signup = 'http://localhost/softechschool/admin/services/RegisterSchool.php';
        $http({
            method: "POST",
            url: url_signup,
            data: dt,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function mySuccess(response) {
            $scope.spinner = false;
            // console.log('Add School', response.data);
            $scope.insertSchoolArr = response.data.data;
            $scope.clear();

        }, function myError(response) {
            console.log('Failed to load data')
                //$scope.res_data = response.statusText;
        });
    }


    //---------------/insert School-------------

    //-------------------------clear textboxes-----------
    $scope.sch = {};
    $scope.clear = function() {
        $scope.sch = {};
    }

    $scope.uploadImage = function(img) {

        var fd = new FormData();
        fd.append('file', img);
        console.log("file", img);
        var dt = {
            "schId": $scope.userId,
            "dImage": img
        };
        debugger;

        $scope.res_data = {}
        var url_signup = 'http://localhost/softechschool/admin/services/uploadStudentImage.php';
        $http({
            method: "POST",
            url: url_signup,
            data: dt,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function mySuccess(response) {

            $scope.imageData = response.data.data;
            console.log($scope.imageData)

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

}]);

app.controller('myCtrl', ['$scope', '$state', 'fileUpload', '$http', function($scope, $state, fileUpload, $http) {

    $scope.pbl = {};
    $scope.sizeLimit = 10585760; // 10MB in Bytes
    $scope.uploadProgress = 0;
    $scope.creds = {};
    $scope.spinnerUp = false;
    $scope.uploadFile = function(file) {

        var fd = new FormData();
        fd.append('file', file);
        var dt = {
            "schId": $scope.userId,
            "dfile": file
        };

        $scope.res_data = {}
        var url_signup = 'http://localhost/softechschool/admin/services/RegStFF.php';
        $http({
            method: "POST",
            url: url_signup,
            data: dt,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function mySuccess(response) {
            $scope.getAllStudents();

        }, function myError(response) {
            console.log('Failed to load data')
        });
    };
    $scope.usl = function() {
        $scope.vs.vrd = true;
    }

    $scope.fileSizeLabel = function() {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.uniqueString = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }





}]);