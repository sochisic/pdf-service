/**
 * https://github.com/Rebilly/ReDoc
 */

module.exports = (swagger) => `<!DOCTYPE html>
<html>
  <head>
    <title>API Gateway</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <!--
    ReDoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="redoc-container"></div>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
    <script>
      Redoc.init(JSON.parse(
          '${JSON.stringify(swagger)}'
        ),
        {},
        document.getElementById('redoc-container')
      )
    </script>
  </body>
</html>`;
