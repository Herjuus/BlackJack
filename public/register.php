<!DOCTYPE html>
<html>
<!--
//||||||||||||||||||||||||||||||||||||||||||||
//|||||| For for register_process.php ||||||||
//||||||||||||||||||||||||||||||||||||||||||||
-->

<head>
    <title>User Registration</title>
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>

<body>
    <header>
        <a href="home.php"><img src="imgs/barevifter.svg" alt="barevifter logo" width="75px" height="75px"></a>
        <h2>User Registration</h2>
        <a href="handlevogn.php"><img src="imgs/Handlevogn_1utkast.svg" alt="handlevogn" width="75px" height="75px"></a>
    </header>
    <div class="bakgrunn">
        <form class="loginForm" action="register_process.php" method="post">
            <label for="username">Username:</label><br>
            <input class="input" type="text" name="username" placeholder="Usernavn"><br><br>

            <label for="password">Password:</label><br>
            <input class="input" type="password" name="password" placeholder="Password"><br><br>

            <label for="email">Email:</label><br>
            <input class="input" type="email" name="email" placeholder="Email"><br><br>

            <input type="submit" value="Register">

        </form>
    </div>
    <footer><a href="logout.php">Logg ut</a></footer>
</body>

</html>