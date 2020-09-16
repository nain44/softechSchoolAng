
app.filter('monthFilter', function () {
    return function (input, stt) {
        
        if (input != undefined) {
            console.log("input",input)
            
             switch (input) {
            case 1:
               stt="Jan"
                break;
            case 2:
                stt="Feb"
                break;
                 case 3:
                stt="Mar"
                break;
                 case 4:
                stt="Apr"
                break;
                 case 5:
                stt="May"
                break;
                 case 6:
                stt="Jun"
                break;
                 case 7:
                stt="Jul"
                break;
                 case 8:
                stt="Aug"
                break;
                 case 9:
                stt="Sep"
                break;
                 case 10:
                stt="Oct"
                break;
                 case 11:
                stt="Nov"
                break;
                case 12:
                stt="Dec"
                break;
            default: 

        }

                      return stt;



        }

    }

});

app.filter('totalMarks', function () {
    return function (input, stt) {
        debugger
        
        if (input != undefined) {
            console.log("input",input)
            

        }

                      return stt;



    }

});
