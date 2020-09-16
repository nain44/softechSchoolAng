app.controller("expencies-ct", ['$scope', '$state','$scope', '$window', 'serF', function ($scope, $state,$window, serF){
	
    var userID = sessionStorage.getItem('userID');
    var expId = sessionStorage.getItem('ID');
    var IName = sessionStorage.getItem('ItemName');
    var Description = sessionStorage.getItem('Description');
    var Quantity = sessionStorage.getItem('Quantity');
    var Price = sessionStorage.getItem('Price');
    var Total = sessionStorage.getItem('Tprice');
    var StDate = sessionStorage.getItem('StDate');

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

    /////////////////////// Date Picker Start \\\\\\\\\\\\\\\\\\\\\\\\

    $('#addexpdate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });

    $('#expencedate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });

    $('#updatedate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        weekStart: 1,
        time: false
    });

    ////////////////////// Date Picker End \\\\\\\\\\\\\\\\\\\\

    $scope.loadingdata=false;

    $scope.GetExpencies = function (item) {

        $scope.loadingdata=true;
        var param ={
            "schId" : userID,
        }

        if (item != undefined && item != "") { param["ExpDate"] = $scope.item.date;}

        var serviceData = serF.serverCall(param, $scope.GetallExpencies);
        serviceData.then(function (response) {
                   
            $scope.loadingdata=false;
            
            $scope.allExpenciesArray = response.data.data;
            console.log('allExpencies', $scope.allExpenciesArray);
            
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }
    
    $scope.GetExpencies();

    $scope.selecteditem = [];
    $scope.itm = {}

    $scope.addToArr=function(obj)
    {
    	$scope.Total == obj.Price*obj.Quantity;

    	$scope.selecteditem.push({ "Name": obj.IName, "Description": obj.Description,
        "Quantity": obj.Quantity, "Price": obj.Price, "Total":obj.Total });
        console.log("Item", $scope.selecteditem)
        $scope.itm = {}
    }

    $scope.removefromArr = function (index)
    {
    	$scope.selecteditem.splice(index, 1);
    }

    $scope.itm = {};
    $scope.spinner = false;
    
    $scope.InsertExpenses = function (expObj) {
        console.log("Expenses Data",expObj)
        $scope.spinner = true;

        var param = {
            "ItemName" : expObj.IName,
            "Description": expObj.Description,
            "Quantity" : expObj.Quantity,
            "Price": expObj.Price,
            "Tprice" : expObj.Total,
            "schId" : userID,
            "StDate" : expObj.StDate,
            "ID" : expObj.expId
        };        
        
        var serviceData = serF.serverCall(param, $scope.AddExpenses);
        serviceData.then(function (response) {                   
      
            $scope.spinner = false;
            console.log('AddExpenses', response.data);
            $scope.AddExpensesArr = response.data.data;
            $scope.clear();
            $scope.GetExpencies();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });       
    }

    $scope.itm = {}; 
    $scope.clear = function () {
        $scope.itm = {};       
    }

    // $scope.spinnerD = [];
    $scope.deleteExpenses = function (delexp) {
        // $scope.spinnerD[delexp] = true;
        console.log(delexp)

        var param = {
            "ID": delexp
        };

        var serviceData = serF.serverCall(param, $scope.DeleteExpenses);
        serviceData.then(function (response) {
            $scope.DeleteExpensesArray = response.data.data;
            // $scope.spinnerD[delexp] = false;
            $scope.GetExpencies();
            // alert('Expenses Successfully Deleted')
        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });

    }

    //------------------ Edit Expenses-------------

    $scope.Eitm={}
    $scope.editModal = function (expEdit) {
        $scope.Eitm.expId = expEdit.exp_id;
        $scope.Eitm.EIName = expEdit.exp_itemName;
        $scope.Eitm.EDescription = expEdit.exp_description;
        $scope.Eitm.EQuantity = expEdit.exp_quantity;
        $scope.Eitm.EPrice = expEdit.exp_itemPrice;
        $scope.Eitm.ETotal = expEdit.exp_totalPrice;
        $scope.Eitm.EStDate = expEdit.exp_date;
    }

        $scope.spinner = false;
    $scope.editExpenses = function (edtObj) {
        console.log("dat", edtObj)
        $scope.spinner = true;

        var param = {
            "ItemName" : edtObj.EIName,
            "Description": edtObj.EDescription,
            "Quantity" : edtObj.EQuantity,
            "Price": edtObj.EPrice,
            "Tprice" : edtObj.ETotal,
            "StDate" : edtObj.EStDate,
            "ID" : edtObj.expId
        };
        
        var serviceData = serF.serverCall(param, $scope.UpdateExpenses);
        serviceData.then(function (response) {
          
            $scope.spinner = false
            console.log('edit Expenses', response.data.data);
            $scope.updateExpensesArr = response.data.data;
            $scope.GetExpencies();

        }, function myError(response) {
            console.log('Failed to load data')
            //$scope.res_data = response.statusText;
        });
    }

    $scope.exportData = function () {
        console.log("expot");
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Expenses_Report.xls");
    }

}]);