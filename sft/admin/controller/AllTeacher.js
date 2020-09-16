app.controller("AllTeacher-ct", ['$scope', '$http', '$state', '$scope', '$window', 'serF', function ($scope, $http, $state, $window, serF) {
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

   
    $('.AddDOB').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });
    
    $('#tchDOB').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });

   ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\


	//---------------get allTeachers-------------
    $scope.loadingdata=false;
   
    $scope.rslt = {

        'allProffession': [],
       

    };
   
    $scope.getAllTeachers = function () {

        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId,
        }
        var serviceData = serF.serverCall(param, $scope.GetAllTeachers);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.allTeacherArray = result.data.data;

            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(result) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.getAllTeachers();
    $scope.getAllProffessionsFunc = function () {

        $scope.loadingdata = true;

        var param = {
            "schId": $scope.userId,
        }
        var serviceData = serF.serverCall(param, $scope.getProffession);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            angular.forEach(result.data.data, function (v) {
                $scope.rslt.allProffession.push(v)             
                
            })
           

        }, function myError(result) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.getAllProffessionsFunc();
 
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

    //---------------insert  Class-------------

    $scope.addTeacherForm = {};
    $scope.thrr = {};
    $scope.addTeachLoad = false;
    $scope.addTeacher = function (thrObj) {
        
        var sts=0;
        $scope.addTeachLoad = true;
        if (thrObj.isTeacher == true)
        {
            sts = 1;
        } else {
            sts=0
        }
        var param = {
            "Name" : thrObj.tName,
            "Qualification": thrObj.tQualification,
            "Gender" : thrObj.tGender,
            "DOB" : thrObj.DOB,
            "Address": thrObj.tAddress,
            "Contact" : thrObj.tMobile,
            "schId" : $scope.userId,
            "staffLogo": $scope.imageData,
            'doj': thrObj.doj,
            'prfId': thrObj.prff.prf_id,
            'isTeacher':sts
        };
        var serviceData = serF.serverCall(param, $scope.InsertTeacher);

        serviceData.then(function (response) {

            $scope.addTeachLoad = false;
            $scope.insertTeacherArr = response.data.data;
           
            $scope.getAllTeachers();
            $scope.clear();
            //  $scope.apply();
            
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });       
    }
    $scope.ther = {};
    $scope.clear = function () {
        $scope.ther = {};       
    }

    //---------------/ Delete Teacher-------------
    $scope.spinnerD = [];
    $scope.deleteTeacherFunc = function (ther) {
        $scope.spinnerD[ther] = true ;
        var param = {
            "ID": ther,
            'schId':$scope.userId
        };
        
        $scope.res_data = {}
        var serviceData = serF.serverCall(param, $scope.DeleteTeacher);
        serviceData.then(function (result) {

            $scope.spinnerD[ther] = false ;
            $scope.allTeacherArray = result.data.data;
            $scope.getAllTeachers();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.tchr={}
    $scope.editModal = function (therEdit) {        
      
      //  $scope.rslt.prf_title = therEdit.prf_title;
        $scope.rslt.prf_id = therEdit.prf_id;
       
    }

    $scope.EditTeacherLoad = false;    
    $scope.editTeacher = function (thrObj, rs) {
        
       

        $scope.EditTeacherLoad = true;        
        var sts = 0;
        $scope.addTeachLoad = true;
        if (thrObj.isTeacher == true) {
            sts = 1;
        } else {
            sts = 0
        }
        if($scope.imageData)
        {
            var imgD = $scope.imageData
           
        }
        else
        {
            var imgD = thrObj.stf_picture
            //thrObj.stf_picture=''
        }
        
        var param = {
            "Name": thrObj.stf_name,
            "Qualification": thrObj.stf_qualification,
            "Gender": thrObj.stf_gender,
            "DOB": thrObj.stf_dob,
            "Address": thrObj.stf_address,
            "Contact": thrObj.stf_contact,
            "schId": $scope.userId,
            "staffLogo":imgD,
            'doj': thrObj.stf_doj,
            'prfId': rs.prf_id,
            'isTeacher': sts,
            'stfId':thrObj.stf_id

        };      
        
        var serviceData = serF.serverCall(param, $scope.updateTeacher);
        serviceData.then(function (response) {
            $scope.EditTeacherLoad = false;
            $scope.UpTeacher = response.data.data;
            $scope.getAllTeachers();
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.gtv = function (obj)
    {
    }
    $scope.imgLoader = false;
    $scope.uploadImage = function (img) {
        $scope.imgLoader = true;
        var fd = new FormData();
        fd.append('file', img);        
        var dt = {
            "schId": $scope.userId,
            "dImage": img
        };

        $scope.res_data = {}
        var url_signup = 'http://www.softechschool.com/services/uploadStudentImage.php';
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

app.controller('myCtrl', ['$scope', '$state', 'fileUpload', '$http', function ($scope, $state, fileUpload, $http) {
    debugger
    $scope.pbl = {};
    $scope.sizeLimit = 10585760; // 10MB in Bytes
    $scope.uploadProgress = 0;
    $scope.creds = {};
    $scope.spinnerUp = false;
    $scope.uploadFile = function (file) {
        
        var fd = new FormData();
        fd.append('file', file);
        var dt = {
            "schId": $scope.userId,
            "dfile": file
        };

        $scope.res_data = {}
        var url_signup = 'http://www.softechschool.com/services/RegStFF.php';
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
    $scope.usl = function () {
        $scope.vs.vrd = true;
    }

    $scope.fileSizeLabel = function () {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.uniqueString = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}]);