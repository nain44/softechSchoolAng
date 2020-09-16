app.controller("AllClasses-ct", ['$scope', '$http','$state', '$scope', '$window', 'serF', function ($scope,$http, $state, $window, serF) {
	
    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    var Teacher = sessionStorage.getItem('Teacher');
    
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
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

    $scope.loadingdata = false;
    $scope.selectSubjects = function () {
         $scope.getallsbjdrp();
        $('#selectSubjects').modal();
    }
    $scope.selectSections = function () {
           $scope.getAllSectionFunc();
        $('#selectSections').modal()
    }
    $scope.rs = {
        'allTeacherArr': [],
        
    }
    $scope.getTeacherForDrpFun = function () {
        var param = {
            "schId": $scope.userId,

        };

        var serviceData = serF.serverCall(param, $scope.getAllTeacherDrp);
        serviceData.then(function (response) {

            angular.forEach(response.data.data, function (v) {

                $scope.rs.allTeacherArr.push(v)
                console.log($scope.rs.allTeacherArr, 'al')
            })


        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    $scope.getTeacherForDrpFun();
    $scope.getallsbjdrp = function () {
        
        $scope.loadingdata = true;

        var param = {
            'schId':$scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getSubjectsForClass);

        serviceData.then(function (result) {
          
            $scope.loadingdata = false;
            $scope.dataSbj = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    $scope.getAllSectionFunc = function () {

        $scope.loadingdata = true;

        var param = {
            'schId':$scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getAllSections);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.dataSection = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.objectSec = {};
    $scope.object2Sec = {};
    $scope.seletedonesSec = [];
    $scope.seleteditemsSec = [];
    $scope.checkallSec = function () {

        $scope.seleteditemsSec = [];
        angular.forEach($scope.dataSection, function (cate1) {
            
            console.log(cate1, "cate1", $scope.object2Sec.selected1, "obje2")

            $scope.seletedonesSec[cate1.sec_id] = $scope.object2Sec.selected1;
            if ($scope.object2Sec.selected1 == false || $scope.object2Sec.selected1 == undefined) {
                $scope.seleteditemsSec = [];
            }
            if ($scope.seletedonesSec[cate1.sec_id] == true) {
                $scope.seleteditemsSec.push(cate1);

            }

        });

    }
    $scope.selectcheckedSec = function () {

        $scope.seleteditemsSec = [];
        $scope.count = 0;
        console.log("selected called", $scope.seletedonesSec)

        angular.forEach($scope.dataSection, function (cate1) {

            if ($scope.seletedonesSec[cate1.sec_id] == true) {
                $scope.seleteditemsSec.push(cate1);

            }
            else {
                $scope.object2Sec.selected1 = false;
            }
        });

    }
    $scope.object1 = {};
    $scope.object2 = {};
    $scope.seletedones = [];
    $scope.seleteditems = [];
    $scope.checkall1 = function () {

        $scope.seleteditems = [];
        angular.forEach($scope.dataSbj, function (cate1) {

            console.log(cate1, "cate1", $scope.object2.selected1, "obje2")

            $scope.seletedones[cate1.sub_id] = $scope.object2.selected1;
            if ($scope.object2.selected1 == false || $scope.object2.selected1 == undefined) {
                $scope.seleteditems = [];
            }
            if ($scope.seletedones[cate1.sub_id] == true) {
                $scope.seleteditems.push(cate1);

            }

        });

    }
    $scope.selectchecked = function () {
        $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.dataSbj, function (cate1) {

            if ($scope.seletedones[cate1.sub_id] == true) {
                $scope.seleteditems.push(cate1);

            }
            else {
                $scope.object2.selected1 = false;
            }
        });

    }
    $scope.getAllClasses = function () {

        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);
        serviceData.then(function (response) {

            $scope.loadingdata = false;

            $scope.allClassArray = response.data.data;
            console.log('allClass', $scope.allClassArray);

            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
        });

    }
    $scope.getAllClasses();
    $scope.getAllTeacher = function () {

        var param = {
            "schId": $scope.userId
        }
        var serviceData = serF.serverCall(param, $scope.getteacherdrp);

        serviceData.then(function (result) {

            $scope.getAllTeachers = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllTeacher();
    $scope.getAllClass = function () {

        var param = {}
        var serviceData = serF.serverCall(param, $scope.GetAllClassesdrp);

        serviceData.then(function (result) {

            $scope.AllClasses = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }
    $scope.getAllClass();
    $scope.addClassForm = {};
    $scope.clss = {};
    $scope.AddClassLoader = false;
    $scope.addClass = function (clsObj,rs) {
        
        $scope.AddClassLoader = true;
        
        var param = {
            
            "Title" : clsObj.Title,
            "Capacity": clsObj.capacity,
            "Teacher" : rs.stf_id,
            "schId": $scope.userId,
            "subjects": $scope.seleteditems,
            "sections": $scope.seleteditemsSec
        }
        
        var serviceData = serF.serverCall(param, $scope.InsertClass);

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
        console.log(cles)

        var param = {
            "ID": cles,
            'schId':$scope.userId
        };

        var serviceData = serF.serverCall(param, $scope.DeleteClass);
        serviceData.then(function (response) {
            $scope.allTestArray = response.data.data;
            $scope.spinnerD[cles] = false;           
            $scope.getAllClasses();
        }, function myError(response) {
            console.log('Failed to load data')
        });

    }

    $scope.clssE={}
    $scope.editModal = function (clssEdit) {
        
        $scope.clssE.cId = clssEdit.cls_id;

        $scope.clssE.userID = clssEdit.sch_id;
        $scope.clssE.eTitle = clssEdit.cls_title;
        $scope.clssE.eCapicity = clssEdit.cls_capacity;
        $scope.clssE.eTeacher = clssEdit.cls_teacher;
        $scope.rs.stf_id = clssEdit.stf_id;
        $('#editClass').modal({ show: true })
    }
    $scope.EditClassLoader = false;
    $scope.editClass = function (clsObj,rs) {
        console.log("update Class", clsObj)
        $scope.EditClassLoader = true;

        var param = {
            "clsTitle" : clsObj.eTitle,
            "clsCapacity": clsObj.eCapicity,
            "stf_id" : rs.stf_id,
            "schId": $scope.userId,          
            "clsId": clsObj.cId
        };
        
        if($scope.seleteditems.length!=0)
        {
            param["subjects"]=$scope.seleteditems;
        }
        if ($scope.seleteditemsSec.length!=0)
        {
            param[ "sections"]= $scope.seleteditemsSec
        }
        
        var serviceData = serF.serverCall(param, $scope.UpdateClass);
        serviceData.then(function (response) {

            $scope.EditClassLoader = false;
            $scope.updateClassArr = response.data.data;
            $scope.getAllClasses();

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    
}]);

