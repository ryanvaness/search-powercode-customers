<?php

$globalPostBody = array(
    'action' => 'searchCustomers',
    'searchString' => $_POST['searchString']
);

if (empty($_POST['searchString'])) {
    echo json_encode(
        array(
            array(
                'statusCode' => 400,
                'message' => 'Search string cannot be empty'
            )
        )
    );
    exit();
}

$endpoints = array(
    array(
        'url' => "https://ryan.powercode.com:444/api/1/",
        'apiKey' => "1dk6uemzhf27zfashyr3mmg8sgmqv0r1",
        'name' => 'Powercode 1'
    ),
    array(
        'url' => "https://172.17.255.52:444/api/1/",
        'apiKey' => "4zscbemacol8axaswsq0nhddnjp4illd",
        'name' => 'Powercode 2'
    )
);

$result = array();

foreach ($endpoints as $endpoint) {
    try {
        $endpointPostBody = array('apiKey' => $endpoint['apiKey']);
        if (empty($endpoint['apiKey'])) {
            throw new Exception('API key can not be empty');
        }
        if (empty($endpoint['url'])) {
            throw new Exception('URL endpoint can not be empty');
        }

        $postBody = array_merge($endpointPostBody, $globalPostBody);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint['url']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postBody);

        $return = json_decode(curl_exec($ch), true);
        if (empty($return)) {
            $return = array(
                'statusCode' => 400,
                'message' => 'Something went wrong'
            );
        }
        $return['url'] = preg_replace('/\/api\/1\/?/', '', $endpoint['url']);
        $return['name'] = $endpoint['name'];

        array_push($result, $return);

        curl_close($ch);
    } catch (Exception $e) {
        array_push(
            $result,
            array(
                'statusCode' => 400,
                'message' => $e->getMessage()
            )
        );
        continue;
    }
}

echo json_encode($result);