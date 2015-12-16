<?php
	$name = $_POST['projectName'];
	$URL = $_POST['URL-project'];
	$desc = $_POST['description-progect'];
	$fileText = $_POST['file_project-text'];

	$data = array();

	if ( $name === '' or $desc === '' or $URL === '' or $fileText === '') {
		$data['status'] = 'error';
		$data['text'] = 'Заполните форму!';
	}else{
		$data['status'] = 'OK';
		$data['text'] = 'Отправлено на сервер!';
}
	header("Content-Type: application/json");
	echo json_encode($data);
	exit;
?>