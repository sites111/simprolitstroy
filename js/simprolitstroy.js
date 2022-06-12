var projectsCountMax = 9;
var projectsCatalogArray = null;

var galleryCountMax = 2+4;
var galleryArray = null;

var fileURL = null;

var modalOpenStatus = false;

var formName = "Нет данных";

const MESSENGER_PHONE = 0;
const MESSENGER_VIBER = 1;
const MESSENGER_TELEGRAM = 2;
const MESSENGER_WHATSAPP = 3;

var messenger = MESSENGER_PHONE;

const QUIZ_ASK_TEXT = 0;
const QUIZ_ASK_IMAGE = 1;
const QUIZ_ASK_FORM = 2;
var quizPage = 0;
/*
0. Есть ли готовый проект
1. Строительство в этом году?
2. Есть ли участок
3. 1 или 2 этажа
4. Ипотека, материнский капитал или обмен квартиры на дом
5. Примерный бюджет
6. Контакты
*/

let quizArray = [
	{//0
		type: QUIZ_ASK_TEXT,
		ask: 'Когда планируете строительство?',
		responses: ['В ближайшее время','В этом году', 'В следующем году', 'Уже вчера'],
		images: [null,null]
	},
	{//1
		type: QUIZ_ASK_TEXT,
		ask: 'Есть готовый проект?',
		responses: ['Да','Нет', 'Другой ответ']
	},
	{//2
		type: QUIZ_ASK_TEXT,
		ask: 'Есть участок?',
		responses: ['Да', 'Нет', 'В поиске', 'Другой ответ']
	},
	{//3
		type: QUIZ_ASK_TEXT,
		ask: 'Сколько этажей хотите?',
		responses: ['1 этаж','2 этажа','1.5 этажа (мансарда)', 'Другой ответ']
	},
	{//4
		type: QUIZ_ASK_TEXT,
		ask: 'Оплата',
		responses: ['Наличка', 'Ипотека', 'Материнский капитал', 'Обмен квартиры на дом', 'Другой ответ']
	},
	{//5
		type: QUIZ_ASK_TEXT,
		ask: 'Примерный бюджет?',
		responses: ['от 1.5 до 2.5 млн','от 2.5 до 3.5 млн','от 3.5 млн и выше', 'Другой ответ']
	},
	{//6
		type: QUIZ_ASK_IMAGE,
		ask: 'Выберите подарок',
		responses: ['Мангал','Бассейн','Батут'],
		images: ['https://simprolitstroy.ru/images/mangal.png','https://simprolitstroy.ru/images/basik.png','https://simprolitstroy.ru/images/batut.png']
	},
	{//7
		type: QUIZ_ASK_FORM,
		ask: 'Куда вам отправить предварительный расчёт?'
	}
];

let quizRespons = [null, null, null, null, null, null, null, null];

/*
alert(`Вопрос 1/1: ${quizArray[1]['ask']}`);
alert(`Ответ ${quizArray[1]['responses'][2]}`);
*/

//quizLoad(0);
//getCatalogProjects();
//getGallery();

function sendAmoCRM(phone, name, comment){
	ym(88965053,'reachGoal','lead');
	var data = JSON.stringify({
	  "name": name,
	  "comment": comment,
	  "phone": phone,
	  "email": ""
	});
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});
	xhr.open("POST", "https://simprolitstroy.ru/api/amocrm/newlead.php");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data);
}

function onClickMessenger(id){ 
	messenger = id;
}

function onClickQuizMessenger(element, id){
	ym(88965053,'reachGoal','quiz');
	onClickMessenger(id);
	document.getElementById('quizMessengerWhatsApp').style = "cursor: pointer;";
	document.getElementById('quizMessengerViber').style = "cursor: pointer;";
	document.getElementById('quizMessengerTelegram').style = "cursor: pointer;";
	document.getElementById('quizMessengerPhone').style = "cursor: pointer;";

	element.style = `background: #FFFFFF;
    box-shadow: 0px 19px 26px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    cursor: pointer;`;
}

function onClickFormMessenger(element, id){
	onClickMessenger(id);//id="formMessengerWhatsApp" 
	document.getElementById('formMessengerWhatsApp').style = "cursor: pointer;";
	document.getElementById('formMessengerViber').style = "cursor: pointer;";
	document.getElementById('formMessengerTelegram').style = "cursor: pointer;";
	document.getElementById('formMessengerPhone').style = "cursor: pointer;";

	element.style = `background: #FFFFFF;
    box-shadow: 0px 19px 26px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    cursor: pointer;`;
}

function generateComment(){
	var result = `Заполнена форма: ${formName}`;
	result += `
`;

	for(var i = 0; i < quizRespons.length; i++){
		if(quizRespons[i] != null) result += `
${quizArray[i]['ask'].replace('?', '')}: ${quizRespons[i]}`;
	}
	result += `
`;
	result += `
Удобный способ связи: `;
	if(messenger == MESSENGER_PHONE) result += "позвоните";
	if(messenger == MESSENGER_VIBER) result += "напишите на Viber";
	if(messenger == MESSENGER_TELEGRAM) result += "напишите в Telegram";
	if(messenger == MESSENGER_WHATSAPP) result += "напишите на WhatsApp";
	if(fileURL != null) result += `
Прикрепленный файл: ${fileURL}`;
	result = result.replace(`

`,`
		`)
	return result;
} 

function onClickSendModal(){
	var phoneElement = document.getElementById('inputFormPhone');
	var nameElement = document.getElementById('inputFormName');

	var phone = phoneElement.value;
	var name = nameElement.value; 

	if(phone.length < 11 || name.length < 2){
		if(phone.length < 11)
			phoneElement.style.border = "1px solid #dc3545";
		else
			phoneElement.style.border = "1px solid #fff";
		if(name.length < 2)
			nameElement.style.border = "1px solid #dc3545";
		else
			nameElement.style.border = "1px solid #fff";
	return false;
	} 
	var comment = generateComment();

	sendAmoCRM(phone, name, comment);
	phoneElement.value = "";
	nameElement.value = "";

	phoneElement.style.border = "1px solid #fff";
	nameElement.style.border = "1px solid #fff";
	
	$('#formModal').modal('hide');
	successModalShow();
}

document.addEventListener("DOMContentLoaded", function(event) {
    $("#formModal").on('hide.bs.modal', function () {
       console.log('formModal hide');
		showMobFixedButtomButton();
		modalOpenStatus = false;
    });
    $("#successModal").on('hide.bs.modal', function () {
       console.log('successModal hide');
		showMobFixedButtomButton();
		modalOpenStatus = false;
    });
    $("#formModal").on('show.bs.modal', function () {
       console.log('formModal show');
		hideMobFixedButtomButton();
		modalOpenStatus = true;
    });
    $("#successModal").on('show.bs.modal', function () {
       console.log('successModal show');
		hideMobFixedButtomButton();
		modalOpenStatus = true;
    });

});
 

function modalSow(title){
	document.getElementById('formModalLabel').innerHTML = title;
	$('#formModal').modal('show');
	formName = title.replace('?','');
	hideMobFixedButtomButton();
}

function successModalShow(){ 
	$('#successModal').modal('show');
	hideMobFixedButtomButton();
}

function onClickGetSmeta(){
	formName = "Пересчёт сметы";
	var fileNameElement = document.getElementById('fileName');
	var fileLabelElement = document.getElementById('labelInputFile');
	var phoneElement = document.getElementById('inputSmetaPhone');
	var nameElement = document.getElementById('inputSmetaName');

	var phone = phoneElement.value;
	var name = nameElement.value; 

	if(phone.length < 11 || name.length < 2 || fileURL == null){
		if(phone.length < 11)
			phoneElement.style.border = "1px solid #dc3545";
		else
			phoneElement.style.border = "1px solid #fff";
		if(name.length < 2)
			nameElement.style.border = "1px solid #dc3545";
		else
			nameElement.style.border = "1px solid #fff";
		if(fileURL == null)
			fileLabelElement.style.border = "1px solid #dc3545";
		else 
			fileLabelElement.style.border = "1px solid #8ED834";
	return false;
	} 
	var comment = generateComment();

	sendAmoCRM(phone, name, comment);
	phoneElement.value = "";
	nameElement.value = "";

	fileNameElement.innerHTML = cropTextFile("Прикрепить файл");
	fileName = null;
	fileURL = null;

	phoneElement.style.border = "1px solid #fff";
	nameElement.style.border = "1px solid #fff";
	fileLabelElement.style.border = "1px solid #8ED834";
	
	successModalShow();
}

function onClickSendQuiz(){
	formName = "Квиз";
	var phoneElement = document.getElementById('inputQuizPhone');
	var nameElement = document.getElementById('inputQuizName');

	var phone = phoneElement.value;
	var name = nameElement.value; 

	if(phone.length < 11 || name.length < 2){ 
		if(phone.length < 11)
			phoneElement.style = "border: 1px solid #dc3545!important";
		else
			phoneElement.style = "border: 1px solid #fff!important";
		if(name.length < 2)
			nameElement.style = "border: 1px solid #dc3545!important";
		else
			nameElement.style = "border: 1px solid #fff!important";
	//	alert('error');
		return;
	} 

	var comment = generateComment();

	sendAmoCRM(phone, name, comment);

	phoneElement.value = "";
	nameElement.value = "";

	phoneElement.style = "border: 1px solid #fff!important";
	nameElement.style = "border: 1px solid #fff!important";
	quizLoad(0);
	successModalShow();
}

function onClickSendFormIpoteka(){
	ym(88965053,'reachGoal','ipoteka');
	formName = "Дом в ипотеку";
	var phoneElement = document.getElementById('inputIpotekaPhone');
	var nameElement = document.getElementById('inputIpotekaName');
	var phone = phoneElement.value;
	var name = nameElement.value;

	if(phone.length < 11 || name.length < 2){
		if(phone.length < 11)
			phoneElement.style.border = "1px solid #dc3545";
		else
			phoneElement.style.border = "1px solid #fff";
		if(name.length < 2)
			nameElement.style.border = "1px solid #dc3545";
		else
			nameElement.style.border = "1px solid #fff";
		return;
	} 

	var comment = generateComment();

	sendAmoCRM(phone, name, comment);

	phoneElement.value = "";
	nameElement.value = "";
	phoneElement.style.border = "1px solid #fff";
	nameElement.style.border = "1px solid #fff";
	successModalShow();
}

function hideMobFixedButtomButton(){
	document.getElementById('mobFixedBottomsPhoneWhatsApp').style = 'display: none!important';
}

function showMobFixedButtomButton(){
	document.getElementById('mobFixedBottomsPhoneWhatsApp').style = 'display: flex!important';
}

let inputs = document.getElementsByTagName('input');

for (let input of inputs) {
	input.onblur = function() {
		console.log('onblur');
		if(!modalOpenStatus) document.getElementById('mobFixedBottomsPhoneWhatsApp').style = 'display: flex!important';
	};
	input.onfocus = function() {
		console.log('onfocus');
		document.getElementById('mobFixedBottomsPhoneWhatsApp').style = 'display: none!important';
	};
}

$(window).scroll(function () {
    if ($(window).scrollTop() > 2000) {
    	showMobFixedButtomButton();
    }
});

function getCatalogProjects(){ 
 	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open("GET", "https://simprolitstroy.ru/api/mysql/catalog_get.php?v="+Date());
	xhr.onload = function() {
	    projectsCatalogArray = this.responseText;
		projectBlockFill(projectsCountMax);
	}
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	xhr.send();
}

function getProject(name){ 
 	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open("GET", `https://simprolitstroy.ru/api/mysql/project_get.php?name=${name}&v=${Date()}`);
	xhr.onload = function() { 
		setProjectCart(JSON.parse(this.responseText));
	}
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	xhr.send();
}

/*
{"data":
{"id":"1",
"image":"https:\/\/simprolitstroy.ru\/api\/gallery\/K1\/8566c9e0dfc7d9f8dde632cf962bd0fc.jpg",
"name":"Проект К-1",
"price":"1746000",
"square":"97",
"levels":"1",
"rooms":"0",
"description":"Дом размерами в осях 8,15х11,9 с интересным \r\nпланирововчным решением рассчитан на большую \r\nсемью. В доме расположены просторная кухня-гостиная с выходом на веранду, три просторные \r\nкомнаты, гардеробная и постирочная, а также \r\nпомещения санитарно-технического назначения.\r\n\r\nЭкспликация 1-го этажа\r\n01 Тамбур\r\n02 С\/у\r\n03 Кухня\r\n04 Гостиная\r\n05 Ванная\r\n06 Спальня\r\n07 Детская 1\r\n08 Детская 2\r\n09 Коридор",
"width":"8.15",
"length":"11.9"},
"images":[{"url":"qwgqwgqwgqwg"}]}
*/

function setProjectCart(project){
	if(project['data'] == null) 
		return document.location.href = `../../`;

	let images = new Array();
	images.push(project['data']['image']);

	for(var i = 0; i < project['images'].length; i++){
		images.push(project['images'][i]['url']);
	}
	var projectName = project['data']['name'];
	var projectPrice = project['data']['price'];
	var projectSquare = project['data']['square'];
	var projectLevels = project['data']['levels'];
	var projectDescription = project['data']['description'];
	var projectWidth = project['data']['width'];
	var projectLength = project['data']['length'];

	document.getElementById('projectName').innerHTML = projectName;
	document.getElementById('projectPrice').innerHTML = `${number_format(projectPrice)}₽`;

	document.getElementById('projectWidthLength').innerHTML = `${projectWidth}x${projectLength} м`;
	document.getElementById('projectSquare').innerHTML = `${projectSquare} м²`;
	document.getElementById('projectLevels').innerHTML = projectLevels;

	document.getElementById('projectDescription').innerHTML = projectDescription;
//number_format


//	alert(images);
	setCarouselImages(images);
	setAdditionImages(images);
}

function setAdditionImages(images){
	var result = "";
	for(var i = 0; i < images.length; i++){
		result += `<div class="col">
                      <span data-bs-target="#carouselId" data-bs-slide-to="${i}" ${i == 0 ? 'class="active"' : ""}>
                                      <img class="w-100 img-carusel" style="max-height: 119.78px;
    object-fit: cover;" src="${images[i]}" alt="">
                      </span> 
                    </div>`;
            //      alert(images[i]);
	}
	document.getElementById('carouseladditionimages').innerHTML = result;
}

function setCarouselImages(images){
	var result = "";
	for(var i = 0; i < images.length; i++){
		result += `<div class="carousel-item ${i == 0 ? 'active' : ""} " data-toggle="modal" data-target="#caruselModal">
                    <img  src="${images[i]}" class="d-block w-100 " alt="...">
                    <div class="carousel-caption d-none d-md-block">
                    </div>
                  </div>`;
                 // alert(images[i]);
	}
	result += `<button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev" style="">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Далее</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next" style="">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Назад</span>
                    </button>`;
	document.getElementById('carouselElement').innerHTML = result;
}

function projectBlockFill(count_max){
	var count = 0;
	var projectBlockElementContent = '';
	let jsonObjectParse = JSON.parse(projectsCatalogArray);
	if(count_max >= jsonObjectParse.length) {
		document.getElementById('btnMoreProjects').style.display = "none";
	}
	for (var i = 0; i < jsonObjectParse.length; i++) { 
		if(count >= count_max) break;
		if(jsonObjectParse[i]['image'] == null) continue;
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
	document.getElementById('projects_block').innerHTML = projectBlockElementContent;
}

function clickMoreProjects(){ 
	projectsCountMax += 9;
	projectBlockFill(projectsCountMax);
} 	

var fileName = 'file.file';
var inputElement = document.getElementById("inputFile");
//inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
	const fileList = this.files; /* now you can work with the file list */
	console.log(fileList);
	var file = this.files[0];
		//	console.log('Загрузка файла: ' + file['name'] + ' ' + file['size'] + ' ' + file['type']);

	var data = new FormData();
	data.append("inputfile", this.files[0], this.files[0]['name']);

	setFileNameText(this.files[0]['name']);
			
	fileName = this.files[0]['name'];

 	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
/*
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
			fileURL = jsonResponse['link'];
		}
		else {
			setFileUploadStatus(this.responseText);
		}
	}); */
	xhr.open("POST", "https://simprolitstroy.ru/api/input.php", true);   
	xhr.onload = function() {
		var responseBody = this.responseText;
		console.log(responseBody);
		setFileUploadStatus(this.responseText);
		var jsonResponse = JSON.parse(responseBody);
		setFileUploadedLink(jsonResponse['link']);
		fileURL = jsonResponse['link'];
	}
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.send(data); 
}  

/*
 	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open("GET", "https://simprolitstroy.ru/api/mysql/catalog_get.php?v="+Date());
	xhr.onload = function() {
	    projectsCatalogArray = this.responseText;
		projectBlockFill(projectsCountMax);
	}
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	xhr.send();
*/

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

/*
var x = 5.0364342423;
print(x.toFixed(1));
*/

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}
/*
function clickProject(name){
	var link = `${location.protocol}//${window.location.hostname}/${name}`;

	if(window.location.hostname == 'localhost'){
		link = `${window.location}${name}`;
	//	alert(link);
	}

	link = link.replace(' ','%20');
	location=link;
	document.location.href=link;
} 
*/
function clickProject(name){
	var link = `https://simprolitstroy.ru/${name}`;

/*	if(window.location.hostname == 'localhost'){
		link = `${window.location}${name}`;
	}*/

	link = link.replace(' ','%20');
	location=link;
	document.location.href=link;
} 
 
function createProject(id, name, image, price, square, levels, rooms, width, length){
	return `      <div class="col">
        
        <div class="card h-100" style="background: #FFFFFF;
        box-shadow: 0px 13px 26px rgba(0, 0, 0, 0.13);
        border-radius: 18px !important; border: none;">
    	 
			<a href="//${window.location.hostname + "/" + name}" style="display: contents;"> 
				<img src="${image}" loading="lazy" style="border-radius: 0px; height: 242px!important; object-fit: cover; cursor: pointer; border-top-left-radius: 20px; 
	    	border-top-right-radius: 20px;" alt="">
	    	</a>
        <div class="p-3">
          <span class="pb-3" style="font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-size: 25px;
          line-height: 30px;
          
          color: #383936;">${name}</span>

          <div class="row row-cols-2 p-3 gy-3 pb-4">
            <div class="col">
              <div class="row g-2">
                <div class="col-auto">
                  <img class="w-100" style="max-width:20px;" src="icons/размердома.svg" alt="">
                </div>
                <div class="col">
                  <span>Размеры: <br>${toFixed(parseFloat(width),1)}х${toFixed(parseFloat(length),1)} м</span>
                </div>
              </div>
              
             
            </div>
            <div class="col">
              <div class="row g-2">
                <div class="col-auto">
                  <img class="w-100" style="max-width:20px;" src="icons/этажей.svg" alt="">
                </div>
                <div class="col">
                  <span>Этажей: ${toFixed(parseFloat(levels),1)}</span>
                </div>
              </div>
             
        
       
            </div>
            <div class="col">
              <div class="row g-2">
                <div class="col-auto">
                  <img class="w-100" style="max-width:20px;" src="icons/площадь.svg" alt="">
                </div>
                <div class="col">
                  <span>Площадь: <br>${toFixed(parseFloat(square),1)} м²</span>
                </div>
              </div>
             
        
       
            </div>
           
          </div>
		<div class="w-100 text-center">
              <span class="w-100 text-center" style="font-family: 'Montserrat';
              font-style: normal;
              font-weight: 600;
              font-size: 19px;
              line-height: 23px;
              
              color: #6AA91B;"> 
              от ${number_format(price)} руб.
              </span>
          </div>
          
        </div>
        <a href="//${window.location.hostname + "/" + name}" class="p-4 text-center border-top border-1 border-success" style="text-decoration: none !important;">
        <span onclick="return clickProject('${name}');" class="text-center border-success" style="font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
       cursor: pointer;
        color: #6AA91B;
        ">Подробнее</span> </a>
        </div>
      </div>`;
}


function getGallery(){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open("GET", "https://simprolitstroy.ru/api/mysql/gallery_get.php", true);
	xhr.onload = function() {
		galleryArray = this.responseText;
		galleryBlockFill(galleryCountMax);
		galleryBlockMobFill(galleryCountMax);
	}
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	xhr.send();
}

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


function galleryBlockMobFill(count_max){
	var count = 0;
	var galleryBlockElementContent = '';
	let jsonObjectParse = JSON.parse(galleryArray);

	document.getElementById('galleryMobFirstBox').innerHTML = `<div class="col">
									                      	  <img class="w-100 rounded-4" src="${jsonObjectParse[0]['url']}" style="border-radius: 20px; height: 210px; object-fit: cover;">
										                    </div>
										                    <div class="col">
										                        <img class="w-100 rounded-4" src="${jsonObjectParse[1]['url']}" style="border-radius: 20px; height: 210px; object-fit: cover;">
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
		document.getElementById('btnMoreMobGallery').style.display = "none";
	}

	document.getElementById('galleryMobSecondBox').innerHTML = galleryBlockElementContent;
}

function clickMoreGallery(){  
	galleryCountMax += 4;
	galleryBlockFill(galleryCountMax);
	galleryBlockMobFill(galleryCountMax);
}
  
function number_format(n) {
	n += "";
	n = new Array(4 - n.length % 3).join("U") + n;
	return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}

/*
let quizArray = [
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Есть готовый проект?',
		responses: ['Да','Нет'] 
	},
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Когда планируете строительство?',
		responses: ['Через месяц','Через 3 месяца'],
	},
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Есть участок?',
		responses: ['Да','Нет'],
	},
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Сколько этажей хотите?',
		responses: ['1','2','3'],
	},
	{
		type: QUIZ_ASK_FORM,
		ask: 'Вопрос 1'
	}
];

const QUIZ_ASK_TEXT = 0;
const QUIZ_ASK_IMAGE = 1;
const QUIZ_ASK_FORM = 2;
*/

function quizLoad(page){
	quizPage = page;
	var elementQuizBlock = document.getElementById('quizBlock');
	if(quizArray[page]['type'] == QUIZ_ASK_TEXT)
		elementQuizBlock.innerHTML = createQuizPageText(page, quizArray[page]['ask'], quizArray[page]['responses']);
	if(quizArray[page]['type'] == QUIZ_ASK_IMAGE)
		elementQuizBlock.innerHTML = createQuizPageImage(page, quizArray[page]['ask'], quizArray[page]['responses'], quizArray[page]['images']);
	if(quizArray[page]['type'] == QUIZ_ASK_FORM)
		elementQuizBlock.innerHTML = createQuizPageForm(quizArray[page]['ask']);
	askNumSet(quizPage,quizArray.length);
}

function askNumSet(n,m){
	document.getElementById('askNum').innerHTML = `Вопрос ${n+1} из ${m}`;
	var progress = 100/m*(n+1);
	document.getElementById('quizProgressBar').style.width = `${progress}%`;
}

function nextPage(){
	quizLoad(quizPage+1);
}

function backPage(){
	quizLoad(quizPage-1);
}

function createQuizPageImage(page, ask, responsesArray, imagesArray){
	var result = `<h5 class="card-title text-right mt-4">${ask}</h5><div class="row row-cols-2 row-cols-sm-2 row-cols-xl-3 g-4 " style="display: flex;">`;
	for(var i = 0; i < responsesArray.length; i++)
		result += `<div class="col pt-4" style="cursor: pointer;" onclick="quizPushResponse(${page},'${responsesArray[i]}')">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="${imagesArray[i]}">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox" />
                                            <label for="checkbox"></label>
                                        </div>
                                        <span>${responsesArray[i]}</span>
                                    </div>
                                </div>`;

	result += `<div class="w-100" style="">`;
	if(page != 0){
		result += `
		<div class="row g-2">
		  <div class="col">
		    <button type="button" onclick="backPage();" class="w-100 btn-successs p-3 text-dark" style="background: #FFFFFF !important;
		    border-radius: 100px;">Назад</button>
		  </div>`;
	}
	result += `<div class="col">
	    <button type="button" onclick="nextPage();" class="w-100 p-3 btn-successs">Пропустить</button>
	  </div>
	</div>`;
	return result + `</div></div></div>`;  
}

function quizPushResponse(askid, response){
	quizRespons[askid] = response;
	nextPage();
}

function createQuizPageText(page, ask, responsesArray){// responses: ['Через месяц','Через 3 месяца'],
	var result = `<h5 class="card-title text-right mt-4">${ask}</h5>`;
	result += `<div class="row row-cols-1 row-cols-lg-2 g-3 mt-3 " style="display: flex;">`;
	for(var i = 0; i < responsesArray.length; i++){
		result += `<div class="col" onclick="quizPushResponse(${page},'${responsesArray[i]}')" style="cursor: pointer;">
										<div class="card-quizz h-100 ">
											<div class="h-100 align-middle p-2" style="display: inline-flex;
												align-items: center;">
												<img src="../images/check.png" class="img-fluid p-1" style="max-width: 60px; border-right: 10px solid #ffffff !important;" align="left" alt="">
												<h5 class="h-100 align-middle" style="display: inline-flex;
												align-items: center;">${responsesArray[i]}</h5>
											</div>
										</div> 
                                    </div>`;
	}

/*
<div class="card-quizz h-100 ">
	<div class="h-100 align-middle p-2" style="display: inline-flex;
		align-items: center;">
		<img src="images/check.png" class="img-fluid p-1" style="max-width: 60px; border-right: 10px solid #ffffff !important;" align="left" alt="">
		<h5 class="h-100 align-middle" style="display: inline-flex;
		align-items: center;">Да</h5>
	</div>
</div>
*/
	result += `<div class="w-100 mt-4" style="">`;
	if(page != 0){
		result += `
		<div class="row g-2">
		  <div class="col">
		    <button type="button" onclick="backPage();" class="w-100 btn-successs p-3 text-dark" style="background: #FFFFFF !important;
		    border-radius: 100px;">Назад</button>
		  </div>`;
	}
	result += `<div class="col">
	    <button type="button" onclick="nextPage();" class="w-100 p-3 btn-successs">Пропустить</button>
	  </div>
	</div>`;
	return result + `</div></div>`; 
}

function createQuizPageForm(ask){
	return `<div class="" style="display: block;">
                                    <h5 class="card-title text-right mt-4">${ask}</h5>
                            
                                    <div class="text-center p- ">
                                        <!--<span class=" h3 w-50 ">
                                            Просто прикрепите готовую смету и вы узнаете как сэкономить на постройке
                                        </span>
                            
                                        <p class="form-min-text mt-3  ">
                                            Инженер-сметчик рассчитает стоимость работ и материалов по оптовым ценам
                                        </p> -->
                                        <div class="row row-cols-2 row-cols-lg-4 g-4 mt-3 ">
                                            <div class="col" style="margin-top: 0px;">
                                                <div id="quizMessengerViber" class="contact-inactiv active h-100 " onclick="onClickQuizMessenger(this, MESSENGER_VIBER);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
																<div class="col-12">
																		<img class="img-fluid" src="../images/logos_whatsapp.png" alt="">
																</div>
																<div class="col-12">
																	<span>Viber</span>
																</div>
                                                        </div>

														
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col" style="margin-top: 0px;">
                                                <div id="quizMessengerWhatsApp" class="contact-inactiv h-100 " onclick="onClickQuizMessenger(this, MESSENGER_WHATSAPP);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
                                                            <div class="col-12">
                                                                <img class="img-fluid" src="../images/logos_whatsapp-1.png" alt="">
                                                            </div>
                                                            <div class="col-12">
                                                                <span>Whatsapp</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col" style="margin-top: 0px;">
                                                <div id="quizMessengerTelegram" class="contact-inactiv h-100 " onclick="onClickQuizMessenger(this, MESSENGER_TELEGRAM);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
                                                            <div class="col-12">
                                                                <img class="img-fluid" src="../images/logos_telegram.png" alt="">
                                                            </div>
                                                            <div class="col-12">
                                                                <span>Telegram</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col" style="margin-top: 0px;">
                                                <div id="quizMessengerPhone" class="contact-inactiv h-100" onclick="onClickQuizMessenger(this, MESSENGER_PHONE);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
                                                            <div class="col-12">
                                                                <img class="img-fluid" src="../images/Frame 11.png" alt="">
                                                            </div>
                                                            <div class="col-12">
                                                                <span>Телефон</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <label for="" class="form-label"></label>
                                            <input id="inputQuizPhone" type="tel" name="Phone" size="40" onfocus="hideMobFixedButtomButton();" onblur="showMobFixedButtomButton();" data-tilda-rule="phone" data-tilda-mask="+7(999) 999-9999" class="t-input form-control p-4"
                                                placeholder="Введите телефон">
                                        </div>
                                        <div class="">
                                            <label for="" class="form-label"></label>
                                            <input id="inputQuizName" type="name" class="t-input form-control p-4" onfocus="hideMobFixedButtomButton();" onblur="showMobFixedButtomButton();" name="" id="" aria-describedby="emailHelpId"
                                                placeholder="Введите имя">
                                        </div>
                                        <button onclick="onClickSendQuiz();" class="btn-successs w-100 p-4 mt-3 text-light">Получить расчёт</button>
                                    </div>
                                </div>`;
}