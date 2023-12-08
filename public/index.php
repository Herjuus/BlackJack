<?php
session_start();
include "login.php";
if (isset($_SESSION['id']) && isset($_SESSION['username'])) {
    header("Location: game.php");
    exit();
} else {

?>
    <!-- 
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    //|||||| Login form, selve funksjonene skjer i login.php ||||||||
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    -->
    <!DOCTYPE html>
    <html>

    <head>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>

    <body>
        <header>
            <h1>Login</h1>
        </header>
        <div class="bakgrunn">
            <h1>Bare Vifter</h1>
            <form class="loginForm" action="login.php" method="post">
                <h2>Login:</h2>
                <label>Bruker: </label>
                <input class="input" type="text" name="username" placeholder="Username"><br />
                <label>Password: </label>
                <input class="input" type="password" name="password" placeholder="Password"><br />
                <button type="submit">Login</button><br />
            </form>
        </div>
        <footer></footer>
    </body>

    </html>
    <!-- -------->
<?php
}
?>