<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success</title>
    <meta name="keywords"
          content="mobile app developers, mobile app development, android app development, create ios app, web development, Desktop App development, design mobile site, creative design, mobile application development company, iphone apps development, create web design" />
    <meta name="description"
          content="Top application development company in the pakistan. We create high-quality, popular, innovation custom software/app for business" />
          <!-- icon -->
    <link rel="shortcut icon" href="ico/favicon.png">
    <link rel="stylesheet" href="success/styles.min.css">
    <link rel="stylesheet" href="success/main.css">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>    
    <section class="portfolio container-fluid" style="height: 100vh;">
        <div class="container">
            <div class="heading">
                <img src="img/purepng.png" alt="ok sign" style="width: 240px;height: 240px">
                <h2>Thank you</h2>
                <p>Your Message has been Send successfully.</p>
                <a href="index.php"><i class="fa fa-arrow-circle-left"></i> Back To Home</a>
            </div>
        </div>
    </section>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
    <!--[if IE]>
    <script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script>
        $(document).ready(function () {

            $("img").lazyload({
                threshold: 200
            });

        });
    </script>

    <script type="text/javascript">
        $(document).ready(function () {

            $('.text-slider').bxSlider({
                randomStart: false,
                controls: true,
                infiniteLoop: true,
                mode: 'fade',
                auto: true,
                prevText: '<i class="fa fa-angle-left fa-5x"></i>',
                nextText: '<i class="fa fa-angle-right fa-5x"></i>',

            });
        });
    </script>
    <script>
        $(function () {
            $.simpParallax();
        });
    </script>

    <script>
        $(function () {
            Grid.init();
        });
    </script>

    <!-- Google Analytics -->
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-50960275-1', 'omega-r.com');
        ga('send', 'pageview');
    </script>
    <!-- Google Analytics -->

    <script src="js/jquery.js"></script>

</body>
</html>
