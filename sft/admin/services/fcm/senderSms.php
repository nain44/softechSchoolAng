<?php

// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'YOUR-API-ACCESS-KEY-GOES-HERE' );


//$registrationIds = array( $_GET['id'] );

// prep the bundle
$msg = array
(
	'message' 	=> 'here is a message. message',
    ' number'=>['03078781787','03061394814']
);

$fields = array
(
   "registration_ids"	=>"cHPkTZFs_Ho:APA91bH58UqkFxOl0SRgaa4XgB8Bs58FsoGGyjJ6wdduGVw8nhBz5MPwwDgRXqKySLI9VcA2kym-98CO-3RyWxL2NHDs7llu8m-UcBW8wMFhaP7XvJKLMRGRaH83TmNwVZB6TEKdmi39",
	"data"			=> $msg
);
 
$headers = array(    
'authorization: key=AAAAsFEcQN0:APA91bGx6a9uZ4JndEbuIKt6QYFPxPfNt0H-1GgsItGlg_cQYZfCF0Igg2SdOz41e1pACF3WIxeqm2cQ2i72N5mQpg8o0dVs3YrVOt7AZEij_N9-o2X2tmw-32PBvjTYMqDn8Icm_loO',
    
     'content-type: application/json',
);
 
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS,  $fields );
$result = curl_exec($ch );
curl_close( $ch );

echo $result;

?>