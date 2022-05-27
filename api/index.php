<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=10" />
	<title>Полигон</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
</head>
<body>	  

	<div class="input__wrapper">
		<input id="inputFile" type="file" accept="image/*,.pdf" style="opacity: 0; visibility: hidden; position: absolute;">
		<label for="inputFile" class="input__file-button">
			<span class="input__file-button-text">Выберите файл</span>
		</label>
	</div>
	<br>
	<div id="filename">Выбранный файл:</div>
	<div id="uploadstatus">Статус:</div>
	<div id="uploadedfilelink">URL:</div>

	<script>
		var inputElement = document.getElementById("inputFile");
		inputElement.addEventListener("change", handleFiles, false);
		function handleFiles() {
			const fileList = this.files; /* now you can work with the file list */
			console.log(fileList);
			var file = this.files[0];
		//	console.log('Загрузка файла: ' + file['name'] + ' ' + file['size'] + ' ' + file['type']);

			var data = new FormData();
			data.append("inputfile", this.files[0], this.files[0]['name']);

			setFileNameText(this.files[0]['name']);
			 
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.addEventListener("readystatechange", function() {
			  if(this.readyState === 3) {
			    console.log('загрузка' + xhr.responseText.length);
			  }
			  if(this.readyState === 4) {
			  	var responseBody = this.responseText;
			    console.log(responseBody);
			    setFileUploadStatus(this.responseText);
			    var jsonResponse = JSON.parse(responseBody);
			    setFileUploadedLink(jsonResponse['link']);
			  }
			  else {
			    setFileUploadStatus(this.responseText);
			  }
			}); 
			xhr.open("POST", "https://simprolitstroy.ru/api/input.php");
			xhr.send(data); 
		}  

		function setFileNameText(filenametext){
			document.getElementById('filename').innerHTML = `Выбранный файл: ${filenametext}`;
		}
		function setFileUploadStatus(statustext){
			document.getElementById('uploadstatus').innerHTML = `Статус: ${statustext}`;
		}
		function setFileUploadedLink(link){
			document.getElementById('uploadedfilelink').innerHTML = `URL: ${link}`;
		}
	</script>
</body>
</html>