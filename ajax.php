<?php

if ($_GET['echo']) {
    $seconds = intval($_GET['sec']);
    sleep($seconds);
    echo $_GET['echo'];
} else {
    echo 'Unexpected request';
}
