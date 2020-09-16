app.controller("AllStudent-ct", ['$scope', '$http', '$state', '$scope', '$window', 'serF', function ($scope, $http, $state, $window, serF) {

    $scope.imageData = "";
    if ($scope.userId == 'null' || $scope.userId == 'undefined') {
        location.assign("Login")
    }

    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth() + 1;
    var yyyy = ndate.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;

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
    
    $('#AddDOB').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });
    
    $('#EdDOB').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });
    $('#EWD').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });

    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\

    $scope.sec = {

        'editSection': [],
       
       
    }
    $scope.rslt = {
        'gClasses': [],
       
    }
    $scope.getSections = function (clsId) {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        if (clsId) { param["classId"] = clsId; }

        var serviceData = serF.serverCall(param, $scope.getClassSection);

        serviceData.then(function (result) {
            $scope.dataSection = result.data.data;
            $scope.loadingdata = false;
                 }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getSections();



    $scope.getSectionsEdit = function (clsId) {

        $scope.loadingdata = true;

        var param = {
            'schId': $scope.userId
        }
        if (clsId) { param["classId"] = clsId; }

        var serviceData = serF.serverCall(param, $scope.getClassSection);

        serviceData.then(function (result) {
            $scope.secArray = result.data.data;
            $scope.loadingdata = false;
            $scope.sec.editSection = [];
            angular.forEach(result.data.data, function (v) {
                $scope.sec.editSection.push(v)
            })

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getSectionsEdit();
    //---------------get allStudents----------

    $scope.loadingdata = false;

    $scope.getAllStudents = function (srch) {

        $scope.loadingdata = true;
        var param = {
            "schId": $scope.userId
        }
        if (srch != undefined && srch != "" && srch.class!=undefined) { param["classId"] = srch.class.cls_id; }
        if (srch != undefined && srch != "" ) { param["stdId"] = srch.stdId; }
        if (srch != undefined && srch != "" && srch.section!=undefined) { param["secId"] = srch.section.sec_id; }
        // else{
        // }

        var serviceData = serF.serverCall(param, $scope.GetAllStudent);

        serviceData.then(function (result) {

            $scope.allStudentArray = result.data.data;
            $scope.loadingdata = false;

            setTimeout(function () {
                $('#example').DataTable();
            }, 250);

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.getAllStudents();

    $scope.getProfile = function (pos) {
        
        window.open("/#!/studentProfile?stdId="+pos.std_id);
    }

    $scope.clearData = function () {
        $state.reload();
        $scope.stnd.class = "";
    }

    //---------------/get allStudents-------------

    $scope.getAllClassFunc = function () {

        var param = { 'schId': $scope.userId }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);
        serviceData.then(function (result) {
            $scope.getClasses = result.data.data;
           

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getAllClassFunc();

    $scope.getAllClassEdit = function () {

        var param = { 'schId': $scope.userId }
        var serviceData = serF.serverCall(param, $scope.GetAllClasses);
        serviceData.then(function (result) {
            $scope.classArray = result.data.data;
            angular.forEach(result.data.data, function (v) {

                $scope.rslt.gClasses.push(v)
            })

        }, function myError(response) {
            console.log('Failed to load data')
        });
    }

    $scope.getAllClassEdit();

    //---------------insert  Student-------------

    $scope.addStudentForm = {};
    $scope.stndd = {};
    $scope.AddStudentLoader = false;

    $scope.opts = {
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    };

    $scope.data = {
        valor: "10/09/2013"
    };

    $scope.addStudent = function (clsObj) {
        
        if (clsObj != undefined && clsObj != "" && clsObj.section != undefined && clsObj.section.sec_id != undefined)
        { var secId = clsObj.section.sec_id; } else { var secId = 0; }
         $scope.AddStudentLoader = true;
        
        var param = {
            "AddNo": clsObj.addmissionNo,
            "Name": clsObj.name,
            "FName": clsObj.fName,
            "FContact": clsObj.fContact,
            "FCnic": clsObj.fCnic,           
            "GRelation": clsObj.relGaurdian,
            "DOB": clsObj.DOB,
            "Gender": clsObj.gender,
            "Address": clsObj.address,
            "RegNo": clsObj.regNo,            
            "Fee": clsObj.Fee,
            "AdmissionFee": clsObj.regFee,           
            "clsId": clsObj.classId.cls_id,
            "Siblings": clsObj.Siblings,          
            "schId": $scope.userId,
            "ID": clsObj.userId,
            "studentImage": $scope.imageData,
            'secId': secId,
            'clsTitle': clsObj.classId.cls_title,
            'secTitle': clsObj.section.sec_title

        };
        
        var serviceData = serF.serverCall(param, $scope.RegisterStudent);

        serviceData.then(function (result) {

            $scope.AddStudentLoader = false;
            // console.log('insert Student', result.data);

            $scope.insertStudentArr = result.data.data;
            $scope.getAllStudents();
            $scope.clear();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    //---------------/insert Student-------------
    //-------------------------clear textboxes-----------
    $scope.stnd = {};
    $scope.clear = function () {
        $scope.stnd = {};
    }

    //------------------ Edit Class-------------

    $scope.estnd = {}
    $scope.editModal = function (stndEdit) {
        
        $scope.estnd.stndId = stndEdit.std_id;
        $scope.estnd.EaddmissionNo = stndEdit.std_admissionNo;
        $scope.estnd.Ename = stndEdit.std_name;
        $scope.estnd.EfName = stndEdit.std_fName;
        $scope.estnd.EgName = stndEdit.std_gName;
        $scope.estnd.EfContact = stndEdit.std_fContact;
        $scope.estnd.EgContact = stndEdit.std_gContact;
        $scope.estnd.EfCnic = stndEdit.std_fCnic;
        $scope.estnd.EgCnic = stndEdit.std_gCnic;
        $scope.estnd.ErelGaurdian = stndEdit.std_gRelation;
        $scope.estnd.EDOB = stndEdit.std_dob;
        $scope.estnd.Egender = stndEdit.std_gender;
        $scope.estnd.Eaddress = stndEdit.std_address;
        $scope.estnd.EMobile = stndEdit.std_mobileForSms;
        $scope.estnd.EdiscountFee = stndEdit.std_discountFee;
        $scope.estnd.EFee = stndEdit.std_fee;
        $scope.estnd.EregNo = stndEdit.std_regNo;
        $scope.estnd.EregFee = stndEdit.std_admisionFee;
        $scope.estnd.EdisDescription = stndEdit.std_disabilityDescription;
        $scope.estnd.EConcisionAmount = stndEdit.std_concisionAmount;
        $scope.estnd.EconcisionRemarks = stndEdit.std_concisionRemarks;
        $scope.estnd.ESiblings = stndEdit.std_siblings;
        $scope.estnd.EAdvanceFee = stndEdit.std_AdvanceFee;
        $scope.estnd.Edisability = stndEdit.std_disability;
        $scope.estnd.EFeeMonth = stndEdit.std_monthFee;
        $scope.estnd.EBalance = stndEdit.std_balance;
        $scope.rslt.cls_id = stndEdit.cls_id;
        $scope.sec.sec_id = stndEdit.sec_id;
        $scope.clsTitle = stndEdit.cls_title;
        
    }

    $scope.EditLoader = false;
    $scope.editStudent = function (edtObj,s,c) {
        
        
                
                var secT = $scope.secArray.find(x=>x.sec_id === s).sec_title;
                var clsT = $scope.classArray.find(z=>z.cls_id === c).cls_title;
        
                
               
                $scope.EditLoader = true;
                var param = {
                    "AddNo": edtObj.EaddmissionNo,
                    "Name": edtObj.Ename,
                    "FName": edtObj.EfName,
                    "FContact": edtObj.EfContact,
                    "FCnic": edtObj.EfCnic,          
                    "GContact": edtObj.EgContact,      
                    "GRelation": edtObj.ErelGaurdian,
                    "DOB": edtObj.EDOB,
                    "Gender": edtObj.Egender,
                    "Address": edtObj.Eaddress,
                    "RegNo": edtObj.EregNo,        
                    "AdmissionFee": edtObj.EregFee,         
                    "clsId": c,
                    "studentImage": $scope.imageData,
                    "ID": edtObj.stndId,
                    'secId':s,
                    'secTitle':secT,
                    'clsTitle':clsT
                };
        
        
                var serviceData = serF.serverCall(param, $scope.UpdateStudent);
        
                serviceData.then(function (result) {
                    $scope.EditLoader = false;
                    $scope.updateStudentArr = result.data.data;
                    $scope.getAllStudents();
                }, function myError(response) {
                    console.log('Failed to load data')
                    //$scope.res_data = response.statusText;
                });
            }
   
            $scope.withdrawStudentFunc = function (edtObj,c,w) {
                
                     var clsT = $scope.classArray.find(z=>z.cls_id === c).cls_title;
  
                        $scope.EditLoader = true;
                        var param = {
                           'stdId':edtObj.stndId,
                           'wDate':w.wDate,
                           'wClsId':c,
                           'wRemarks':w.wRemarks,
                            'wClsTitle':clsT,
                            'wSchool':w.wSchool
                        };
                        
                
                        var serviceData = serF.serverCall(param, $scope.withdrawStudent);
                
                        serviceData.then(function (result) {
                            $scope.EditLoader = false;
                            $scope.updateStudentArr = result.data.data;
                            $scope.getAllStudents();
                        }, function myError(response) {
                            console.log('Failed to load data')
                            //$scope.res_data = response.statusText;
                        });
                    }
           
            $scope.getDMC = function (pos) {
        
       var obj =JSON.stringify(pos)
       sessionStorage.setItem("objStd", obj)
        window.open("#!/resultcard");
        

    }

    //-----------------Delete Student-------------
    $scope.spinnerD = [];
    $scope.deleteStudent = function (stnd) {
        $scope.spinnerD[stnd] = true;
        var param = {
            "ID": stnd,
        };

        $scope.res_data = {}

        var serviceData = serF.serverCall(param, $scope.DeleteStudent);
        serviceData.then(function (result) {
            $scope.allStudentArray = result.data.data;
            $scope.spinnerD[stnd] = false;
            // alert('Student Successfully Deleted')
            $scope.getAllStudents();
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    // -------------------/Delete Student---------
    $scope.imgLoader = false;

    $scope.uploadImage = function (img) {
        $scope.imgLoader = true;

        var fd = new FormData();
        fd.append('file', img);
        console.log("file", img);
        var dt = {
            "schId": $scope.userId,
            "dImage": img
        };

        $scope.res_data = {}
        var url_signup = 'http://localhost/services/uploadStudentImage.php';
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

app.controller('mCtr', ['$scope', '$state', 'fileUpload', '$http', function ($scope, $state, fileUpload, $http) {
    
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
            $state.reload();

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


