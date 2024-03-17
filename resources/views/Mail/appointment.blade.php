<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment</title>
    <style>
        /* Reset styles to ensure consistent rendering */
        body, h1, p {
            margin: 0;
            padding: 0;
        }

        /* Body styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            color: #333;
        }

        /* Container styling */
        .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        /* Header styling */
        .header {
            text-align: center;
            background-color: #007bff;
            color: #fff;
            padding: 15px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        /* Logo styling */
        .logo {
            display: block;
            margin: 0 auto;
            width: 150px;
            height: auto;
        }

        /* Content styling */
        .content {
            padding: 20px;
            backgroun-color:#718096;
        }

        /* Login link styling */
        .login-link {
            display: block;
            text-align: center;
            margin-top: 20px;
        }

        .login-link a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .login-link a:hover {
            background-color: #0056b3;
        }

        /* Footer styling */
        .footer {
            text-align: center;
            padding-top: 20px;
            color: #777;
            font-size: 12px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>New Appointment</h1>
    </div>
    <div class="content bg-gray">
        <p><strong>Name:</strong> {{ $name }}</p>
        <p><strong>Email:</strong> {{ $email }}</p>
        <p><strong>CNIC:</strong> {{ $cnic }}</p>
        <p><strong>Phone no:</strong> {{ $phoneNo }}</p>
    </div>
    <div class="footer">
        <p>If you did not register for this service, please ignore this email.</p>
    </div>
</div>
</body>
</html>
