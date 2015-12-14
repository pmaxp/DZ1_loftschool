<?php
	$name = $_POST['projectName'];
	$data = array();

	if ($name === '') {
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