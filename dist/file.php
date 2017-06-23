<?php

$globalPostBody = array (
    'action' => 'searchCustomers',
    'searchString' => $_POST['searchString']
);
//error_log(print_r($_POST['endpoint'],true));
/*
'url' => "https://ryan.powercode.com:444/api/1/"
'apiKey' => "4d08aivn7fi8sxuc0bdtw5b89ouhxbb5"

'url' => "https://172.17.255.52:444/api/1/",
'apiKey' => "zt1w2wfzpmln4c55gkpbzxbhq73nktx1"
*/
$endpoints = $_POST['endpoint'];
$result = array();
$err = '';

foreach ($endpoints as $endpoint) {
    $endpointPostBody = array('apiKey' => $endpoint['apiKey']);

    $postBody = array_merge($endpointPostBody, $globalPostBody);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint['url']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postBody);

    array_push($result, json_decode(curl_exec($ch), true));

    $response = json_decode(curl_exec($ch), true);
    $err = curl_error($ch);

    curl_close($ch);

    if ($err) {
        $err = "cURL Error #:" . $err;
    }
}

if ($err) {
    echo "cURL Error #:" . $err;
}

echo json_encode($result);