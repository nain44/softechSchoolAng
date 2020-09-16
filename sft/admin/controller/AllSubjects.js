app.controller("AllSubjects-ct", ['$scope', '$state', '$scope', '$window', 'serF', function ($scope, $state, $window, serF) {



    // if ($scope.userId == null || $scope.userId == undefined) {

    //      location.assign("../user")
    // }

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

   ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\


	//---------------get allSubjects-------------
    
    $scope.loadingdata=false;

    $scope.getAllSubjects = function () {

        $scope.loadingdata=true;
        var param ={
            "schId" : $scope.userId,
        }
        var serviceData = serF.serverCall(param, $scope.GetAllSubjects);
        serviceData.then(function (response) {
            
            $scope.loadingdata=false;
            
            $scope.allSubjectsArray = response.data.data;
           
            
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    $scope.getAllSubjects();

    //---------------/get allSubjects-------------
    
    //---------------/get all Suject drp-------------

    $scope.getallsbjdrp = function () {

        $scope.loadingdata = true;

        var param = {
        }
        var serviceData = serF.serverCall(param, $scope.getAllSbjectDrp);

        serviceData.then(function (result) {

            $scope.loadingdata = false;
            $scope.getallsbjtdrp = result.data.data;

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.getallsbjdrp();


    $scope.object1 = {};
    $scope.object2 = {};
    $scope.seletedones = [];
    $scope.seleteditems = [];
    // ----- Check All ---------------

    $scope.checkall1 = function () {

        $scope.seleteditems = [];
        $scope.count = 0;
        angular.forEach($scope.allFeeArray, function (cate1) {

            console.log(cate1, "cate1", $scope.object2.selected1, "obje2")

            $scope.seletedones[cate1.std_id] = $scope.object2.selected1;
            if ($scope.object2.selected1 == false || $scope.object2.selected1 == undefined) {
                $scope.count = 0;
                $scope.seleteditems = [];
            }
            if ($scope.seletedones[cate1.std_id] == true) {
                $scope.count++;
                var qObj = { "stdId": cate1.std_id }
                if (qObj != '')

                    $scope.seleteditems.push(cate1);

            }

        });

    }
    //-------checkbox checked new-----------
    $scope.selectchecked = function () {
        $scope.seleteditems = [];
        $scope.count = 0;
        console.log("selected called", $scope.seletedones)

        angular.forEach($scope.allFeeArray, function (cate1) {

            if ($scope.seletedones[cate1.std_id] == true) {

                $scope.seleteditems.push(cate1);
                $scope.count++;
                //console.log("$singleselected", $scope.seleteditems)
            }
            else {
                $scope.object2.selected1 = false;
            }
        });

    }
    //-------checkbox checked new ended-----------
    //---------------insert  Student-------------

    $scope.addSubjectForm = {};
    $scope.subjct = {};
    $scope.rs = {
        'allTeacherArr': [],
    }
    $scope.spinner = false;
    $scope.getTeacherForDrpFun = function () {
        var param = {
                "schId": $scope.userId,
       
        };

        var serviceData = serF.serverCall(param, $scope.getAllTeacherDrp);
        serviceData.then(function (response) {
            
            angular.forEach(response.data.data, function (v) {
                
                 $scope.rs.allTeacherArr.push(v)
                 console.log($scope.rs.allTeacherArr,'al')
            })
         

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    $scope.getTeacherForDrpFun();
    $scope.addSubject = function (subObj,tech) {
        
        $scope.spinner = true;
        var param = {
           // "code" : subObj.Code,
            "title": subObj.title,
           // "duration" : subObj.Duration,
            "Teacher": tech.stf_id,
            "schId": $scope.userId,
            "marks":subObj.marks
        };        
        
        var serviceData = serF.serverCall(param, $scope.InsertSubject);
        serviceData.then(function (response) {  

        
            $scope.spinner = false;

            $scope.insertSubjectArr = response.data.data;

            $scope.getAllSubjects();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });       
    }
   
    //---------------/insert Student-------------

    //-------------------------clear textboxes-----------
    $scope.subjt = {}; 
    $scope.clear = function () {
        $scope.subjt = {};       
    }

    //------------------ Edit Class-------------

    $scope.subjte={}
    $scope.editModal = function (subEdit) {
       
        $scope.rs.stf_id = subEdit.stf_id;
        
    }

    $scope.editSubject = function (edtObj,rs) {
        
        $scope.spinner = true;

        var param = {

            "Title": edtObj.sub_title,
            "marks": edtObj.sub_marks,           
            "Teacher": rs.stf_id,            
            "ID": edtObj.sub_id
        };        
        
        var serviceData = serF.serverCall(param, $scope.UpdateSubject);
        serviceData.then(function (response) {

            $scope.spinner = false;
           $scope.updateSubjectArr = response.data.data;
           
           $scope.getAllSubjects();
            //  $scope.apply();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    //-----------------Delete Subject-------------
    $scope.spinnerD = [];
    $scope.deleteSubject = function (subj) {
        $scope.spinnerD[subj] = true;
        console.log(subj)

        var param = {
                    
            "ID": subj
        };        
        
        var serviceData = serF.serverCall(param, $scope.DeleteSubject);
        serviceData.then(function (response) {

            console.log('DeleteSubject', response.data);

            $scope.allSubjectArray = response.data.data;
            $scope.spinnerD[subj] = false;
            // alert('Subject Successfully Deleted')
           
            $scope.getAllSubjects();
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }

    // -------------------/Delete Subject---------

}]);