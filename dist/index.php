<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Search Powercode</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>

<form method="post" id="searchForm">
    <div class="endpoint" id="enpoint0">
        <input title="API Key" type="text" id="apiKey0" class="apiKey" name="endpoint[0][apiKey]" placeholder="API Key"/>
        <input title="URL Endpoint" type="text" id="url0" class="apiUrl" name="endpoint[0][url]" placeholder="URL Endpoint"/>
    </div>
    <div>
        <button type="button" id="addEndpoint">Add Endpoint</button>
    </div>
    <div>
        <label for="searchString">Search String</label>
        <input type="text" id="searchString" name="searchString" title="Search String" />
    </div>
    <div>
        <input type="submit" value="Search" title="Search" name="search" />
    </div>
</form>
<div id="customers"></div>
<script src="http://localhost:35729/livereload.js"></script>
<script type="text/javascript" src="index_bundle.js"></script></body>
</html>
