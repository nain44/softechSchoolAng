<?php
include_once("../conn.php"); 
    error_reporting(0);
$token = $_GET['token'];

$sql = "Select tkn_token From tbl_token where tkn_token='$token'";
echo $sql;
$result = mysqli_query($conn, $sql);

if ($result) {
    $rowcount = mysqli_num_rows($result);

    if ($rowcount == 0) {
        $q = $conn->prepare("INSERT INTO tbl_token (tkn_token) VALUES ('$token')"
            . " ON DUPLICATE KEY UPDATE tkn_token = '$token';");

        //$q->bind_param('ss', $token);


        $resp = array();
        if ($q->execute()) {
            $resp['error'] = false;
            $resp['message'] = "token stored";
        } else { {
                $resp['error'] = true;
                $resp['message'] = "token not stored" . $q->error;
            }
        }
    } // end of token check
    else {
        $resp['error'] = true;
        $resp['message'] = "Token already Exists";
    }
    echo json_encode($resp);
} //end if $sql 
//mysqli_close($conn);
