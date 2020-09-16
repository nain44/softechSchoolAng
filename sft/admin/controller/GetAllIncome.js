app.controller("Incomes-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF){
	
    var incmId = sessionStorage.getItem('ID');
    var userID = sessionStorage.getItem('userID');
    var Name = sessionStorage.getItem('Name');
    var Description = sessionStorage.getItem('Description');
    var Amount = sessionStorage.getItem('Amount');
    var Data = sessionStorage.getItem('Data');

    // if (userID == null || userID == undefined) {
    //     location.assign("Login")
    // }

    $scope.printD=function()
    {
        window.print();
    }

    var ndate = new Date();
    var dd = ndate.getDate();
    var mm = ndate.getMonth()+1;    
    var yyyy = ndate.getFullYear();
    var today  = yyyy+'-'+mm+'-'+dd;
    var currentmonth  = yyyy+'-'+mm+'-'+1;

    /////////////////////// Date Picker Start \\\\\\\\\\\\\\\\\\\\\\\\

    $('#enddate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });
    $('#enddateF').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    }).on('change', function (e, date) {
        $('#enddate').bootstrapMaterialDatePicker('setMinDate', date);
    });;
    
    

    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\

    $scope.loadingdata=false;

    $scope.GetIncomes = function (srch) {

        $scope.loadingdata=true;
        var param ={
            "schId" : userID
        }
        if (srch != undefined && srch != "") {
            param["IncomeDateF"] = $scope.srch.fdate;
        }
        //else{
        //    param["IncomeDate"]= today;
        //}
        if (srch != undefined && srch != "") {
            param["IncomeDateT"] = $scope.srch.tdate;
        }
        //else{
        //    param["IncomeDate"]= today;
        //}

        var serviceData = serF.serverCall(param, $scope.GetAllIncome);
        serviceData.then(function (response) {
                   
            $scope.loadingdata=false;
            
            $scope.AllIncomeArray = response.data.data;
            console.log('All Income', $scope.AllIncomeArray);
            $scope.totalSum = 0;
            angular.forEach($scope.AllIncomeArray, function (val) {
                $scope.totalSum += parseInt(val.feeSubmitted);
            })
            
            // setTimeout(function () {               
            //     $('#incmtbl').DataTable({
            //         dom: 'Blfrtip',
            //         buttons: [
            //             'excel', 'pdf', 'print'
            //         ]
            //     });
            // }, 500);
            
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    
    $scope.GetIncomes();

    // $scope.selecteditem = [];
    // $scope.itm = {}

    // $scope.addToArr=function(obj)
    // {
    // 	$scope.Total == obj.Price*obj.Quantity;

    // 	$scope.selecteditem.push({ "Name": obj.IName, "Description": obj.Description,
    //     "Quantity": obj.Quantity, "Price": obj.Price, "Total":obj.Total });
    //     console.log("Item", $scope.selecteditem)
    //     $scope.itm = {}
    // }

    // $scope.removefromArr = function (index)
    // {
    // 	$scope.selecteditem.splice(index, 1);
    // }

    $scope.itm = {};
    $scope.spinner = false;
    
    $scope.AddIncome = function (incmObj) {
        console.log("Income Data", incmObj)
        $scope.spinner = true;

        var param = {
            "Name": incmObj.Name,
            "Description": incmObj.Description,
            "Amount": incmObj.Amount,
            "schId" : userID,
            "Date": incmObj.Date
        };        
        
        var serviceData = serF.serverCall(param, $scope.InsertIncome);
        serviceData.then(function (response) {                   
      
            $scope.spinner = false;
            console.log('Add Income', response.data);
            $scope.AddIncomeArr = response.data.data;
            $scope.clear();
            $scope.GetIncomes();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });       
    }

    $scope.inm = {}; 
    $scope.clear = function () {
        $scope.inm = {};       
    }

    $scope.spinnerD = [];
    $scope.deleteIncom = function (incom) {
        $scope.spinnerD[incom] = true;
        console.log("Deleted",incom)

        var param = {

            "ID": incom
        };

        var serviceData = serF.serverCall(param, $scope.DeleteIncome);
        serviceData.then(function (response) {
            $scope.DeleteIncomeArray = response.data.data;
            $scope.spinnerD[incom] = false;
            $scope.GetIncomes();
            // alert('Income Successfully Deleted')
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }

    //------------------ Edit Income-------------

    $scope.Einm={}
    $scope.editModal = function (incmEdit) {
        $scope.Einm.incmId = incmEdit.incm_Id;
        $scope.Einm.EName = incmEdit.incm_Name;
        $scope.Einm.EDescription = incmEdit.incm_Description;
        $scope.Einm.EAmount = incmEdit.incm_Amount;
        $scope.Einm.EDate = incmEdit.incm_Date;
    }

    $scope.spinner = false;
    $scope.editIncome = function (edtObj) {
        console.log("dat", edtObj)
        $scope.spinner = true;

        var param = {
            "Name" : edtObj.EName,
            "Description": edtObj.EDescription,
            "Amount" : edtObj.EAmount,
            "Date": edtObj.EDate,
            "ID" : edtObj.incmId
        };
        
        var serviceData = serF.serverCall(param, $scope.UpdateIncome);
        serviceData.then(function (response) {
          
            $scope.spinner = false
            console.log('edit Income', response.data.data);
            $scope.updateIncomeArr = response.data.data;
            $scope.GetIncomes();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }
    
    $scope.clearData=function(){
        $state.reload();
        $scope.srch.fdate="";
        $scope.srch.tdate="";
    }

    $scope.exportData = function () {
        console.log("expot");
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Income_Report.xls");
    }

}]);