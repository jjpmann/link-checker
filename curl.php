<?php
	
	error_reporting(-1);

	$json = array('error');

	$link = isset($_GET['link']) ? trim($_GET['link']) : false;

	if( $link )
	{
		
		$ch = curl_init($link);
		
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

		$response = curl_exec($ch);
		$info = curl_getinfo($ch);
		
		curl_close($ch);

		$json = $info;
	
	}

	
	die( json_encode($json) );

