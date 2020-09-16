<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\r\n  \"data\": \r\n  {\r\n    \"message\": \"testing...testing...testing....\",\"numbers\":[\"03078781787\",\"03061394814\"]\r\n  },\r\n  \"priority\" : \"high\",\r\n  \"registration_ids\" : \r\n  \t[\r\n      \"cHPkTZFs_Ho:APA91bH58UqkFxOl0SRgaa4XgB8Bs58FsoGGyjJ6wdduGVw8nhBz5MPwwDgRXqKySLI9VcA2kym-98CO-3RyWxL2NHDs7llu8m-UcBW8wMFhaP7XvJKLMRGRaH83TmNwVZB6TEKdmi39\"\r\n    ]\r\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: key=AAAAsFEcQN0:APA91bGx6a9uZ4JndEbuIKt6QYFPxPfNt0H-1GgsItGlg_cQYZfCF0Igg2SdOz41e1pACF3WIxeqm2cQ2i72N5mQpg8o0dVs3YrVOt7AZEij_N9-o2X2tmw-32PBvjTYMqDn8Icm_loO",
   
    "content-type: application/json",
   
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}