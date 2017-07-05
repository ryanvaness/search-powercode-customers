<?php

$globalPostBody = array (
    'action' => 'searchCustomers',
    'searchString' => $_POST['searchString']
);

/*
'url' => "https://ryan.powercode.com:444/api/1/"
'apiKey' => "179dduwll9ybbnvsd64bquitlhqbuyds"

'url' => "https://172.17.255.52:444/api/1/",
'apiKey' => "zt1w2wfzpmln4c55gkpbzxbhq73nktx1"

'url' => "https://172.17.255.166:444/api/1/",
'apiKey' => "6ggtzj4j4fnklu1vr6pv0q0ho6elq5mc"
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

    $return = json_decode(curl_exec($ch), true);
    $return['url'] = preg_replace( '/\/api\/1\/?/', '', $endpoint['url']);

    array_push($result, $return);

    curl_close($ch);
}

echo json_encode($result);