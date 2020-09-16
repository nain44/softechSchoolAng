    app.run(function ($rootScope) {

    var ext = ".php"
    var baseURL = 'http://localhost/softechschool/admin/services/';

    $rootScope.userId = localStorage.getItem('userId');
    $rootScope.SchoolSession = localStorage.getItem('schoolSession');

    $rootScope.GetAllSchools = baseURL + "GetAllSchools" + ext
    $rootScope.RegisterSchool = baseURL + "RegisterSchool" + ext
    $rootScope.UpdateSchool = baseURL + "UpdateSchool" + ext
    $rootScope.DeleteSchool = baseURL + "DeleteSchool" + ext
    $rootScope.GetAllStdFee = baseURL + "GetAllStdFee" + ext
    $rootScope.UpdateStdFee = baseURL + "UpdateStdFee" + ext
    $rootScope.GetAllStudent = baseURL + "GetAllStudent" + ext
    $rootScope.RegisterStudent = baseURL + "RegisterStudent" + ext
    $rootScope.DeleteStudent = baseURL + "DeleteStudent" + ext
    $rootScope.UpdateStudent = baseURL + "UpdateStudent" + ext
    $rootScope.GetAllClasses = baseURL + "GetAllClasses" + ext
    $rootScope.InsertClass = baseURL + "InsertClass" + ext
    $rootScope.DeleteClass = baseURL + "DeleteClass" + ext
    $rootScope.UpdateClass = baseURL + "UpdateClass" + ext
    $rootScope.GetAllTeachers = baseURL + "GetAllTeachers" + ext
    $rootScope.InsertTeacher = baseURL + "InsertTeacher" + ext
    $rootScope.DeleteTeacher = baseURL + "DeleteTeacher" + ext
    $rootScope.updateTeacher = baseURL + "updateTeacher" + ext
    $rootScope.GetAllSubjects = baseURL + "GetAllSubjects" + ext
    $rootScope.InsertSubject = baseURL + "InsertSubject" + ext
    $rootScope.UpdateSubject = baseURL + "UpdateSubject" + ext
    $rootScope.DeleteSubject = baseURL + "DeleteSubject" + ext
    $rootScope.GetallExpencies = baseURL + "GetallExpencies" + ext
    $rootScope.AddExpenses = baseURL + "AddExpenses" + ext
    $rootScope.DeleteExpenses = baseURL + "DeleteExpenses" + ext
    $rootScope.UpdateExpenses = baseURL + "UpdateExpenses" + ext
    $rootScope.GetAllattendance = baseURL + "GetAllattendance" + ext
    $rootScope.GetAllIncome = baseURL + "GetallIncome" + ext
    $rootScope.InsertIncome = baseURL + "InsertIncome" + ext
    $rootScope.UpdateIncome = baseURL + "UpdateIncome" + ext
    $rootScope.DeleteIncome = baseURL + "DeleteIncome" + ext
    $rootScope.getteacherdrp = baseURL + "getteacherdrp" + ext
    $rootScope.GetAllClassesdrp = baseURL + "GetAllClassesdrp" + ext
    $rootScope.insertPWF = baseURL + "insertPWF" + ext;
    $rootScope.getAllClassFee = baseURL + "getAllClassFee" + ext;
    $rootScope.stdFeeView = baseURL + "stdFeeView" + ext;
    $rootScope.insertFeeForStudents = baseURL + "insertFeeForStudents" + ext;
    $rootScope.getSingleStdFee = baseURL + "getSingleStdFee" + ext;
    $rootScope.getSpicMonths = baseURL + "getSpicMonths" + ext;
    $rootScope.getAllSbjectDrp = baseURL + "getAllSbjectDrp" + ext;
    $rootScope.insertAttendance = baseURL + "insertAttendance" + ext;
    $rootScope.getAttendance = baseURL + "getAttendance" + ext;
    $rootScope.getStaffAttendance = baseURL + "getStaffAttendance" + ext;
    $rootScope.insertStaffAttendance = baseURL + "insertStaffAttendance" + ext;
    $rootScope.getStudentsForMarks = baseURL + "getStudentsForMarks" + ext;
    $rootScope.InsertResult = baseURL + "InsertResult" + ext;
    $rootScope.getDataForMarks = baseURL + "getDataForMarks" + ext;
    $rootScope.getSchoolInfo = baseURL + "getSchoolInfo" + ext;
    $rootScope.resetAttendance = baseURL + "resetAttendance" + ext;
    $rootScope.resetClassAttendance = baseURL + "resetClassAttendance" + ext;
    $rootScope.getAllSectionsForDrp = baseURL + "getAllSectionsForDrp" + ext;
    $rootScope.addStdToSection = baseURL + "addStdToSection" + ext;
    $rootScope.getStudentForSection = baseURL + "getStudentForSection" + ext;
    $rootScope.promoteStudents = baseURL + "promoteStudents" + ext;
    $rootScope.resetFee = baseURL + "resetFee" + ext;
    $rootScope.getMarksStatus = baseURL + "getMarksStatus" + ext;
    $rootScope.getSubjectsForClass = baseURL + "getSubjectsForClass" + ext;
    $rootScope.insertStudentsPosition = baseURL + "insertStudentsPosition" + ext;
    $rootScope.getStudentCount = baseURL + "getStudentCount" + ext;
    $rootScope.getAllStudentsForResultCard = baseURL + "getAllStudentsForResultCard" + ext;
    $rootScope.getClassSection = baseURL + "getClassSection" + ext;
    $rootScope.GetAllClasses = baseURL + "GetAllClasses" + ext;
    $rootScope.insertProffession = baseURL + "insertProffession" + ext;
    $rootScope.getProffession = baseURL + "getProffession" + ext;
    $rootScope.deleteProffession = baseURL + "deleteProffession" + ext;
    $rootScope.updateProffession = baseURL + "updateProffession" + ext;    
    $rootScope.getAllTeacherDrp = baseURL + "getAllTeacherDrp" + ext;
    $rootScope.getAllSections = baseURL + "getAllSections" + ext;
    $rootScope.insertSection = baseURL + "insertSection" + ext;
    $rootScope.deleteSection = baseURL + "deleteSection" + ext;
     $rootScope.getAllTerms = baseURL + "getAllTerms" + ext;
    $rootScope.insertTerm = baseURL + "insertTerm" + ext;
    $rootScope.deleteTerm = baseURL + "deleteTerm" + ext;
    $rootScope.updateTerm = baseURL + "updateTerm" + ext;
    $rootScope.getSingleSubjectResult = baseURL + "getSingleSubjectResult" + ext;
    $rootScope.addResultFromExcel = baseURL + "addResultFromExcel" + ext;
    $rootScope.withdrawStudent = baseURL + "withdrawStudent" + ext;
    $rootScope.updatePosition = baseURL + "updatePosition" + ext;
    $rootScope.sendSms = baseURL + "sendSms" + ext;
    $rootScope.getAllStudentsContacts = baseURL + "getAllStudentsContacts" + ext;
    $rootScope.getAllStudentsDrp = baseURL + "getAllStudentsDrp" + ext;

    
    
})

app.factory('serF', function ($http, $q, $rootScope) {
    var params = {};
    
   // params.schId = $rootScope.userId;
    
    var deferred = $q.defer();
    var service = {};
    return {
        service: serverCall = function (params, url) {
             //   params.session = $rootScope.SchoolSession;
            return $http({
                method: "POST",
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
        }
    };
    return deferred.resolve(service);

});
