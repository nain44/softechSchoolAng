var app = angular.module("school", ["ui.router", "xeditable"])

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state("awardlist", {
            url: "/awardlist",
            templateUrl: "template/awrdlist.html",
            controller: "awardlist-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Award List";
                }],
            }
        })
        .state("resultcard", {
            url: "/resultcard",
            templateUrl: "template/resultcard.html",
            controller: "resultcard",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Result Card";
                }],
            }
        })
        .state("stdWidrawl", {
            url: "/stdWidrawl",
            templateUrl: "template/stdWidrawl.html",
            controller: "stdWidrawl-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Student Widrawl";
                }],
            }
        }).state("addSession", {
            url: "/addSession",
            templateUrl: "template/addSession.html",
            controller: "addSession-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Student Widrawl";
                }],
            }
        })

    .state("printResult", {
        url: "/printResult",
        templateUrl: "template/printResult.html",
        controller: "printResult",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Print Result Card";
            }],
        }
    })

    .state("Result", {
        url: "/dmc",
        templateUrl: "template/result.html",
        controller: "result",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Print Result Card";
            }],
        }
    })

    .state("Incomes", {
        url: "/Incomes",
        templateUrl: "template/GetAllIncome.html",
        controller: "Incomes-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Incomes";
            }],
        }
    })

    .state("expencies", {
        url: "/expencies",
        templateUrl: "template/expencies.html",
        controller: "expencies-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Expenses";
            }],
        }
    })

    .state("resultCardBulkPrint", {
        url: "/resultCardBulkPrint",
        templateUrl: "template/resultCardBulkPrint.html",
        controller: "resultCardBulkPrint-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Result Card";
            }],
        }
    })

    .state("ResultAnnualBase", {
        url: "/resultAnnualBase",
        templateUrl: "template/ResultAnnualBase.html",
        controller: "ResultAnnualBase-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Annual Rresult";
            }],
        }
    })

    .state("ResultTermBase", {
        url: "/resulttermbase",
        templateUrl: "template/ResultTermBase.html",
        controller: "ResultTermBase-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Term Result";
            }],
        }
    })

    .state("sendSms", {
        url: "/sendSms",
        templateUrl: "template/sendSms.html",
        controller: "sendSms-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Send Sms";
            }],
        }
    })
    .state("AllFee", {
            url: "/viewFee",
            templateUrl: "template/AllFees.html",
            controller: "AllFee-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "View Fee";
                }],
            }
        })
        .state("staffProffession", {
            url: "/staffProffession",
            templateUrl: "template/staffProffession.html",
            controller: "staffProffession-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Proffessions";
                }],
            }
        })

    .state("AddstdFee", {
            url: "/addstdFee",
            templateUrl: "template/AddstdFee.html",
            controller: "AddstdFee-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Add Student Fee";
                }],
            }
        })
        .state("addSingleStdFee", {
            url: "/addSingleStdFee",
            templateUrl: "template/addSingleStdFee.html",
            controller: "addSingleStdFee-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Add Student Fee";
                }],
            }
        })

    .state("AddFee", {
        url: "/Fee",
        templateUrl: "template/AddFee.html",
        controller: "AddFee-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Add Fee";
            }],
        }
    })

    .state("TeacherSchedule", {
        url: "/teacherSchedule",
        templateUrl: "template/TeacherSchedule.html",
        controller: "TeacherSchedule-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Teacher Schedule";
            }],
        }
    })

    .state("ClassShcedule", {
        url: "/classShcedule",
        templateUrl: "template/ClassShcedule.html",
        controller: "ClassShcedule-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Class Shcedule";
            }],
        }
    })


    .state("AttendanceReport", {
        url: "/attendancereport",
        templateUrl: "template/AttendanceReport.html",
        controller: "AttendanceReport-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Attendance Report";
            }],
        }
    }).state("staffAttendance", {
        url: "/staffAttendance",
        templateUrl: "template/staffAttendance.html",
        controller: "staffAttendance-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Staff Attendance";
            }],
        }
    })

    .state("ClassAttendance", {
        url: "/classAttendance",
        templateUrl: "template/ClassAttendance.html",
        controller: "ClassAttendance-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Class Attendance";
            }],
        }
    })

    .state("AllClasses", {
            url: "/classes",
            templateUrl: "template/AllClasses.html",
            controller: "AllClasses-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Classes";
                }],
            }
        })
        .state("allSections", {
            url: "/allSections",
            templateUrl: "template/allSections.html",
            controller: "allSections-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Sections";
                }],
            }
        })
        .state("allTerms", {
            url: "/allTerms",
            templateUrl: "template/allTerms.html",
            controller: "allTerms-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Terms";
                }],
            }
        })

    .state("SubjectInfo", {
        url: "/subjectInfo",
        templateUrl: "template/SubjectInfo.html",
        controller: "SubjectInfo-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Subject Info";
            }],
        }
    })

    .state("AllSubjects", {
        url: "/subjects",
        templateUrl: "template/AllSubjects.html",
        controller: "AllSubjects-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Subjects";
            }],
        }
    })

    .state("StudentProfile", {
        url: "/studentProfile",
        templateUrl: "template/StudentProfile.html",
        controller: "StudentProfile-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Student Profile";
            }],
        }
    })

    .state("AllStudent", {
        url: "/students",
        templateUrl: "template/AllStudent.html",
        controller: "AllStudent-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Students";
            }],
        }
    })

    .state("TeacherProfile", {
        url: "/teacherProfile",
        templateUrl: "template/TeacherProfile.html",
        controller: "TeacherProfile-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Teacher's Profile";
            }],
        }
    })

    .state("AllTeacher", {
        url: "/staff",
        templateUrl: "template/AllTeacher.html",
        controller: "AllTeacher-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Staff";
            }],
        }
    })

    .state("AllSchool", {
            url: "/schools",
            templateUrl: "template/AllSchool.html",
            controller: "AllSchools-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Schools";
                }],
            }
        })
        .state("subjectMarks", {
            url: "/subjectMarks",
            templateUrl: "template/subjectMarks.html",
            controller: "subjectMarks-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Add Student Fee";
                }],
            }
        })
        .state("promotStudents", {
            url: "/promotStudents",
            templateUrl: "template/promotStudents.html",
            controller: "promotStudents-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Promote Students";
                }],
            }
        })
        .state("addStdSection", {
            url: "/addStdSection",
            templateUrl: "template/addStdSection.html",
            controller: "addStdSection-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Add Section To Class";
                }],
            }
        }).state("addSingleStdSection", {
            url: "/addSingleStdSection",
            templateUrl: "template/addSingleStdSection.html",
            controller: "addSingleStdSection-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Add Students To Section";
                }],
            }
        }).state("promoteStdManually", {
            url: "/promoteStdManually",
            templateUrl: "template/promoteStdManually.html",
            controller: "promoteStdManually-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Promote Student";
                }],
            }
        }).state("addPayments", {
            url: "/addPayments",
            templateUrl: "template/addPayments.html",
            controller: "addPayments-ct",
            resolve: {
                'title': ['$rootScope', function($rootScope) {
                    $rootScope.title = "Payments";
                }],
            }
        })

    .state("home", {
        url: "/dashboard",
        templateUrl: "template/home.html",
        controller: "home-ct",
        resolve: {
            'title': ['$rootScope', function($rootScope) {
                $rootScope.title = "Dashboard";
            }],
        }
    })

    $urlRouterProvider.otherwise("/dashboard");

});

app.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);