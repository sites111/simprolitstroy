var projectsCountMax = 3;
var projectsCatalogArray = null;

var galleryCountMax = 2+4;
var galleryArray = null;

getCatalogProjects();
getGallery();

function getCatalogProjects(){
	var data = new FormData();
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
	    projectsCatalogArray = this.responseText;
	//    alert(projectsCatalogArray);
		projectBlockFill(projectsCountMax);
	  }
	});
	xhr.open("GET", "https://simprolitstroy.ru/api/mysql/catalog_get.php");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.send(data);
}

function projectBlockFill(count_max){
	var count = 0;
	var projectBlockElementContent = '';
	let jsonObjectParse = JSON.parse(projectsCatalogArray);
	for (var i = 0; i < jsonObjectParse.length; i++) { 
		if(count >= count_max) break;
		projectBlockElementContent += createProject(
			jsonObjectParse[i]['id'], 
			jsonObjectParse[i]['name'], 
			jsonObjectParse[i]['image'], 
			jsonObjectParse[i]['price'], 
			jsonObjectParse[i]['square'], 
			jsonObjectParse[i]['levels'], 
			jsonObjectParse[i]['rooms'], 
			jsonObjectParse[i]['width'], 
			jsonObjectParse[i]['length']
		);
		count++;
	}
	if(count >= jsonObjectParse.length) {
		document.getElementById('btnMoreProjects').style.display = "none";
	}
	document.getElementById('projects_block').innerHTML = projectBlockElementContent;
}

function clickMoreProjects(){ 
	projectsCountMax += 3;
	projectBlockFill(projectsCountMax);
} 	
		var fileName = 'file.file';
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
			
			fileName = this.files[0]['name'];

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
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.send(data); 
		}  

		function cropTextFile(text){
			var sliced = text.slice(0,15);
			if (sliced.length < text.length) {
				sliced += '...';
			}
			return sliced;
		}

		function setFileNameText(filenametext){
			document.getElementById('fileName').innerHTML = cropTextFile(fileName);
		}
		function setFileUploadStatus(statustext){
			document.getElementById('fileName').innerHTML = 'Загрузка';
		}
		function setFileUploadedLink(link){
			document.getElementById('fileName').innerHTML = cropTextFile(fileName);
		}
function createProject(id, name, image, price, square, levels, rooms, width, length){
	return `
							<div class="col">
								<div class="card row-cols-1 h-100">
									<img src="${image}" class="rounded-4"" style="border-radius: 20px; height: 270px; object-fit: cover;">
									<div class="card-body">
										<h5 class="card-title pt-4">${name}</h5>
									</div>
									<div class="row row-cols-1  row-cols-md-1 row-cols-lg-1 g-0">
										<div class="row row-cols-1 row-cols-md-1 row-cols-xl-2 g-0">
											<div class="col ">
												<div class="vstack gap-3">
													<div class="pt-2"><img class="icon" src="resize.svg">Размеры: ${width}х${length}</div>
												</div>
											</div>
											<div class="col">
												<div class="vstack gap-3">
													<div class="pt-2"><img class="icon" src="rooms.svg">Комнат: ${rooms}</div>
												</div>
											</div>
											<div class="col">
												<div class="vstack gap-3">
													<div class="pt-2"><img class="icon" src="resize2.svg">Площадь: ${square} м²</div>
												</div>
											</div>
											<div class="col">
												<div class="vstack gap-3">
													<div class="pt-2"><img class="icon" src="levels-icon.svg">Этажей: ${levels}</div>
												</div>
											</div>
										</div>
									</div>
									<div class="vstack gap-2 desc">
										<div class=""><img class="icon" src="type.svg">Тип дома: полистеролбетон</div>
									</div>
									<div class="price">от ${number_format(price)} руб.</div>
									<div class="card-bodys">
										<a href="https://simprolitstroy.ru/projects?id=${id}">
											<div class="p-3 border-top border-success pt-4 full">ПОДРОБНЕЕ</div>
										</a>
									</div>
								</div>
							</div>`;
}

function getGallery(){
	var data = new FormData();
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
	    galleryArray = this.responseText;
	//	alert(galleryArray);
		galleryBlockFill(galleryCountMax);
	  }
	});
	xhr.open("GET", "../api/mysql/gallery_get.php");
	xhr.send(data);
}

/*
var galleryCountMax = 2+4;
var galleryArray = null;
*/

function galleryBlockFill(count_max){
	var count = 0;
	var galleryBlockElementContent = '';
	let jsonObjectParse = JSON.parse(galleryArray);

	document.getElementById('galleryFirstBox').innerHTML = `<div class="col">
									                      	  <img class="w-100 rounded-4" src="${jsonObjectParse[0]['url']}" style="border-radius: 20px; height: 432px; object-fit: cover;">
										                    </div>
										                    <div class="col">
										                        <img class="w-100 rounded-4" src="${jsonObjectParse[1]['url']}" style="border-radius: 20px; height: 432px; object-fit: cover;">
										                    </div>`;
	count += 2;
	for (var i = 0+2; i < jsonObjectParse.length; i++) { 
		if(count >= count_max) break;
		galleryBlockElementContent += `<div class="col"> 
                        <img class="w-100 rounded-4" src="${jsonObjectParse[i]['url']}" style="border-radius: 20px; height: 210px; object-fit: cover;">
                    </div>`;
		count++;
	}
	if(count >= jsonObjectParse.length) {
		document.getElementById('btnMoreGallery').style.display = "none";
	}

	document.getElementById('gallerySecondBox').innerHTML = galleryBlockElementContent;
}

function clickMoreGallery(){  
	galleryCountMax += 4;
	galleryBlockFill(galleryCountMax);
	//btnMoreGallery
	//alert('clickMoreGallery');
}
  
function number_format(n) {
	n += "";
	n = new Array(4 - n.length % 3).join("U") + n;
	return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}