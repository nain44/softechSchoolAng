<?php
 include_once("conn.php"); 
    error_reporting(0);
    $data=getJsonParams();
    
   
    function send_notification($tokens, $message)
{

	$url = 'https://fcm.googleapis.com/fcm/send';
	$data = array(
		// 'registration_ids' => $tokens,
		  $message
		//'{"data":  {"message": "testing...testing...testing....","numbers":["03078781787","030613948141	"]	 },  "priority" : "high",  "registration_ids" : ["cHPkTZFs_Ho:APA91bH58UqkFxOl0SRgaa4XgB8Bs58FsoGGyjJ6wdduGVw8nhBz5MPwwDgRXqKySLI9VcA2kym-98CO-3RyWxL2NHDs7llu8m-UcBW8wMFhaP7XvJKLMRGRaH83TmNwVZB6TEKdmi39"]}'
		
	);
    $dt=json_encode($message);
	$headers = array('authorization: key=AAAAV8hArYY:APA91bGfMjJo6x8xVNSmwS8pPGkfqgAOJsX0I79HuK84dHjm6PX_89MQA4dv2FGYYp1pE_tavDkEzOM0LG7hgEtUb-uw53vPzkpg29H3RYOsSiGdkJ0Jnhc_Xy6MFIS8-PhfzUfWwcAW',
	 'content-type: application/json',
	);
//	echo 'dt' .$dt;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS,$dt);
	$result = curl_exec($ch);
	if ($result === FALSE) {
		die('Curl failed: ' . curl_error($ch));
	}
	curl_close($ch);
	return $result;
}
$ar = array();


// $sql = " Select tkn_token From tbl_token";
// $result = mysqli_query($conn, $sql);
// $tokens = array();
// if (mysqli_num_rows($result) > 0) {
// 	while ($row = mysqli_fetch_assoc($result)) {
// 		$tokens[] = $row["tkn_token"];
// 		$ar = $tokens;
		
// 	}
// }

//mysqli_close($conn);
$tokens = array();
$numbr = array();
$msgContent =$data['msgContent'];
$numbr =$data['numbers'];
$tokens=["fwLmAfVcLcI:APA91bGCWfmJoGaHT4rAkbefc2K7r2zv1_58J1Khv2GHxKtpllguG-DjZckFAN4OAGSmb5YA3kAjnhBrAFvjrtD_thG73GBx55a5BRUBL5xBGUAG7GhElNVe1y1sBmTEg3R2uZshKeWz"];
$cnt=array();
$cnt=array("message"=>$msgContent,"numbers"=>$numbr);
//		echo json_encode($cnt);
$message = array("data" =>$cnt, "registration_ids"=>$tokens);

$message_status = send_notification($tokens, $message);
echo $message_status;
