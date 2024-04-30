<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>HarvestLink</title>
    </head>
    <body class="antialiased">
    <id id="app"></id>
    @vitereactrefresh
    @vite('resources/js/app.js')
    <script src="https://cdn.tailwindcss.com"></script>
    </body>
</html>
