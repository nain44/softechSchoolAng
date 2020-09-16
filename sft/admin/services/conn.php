<?php header('Access-Control-Allow-Origin: *'); ?>
<?php header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); ?>
<?php header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT'); ?>
<?php
// error_reporting(E_ALL);
error_reporting(0);
$db_host = "localhost";
// Place the username for the MySQL database here 
$db_username = "root";
// Place the password for the MySQL database here 
$db_pass = "";
// Place the name for the MySQL database here 
$db_name = "dbschool";

// Run the actual connection here
$conn = mysqli_connect("$db_host","$db_username","$db_pass","$db_name") or die ("could not connect to mysql server");
//mysqli_select_db("$db_name","$a") or die ("no database");


//ammmad bhai function for json start
function getJsonParams(){
$json = file_get_contents('php://input');
    //echo $json;
$obj = json_decode($json,true);
//print_r($obj);
return $obj;
//ammmad bhai function for json ended
}
?>