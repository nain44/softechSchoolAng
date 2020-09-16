app.controller("AllSchools-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF){
    
    var userID = sessionStorage.getItem('userID');
    var schId = sessionStorage.getItem('ID');
    var Code = sessionStorage.getItem('Code');
    var RegNo = sessionStorage.getItem('RegNo');
    var Name = sessionStorage.getItem('Name');
    var Level = sessionStorage.getItem('Level');
    var Owner = sessionStorage.getItem('Owner');
    var Cperson = sessionStorage.getItem('Cperson');
    var Contact = sessionStorage.getItem('Contact');
    var Email = sessionStorage.getItem('Email');
    var Address = sessionStorage.getItem('Address');
    var District = sessionStorage.getItem('District');
    var Tehsil = sessionStorage.getItem('Tehsil');
    // var logo = sessionStorage.getItem('Logo');

    // if (userId == null || userId == undefined) {
    //     location.assign("../user")
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


    //---------------get all Schools-------------

    $scope.loadingdata=false;

    $scope.getAllSchools = function () {

        $scope.loadingdata=true;
        var param ={}
        var serviceData = serF.serverCall(param, $scope.GetAllSchools);
        serviceData.then(function (response) {
                   
            $scope.loadingdata=false;
            
            $scope.AllSchoolsArray = response.data.data;
            console.log('all Schools', $scope.AllSchoolsArray);

            setTimeout(function(){
               $('#example').DataTable();
             }, 250);
            
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    $scope.getAllSchools();

    //---------------/get all Schools-------------

    //---------------insert  School-------------

    $scope.addSubjectForm = {};
    $scope.subjct = {};
    $scope.spinner = false;
    
    $scope.addSchool = function (schObj) {
        console.log("Subjects",schObj)
        $scope.spinner = true;
        var param = {
            "RegNo" : schObj.RegNo,
            "Code": schObj.Code,
            "Name" : schObj.Name,
            "Owner" : schObj.Owner,
            "Cperson" : schObj.Cperson,
            "Contact": schObj.Contact,
            "Email" : schObj.Email,
            "District" : schObj.District,
            "Tehsil" : schObj.Tehsil,
            "Address" : schObj.Address,
            "Level": schObj.Level
            // "Logo": schObj.logo
        };
        
        var serviceData = serF.serverCall(param, $scope.RegisterSchool);
        serviceData.then(function (response) {  

        
            $scope.spinner = false;
            console.log('insert School',response.data);

            $scope.insertSchoolArr = response.data.data;

            $scope.getAllSchools();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });       
    }
   
    //---------------/insert School-------------

    //------------------ Edit School-------------

    $scope.esch={}
    $scope.editModal = function (schlEdit) {
        $scope.esch.schId = schlEdit.sch_id;
        $scope.esch.eRegNo = schlEdit.sch_regId;
        $scope.esch.eCode = schlEdit.sch_code;
        $scope.esch.eName = schlEdit.sch_title;
        $scope.esch.eOwner = schlEdit.sch_owner;
        $scope.esch.eCperson = schlEdit.sch_contactPerson;
        $scope.esch.eContact = schlEdit.sch_contactNo;
        $scope.esch.eEmail = schlEdit.sch_email;
        $scope.esch.eDistrict = schlEdit.sch_district;
        $scope.esch.eTehsil = schlEdit.sch_tehsil;
        $scope.esch.eAddress = schlEdit.sch_address;
        $scope.esch.eLevel = schlEdit.sch_level;
    }

    $scope.spinner = false;

    $scope.editSchool = function (schObj) {

        $scope.spinner = true;

        var param = {
            
            "RegNo" : schObj.eRegNo,
            "Code": schObj.eCode,
            "Name" : schObj.eName,
            "Owner" : schObj.eOwner,
            "Cperson" : schObj.eCperson,
            "Contact": schObj.eContact,
            "Email" : schObj.eEmail,
            "District" : schObj.eDistrict,
            "Tehsil" : schObj.eTehsil,
            "Address" : schObj.eAddress,
            "Level": schObj.eLevel,
            "ID": schObj.schId
        };
        
        var serviceData = serF.serverCall(param, $scope.UpdateSchool);
        serviceData.then(function (response) {

            $scope.spinner = false;

            $scope.UpdateSchoolArr = response.data.data;

            console.log('edit School',response.data.data);

            // $state.reload();
            $scope.getAllSchools();

            //  $scope.apply();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    //--------------- Delete School-------------
    $scope.deleteSchool = function (schl) {

        var param = {

            "ID": schl
        };

        $scope.res_data = {}

        var serviceData = serF.serverCall(param, $scope.DeleteSchool);
        serviceData.then(function (response) {
            $scope.DeleteSchoolsArr = response.data.data;
            // $scope.spinnerD[delexp] = false;
            $scope.getAllSchools();
            // alert('Expenses Successfully Deleted')
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    // -------------------/Delete School---------

}]);