<?php
// include_once("../conn.php"); 
    error_reporting(0);
function send_notification($tokens, $message)
{

	$url = 'https://fcm.googleapis.com/fcm/send';
	$data = array(
		// 'registration_ids' => $tokens,
		  $message
		//'{"data":  {"message": "testing...testing...testing....","numbers":["03078781787","030613948141	"]	 },  "priority" : "high",  "registration_ids" : ["cHPkTZFs_Ho:APA91bH58UqkFxOl0SRgaa4XgB8Bs58FsoGGyjJ6wdduGVw8nhBz5MPwwDgRXqKySLI9VcA2kym-98CO-3RyWxL2NHDs7llu8m-UcBW8wMFhaP7XvJKLMRGRaH83TmNwVZB6TEKdmi39"]}'
		
	);
	$dt=json_encode($message);
	
	$headers = array(
	//	'authorization: key=AAAAsFEcQN0:APA91bGx6a9uZ4JndEbuIKt6QYFPxPfNt0H-1GgsItGlg_cQYZfCF0Igg2SdOz41e1pACF3WIxeqm2cQ2i72N5mQpg8o0dVs3YrVOt7AZEij_N9-o2X2tmw-32PBvjTYMqDn8Icm_loO',
		'authorization: key=AAAA11ZONjo:APA91bFalHfNX6-SWr9HO1gkubG5DGlp5WLAE8C5R3y6-uhUo-XsBLdK5-UsM1U6iDk_PEwU-a6scPubUt3LAuk1oqBCiZAVHS8xLd05MWe10fg45tHIIUNpTIrAiY8TYXFVSPTeYHJq',
		 'content-type: application/json',
	);
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
$numbr=["03078781787","030613948141"];
$msgContent="this is a message";
$tokens=["cHPkTZFs_Ho:APA91bH58UqkFxOl0SRgaa4XgB8Bs58FsoGGyjJ6wdduGVw8nhBz5MPwwDgRXqKySLI9VcA2kym-98CO-3RyWxL2NHDs7llu8m-UcBW8wMFhaP7XvJKLMRGRaH83TmNwVZB6TEKdmi39"];
$cnt=array();
$cnt=array("message"=>$msgContent,"numbers"=>$numbr);
//		echo json_encode($cnt);
$message = array("data" =>$cnt, "registration_ids"=>$tokens);

$message_status = send_notification($tokens, $message);
echo $message_status;
