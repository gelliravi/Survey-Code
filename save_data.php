<?php

$file_name = $_POST["name"];

file_put_contents($file_name, $_POST);