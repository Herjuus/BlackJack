<?php

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Stopper session (som holder deg innlogget på forskjellige sider) og sletter dataen i session før den sender deg til login siden||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

session_start();

session_unset();
session_destroy();

header("Location: index.php");
