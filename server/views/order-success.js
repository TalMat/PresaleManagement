module.exports  = function(options) {

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Girlscouts</title>
    <link rel="stylesheet" type="text/css" href="/static/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/static/css/order-page.css">
</head>
<body>
<div class="container">
    <div class="row ml-0 mb-3 bg-light mt-3 mr-0 rounded">
        <div class="col-sm-12">
            <h1>Excellent!</h1><br>
    
            <h3>Your shirt is in line to be printed, ${ options.name }!</h3><br>
    
            <h3>We'll email you when your order is on it's way!</h3>

        </div>

    </div>

    <script type="text/javascript" src="/static/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/static/js/clearFormStorage.js"></script>
</div>
</body>
</html>
`
};