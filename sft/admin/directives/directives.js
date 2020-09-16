app.directive('numbersOnly', function () {

    return {

        require: 'ngModel',

        link: function (scope, element, attr, ngModelCtrl) {

            function fromUser(text) {

                if (text) {

                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {

                        ngModelCtrl.$setViewValue(transformedInput);

                        ngModelCtrl.$render();

                    }

                    return transformedInput;

                }

                return undefined;

            }

            ngModelCtrl.$parsers.push(fromUser);

        }

    };

});
app.directive('dateedit', function () {


    app.filter('etim22', function () {

        return function (input, stt) {


            input = input.toString();

            var dateTime1 = new Date("2016-10-20 " + input);
            var dateTime = new Date(dateTime1.getTime() - dateTime1.getTimezoneOffset() * 60000);
            var temp = dateTime.toString().split(' ');

            input = temp[4];
            var minute = temp[4].split(":");

            console.log(input);
            if (input == "00:00:00") {

                // debugger;
                stt = "12:00 AM";


            } else {


                var temp3 = parseInt(input);

                console.log(temp3);
                if (temp3 > 12) {


                    var stt = temp3 - 12;



                    stt = stt + ":" + minute[1] + " PM"




                }

                else {

                    if (temp3 == 12) {



                        stt = "12:00 PM"

                    }
                    else {


                        stt = temp3 + ":" + minute[1] + " AM";


                    }


                }


            }
            return stt;



        }

    });


});
app.directive('validPasswordC', function () {

    return {

        require: 'ngModel',

        link: function (scope, elm, attrs, ctrl) {

            ctrl.$parsers.unshift(function (viewValue, $scope) {

                var noMatch = viewValue != scope.myForm.newpass.$viewValue

                ctrl.$setValidity('noMatch', !noMatch);



            })

        }

    }

})
app.directive('mydatepicker', function () {

    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {


            element.datepicker({

                dateFormat: 'yy-mm-dd',
                yearRange: '1930:+nn',
                maxDate: '0',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {

                    scope.date = date;
                    scope.$watch('date', function (value) {


                        if (ngModelCtrl.$viewValue != value) {

                            ngModelCtrl.$setViewValue(value);

                        }

                    });
                    scope.$apply();

                }

            });

        }

    };


});
app.directive('mydatepicker2nd', function () {

    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {


            element.datepicker({

                dateFormat: 'yy-mm-dd',
                minDate: '0',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {

                    scope.date = date;
                    scope.$watch('date', function (value) {


                        if (ngModelCtrl.$viewValue != value) {

                            ngModelCtrl.$setViewValue(value);

                        }

                    });
                    scope.$apply();

                }

            });

        }

    };


});
app.directive('mydatepickerProfile', function () {

    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {


            element.datepicker({

                dateFormat: 'yy-mm-dd',
                yearRange: '1930:+nn',
                maxDate: '0',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {

                    scope.date = date;
                    scope.$watch('date', function (value) {


                        if (ngModelCtrl.$viewValue != value) {

                            ngModelCtrl.$setViewValue(value);

                        }

                    });
                    scope.$apply();

                }

            });

        }

    };


});
app.directive('alnumOnly', function () {

    return {

        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {

            function fromUser(text) {

                if (text) {

                    var transformedInput = text.replace(/[^a-zA-Z0-9]*$/g, '');

                    if (transformedInput !== text) {

                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();

                    }
                    return transformedInput;

                }
                return undefined;

            }
            ngModelCtrl.$parsers.push(fromUser);

        }

    };

});
app.directive('alpOnly', function () {

    return {

        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {

            function fromUser(text) {

                if (text) {

                    var transformedInput = text.replace(/[^a-zA-Z]*$/g, '');

                    if (transformedInput !== text) {

                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();

                    }
                    return transformedInput;

                }
                return undefined;

            }
            ngModelCtrl.$parsers.push(fromUser);

        }

    };

});
app.directive('restrictInput', [function () {



    return {

        restrict: 'A',

        link: function (scope, element, attrs) {

            var ele = element[0];

            var regex = RegExp(attrs.restrictInput);

            var value = ele.value;



            ele.addEventListener('keyup', function (e) {

                if (regex.test(ele.value)) {

                    value = ele.value;

                } else {

                    ele.value = value;

                }

            });

        }

    };

}]);
app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file) {
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function () {
        })
        .error(function () {
        });
    }
}])
app.directive("progressbar", function () {
    return {
        restrict: "A",
        scope: {
            total: "=",
            current: "="
        },
        link: function (scope, element) {

            scope.$watch("current", function (value) {
                element.css("width", scope.current / scope.total * 100 + "%");
            });
            scope.$watch("total", function (value) {
                element.css("width", scope.current / scope.total * 100 + "%");
            })
        }
    };
});
app.directive('fileUpload', ['$rootScope', function (rootScope) {
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            var canvas = document.createElement("canvas");
            
            scope.extent='xls';
            var extensions = 'jpeg ,jpg, png, gif, bmp ,JPEG, JPG, PNG, GIF, BMP, xlsx,xls';
            elem.on('change', function () {
                reader.readAsDataURL(elem[0].files[0]);
                var filename = elem[0].files[0].name;
                var extensionlist = filename.split('.');
                var extension = extensionlist[extensionlist.length - 1];
                scope.extent=extensionlist[1];
                
                if (extensions.indexOf(extension) == -1) {
                    alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp', xlsx are allowed.");
                }
                else {
                    scope.file = elem[0].files[0];
                    scope.imageName = filename;
                }
            });

            var reader = new FileReader();
            reader.onload = function (e) {
                var bas64 = e.target.result.split(",").pop();
                scope.imagebaseProfile = bas64
                
               if(scope.extent=='xls' || scope.extent=='xlsx'){
                scope.uploadFile(scope.imagebaseProfile);
               }else{
                scope.uploadImage(scope.imagebaseProfile);
               }
                
                scope.$apply();
            }
        },
    }
}]);



