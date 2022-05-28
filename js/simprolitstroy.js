var projectsCountMax = 3;
var projectsCatalogArray = null;

var galleryCountMax = 2+4;
var galleryArray = null;

var fileURL = null;

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
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Есть готовый проект?',
		responses: ['Да','Нет']
	},
	{
		type: QUIZ_ASK_IMAGE,
		ask: 'Когда планируете строительство?',
		responses: ['Через месяц','Через 3 месяца'],
		images: [null,null]
	},
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Есть участок?',
		responses: ['Да','Нет']
	},
	{
		type: QUIZ_ASK_TEXT,
		ask: 'Сколько этажей хотите?',
		responses: ['1','2','3']
	},
	{
		type: QUIZ_ASK_FORM,
		ask: 'Вопрос 1'
	}
];

/*
alert(`Вопрос 1/1: ${quizArray[1]['ask']}`);
alert(`Ответ ${quizArray[1]['responses'][2]}`);
*/

getCatalogProjects();
getGallery();
quizLoad(0);

function sendAmoCRM(phone, name, comment){
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

function generateComment(){
	var result = `Заполнена форма: ${formName}`;
	result += `
	Удобный способ связи: `;
	if(messenger == MESSENGER_PHONE) result += "позвоните";
	if(messenger == MESSENGER_VIBER) result += "напишите на Viber";
	if(messenger == MESSENGER_TELEGRAM) result += "напишите в Telegram";
	if(messenger == MESSENGER_WHATSAPP) result += "напишите на WhatsApp";
	if(fileURL != null) result += `
		Прикрепленный файл: ${fileURL}`;
	return result;
}

function onClickGetSmeta(){
	formName = "Пересчёт сметы";
	var phoneElement = document.getElementById('inputSmetaPhone');
	var nameElement = document.getElementById('inputSmetaName');

	var phone = phoneElement.value;
	var name = nameElement.value; 

	var comment = generateComment();

	sendAmoCRM(phone, name, comment);

	phoneElement.value = "";
	nameElement.value = "";

	document.getElementById('fileName').innerHTML = cropTextFile("Прикрепить файл");
	fileName = null;
	fileURL = null;
}

function onClickSendQuiz(){
	formName = "Квиз";
	var phoneElement = document.getElementById('inputQuizPhone');
	var nameElement = document.getElementById('inputQuizName');

	var phone = phoneElement.value;
	var name = nameElement.value; 

	var comment = generateComment();

	sendAmoCRM(phone, name, comment);

	phoneElement.value = "";
	nameElement.value = "";
}

function onClickSendFormIpoteka(){
	formName = "Дом в ипотеку";
	var phoneElement = document.getElementById('inputIpotekaPhone');
	var nameElement = document.getElementById('inputIpotekaName');
	var phone = phoneElement.value;
	var name = nameElement.value;
	var comment = generateComment();

	sendAmoCRM(phone, name, comment);

	phoneElement.value = "";
	nameElement.value = "";
}

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
			    fileURL = jsonResponse['link'];
		//	    alert(fileURL);
			  }
			  else {
			    setFileUploadStatus(this.responseText);
			  }
			}); 
			xhr.open("POST", "https://simprolitstroy.ru/api/input.php"); 
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
													<div class="pt-2"><img class="icon" src="resize2.svg">Этажей: ${levels}</div>
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
		galleryBlockMobFill(galleryCountMax);
	  }
	});
	xhr.open("GET", "../api/mysql/gallery_get.php");
	xhr.send(data);
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
//	alert(quizArray[page]['responses']);
	var elementQuizBlock = document.getElementById('quizBlock');
	if(quizArray[page]['type'] == QUIZ_ASK_TEXT)
		elementQuizBlock.innerHTML = createQuizPageText(quizArray[page]['ask'], quizArray[page]['responses']);
	if(quizArray[page]['type'] == QUIZ_ASK_IMAGE)
		elementQuizBlock.innerHTML = createQuizPageImage(quizArray[page]['ask'], quizArray[page]['responses']);
	if(quizArray[page]['type'] == QUIZ_ASK_FORM)
		elementQuizBlock.innerHTML = createQuizPageForm();
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

function createQuizPageImage(ask, responsesArray){
	return `<h5 class="card-title text-right mt-4">${ask}</h5><div class="row row-cols-2 row-cols-sm-2 row-cols-xl-3 g-4 " style="display: flex;">
                                <div class="col pt-4">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="images/Subtract (1).png">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox" />
                                            <label for="checkbox"></label>
                                        </div>
                                        <span>Дом из блоков</span>
                                    </div>
                                </div>
                                <div class="col pt-4">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="images/Subtract (1).png">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox2" />
                                            <label for="checkbox2"></label>
                                        </div>
                                        <span>Дом из блоков</span>
                                    </div>
                                </div>
                                <div class="col pt-4">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="images/Subtract (1).png">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox3" />
                                            <label for="checkbox3"></label>
                                        </div>
                                        <span>Дом из блоков</span>
                                    </div>
                                </div>
                                <div class="col pt-4">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="images/Subtract (1).png">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox4" />
                                            <label for="checkbox4"></label>
                                        </div>
                                        <span>Дом из блоков</span>
                                    </div>
                                </div>
                                <div class="col pt-4">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="images/Subtract (1).png">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox5" />
                                            <label for="checkbox5"></label>
                                        </div>
                                        <span>Дом из блоков</span>
                                    </div>
                                </div>
                                <div class="col pt-4">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                        <img class="w-100" src="images/Subtract (1).png">
                                        <div class="round pb-2">
                                            <input type="checkbox" id="checkbox6" />
                                            <label for="checkbox6"></label>
                                        </div>
                                        <span>Дом из блоков</span>
                                    </div>
                                </div>
                                <div class="w-100" style="">
                                    <button type="button" onclick="backPage();" class="btn btn-light p-3 " style="background: #FFFFFF;
                                                                            border-radius: 100px;"><span style="font-family: 'Montserrat';
                                                font-style: normal;
                                                font-weight: 400;
                                                font-size: 15px;
                                                line-height: 18px;
                                                text-align: center;
                                                padding-right: 25px;
                                                padding-left: 25px;
                                                color: #000000;">Назад</span> </button>
                                    <button type="button" onclick="nextPage();" class="btn btn-light p-3" style="background: #8ED834;
                                                     border-radius: 100px;"><span style="font-family: 'Montserrat';
                                                font-style: normal;
                                                font-weight: 400;
                                                font-size: 15px;
                                                line-height: 18px;
                                                text-align: center;
                                                padding-right: 40px;
                                                padding-left: 40px;
                                                color: #ffffff;">Далее</span> </button>
                                </div>
                            
                            </div>
                            </div>`;
}

function createQuizPageText(ask, responsesArray){// responses: ['Через месяц','Через 3 месяца'],
	var result = `<h5 class="card-title text-right mt-4">${ask}</h5>`;
	result += `<div class="row row-cols-1 row-cols-lg-2 g-3 mt-3 " style="display: flex;">`;
	for(var i = 0; i < responsesArray.length; i++){
		result += `<div class="col" onclick="alert('1')" style="cursor: pointer;">
                                        <div class="card-quizz h-100 ">
                                            <div class="card-body ">
                                                <img src="images/check.png" class="img-fluid"
                                                    style="max-width: 60px; border-right: 10px solid #ffffff !important;" align="left" alt="">
                                                <h5 class="">${responsesArray[i]}</h5>
                                            </div>
                                        </div>
                                    </div>`;
	}
	return result + `<div class="w-100 mt-4" style="">
                                        <button type="button" onclick="backPage();" class="btn btn-light p-3 " style="background: #FFFFFF;
                                                                            border-radius: 100px;"><span style="font-family: 'Montserrat';
                                                font-style: normal;
                                                font-weight: 400;
                                                font-size: 15px;
                                                line-height: 18px;
                                                text-align: center;
                                                padding-right: 25px;
                                                padding-left: 25px;
                                                color: #000000;">Назад</span> </button>
                                        <button type="button" onclick="nextPage();" class="btn btn-light p-3" style="background: #8ED834;
                                                     border-radius: 100px;"><span style="font-family: 'Montserrat';
                                                font-style: normal;
                                                font-weight: 400;
                                                font-size: 15px;
                                                line-height: 18px;
                                                text-align: center;
                                                padding-right: 40px;
                                                padding-left: 40px;
                                                color: #ffffff;">Далее</span> </button>
                                    </div>
                            
                                </div>`;
}


function createQuizPageForm(){
	return `<div class="" style="display: block;">
                                    <h5 class="card-title text-right mt-4">Куда вам отправить предварительный расчёт?</h5>
                            
                                    <div class="text-center p- ">
                                        <!--<span class=" h3 w-50 ">
                                            Просто прикрепите готовую смету и вы узнаете как сэкономить на постройке
                                        </span>
                            
                                        <p class="form-min-text mt-3  ">
                                            Инженер-сметчик рассчитает стоимость работ и материалов по оптовым ценам
                                        </p> -->
                                        <div class="row row-cols-2 row-cols-lg-4 g-4 mt-3 ">
                                            <div class="col">
                                                <div class="contact-inactiv active h-100 " onclick="onClickMessenger(MESSENGER_VIBER);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
																<div class="col-12">
																		<img class="img-fluid" src="images/logos_whatsapp.png" alt="">
																</div>
																<div class="col-12">
																	<span>Viber</span>
																</div>
                                                        </div>

														
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="contact-inactiv h-100 " onclick="onClickMessenger(MESSENGER_WHATSAPP);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
                                                            <div class="col-12">
                                                                <img class="img-fluid" src="images/logos_whatsapp-1.png" alt="">
                                                            </div>
                                                            <div class="col-12">
                                                                <span>Whatsapp</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="contact-inactiv h-100 " onclick="onClickMessenger(MESSENGER_TELEGRAM);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
                                                            <div class="col-12">
                                                                <img class="img-fluid" src="images/logos_telegram.png" alt="">
                                                            </div>
                                                            <div class="col-12">
                                                                <span>Telegram</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="contact-inactiv h-100 " onclick="onClickMessenger(MESSENGER_PHONE);" style="cursor: pointer;">
                                                    <div class="card-body text-center">
                                                        <div class="row g-2">
                                                            <div class="col-12">
                                                                <img class="img-fluid" src="images/Frame 11.png" alt="">
                                                            </div>
                                                            <div class="col-12">
                                                                <span>Телефон</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-1">
                                            <label for="" class="form-label"></label>
                                            <input id="inputQuizPhone" type="email" class="form-control p-4" name="" id="" aria-describedby="emailHelpId"
                                                placeholder="Введите телефон">
                                        </div>
                                        <div class="mb-1">
                                            <label for="" class="form-label"></label>
                                            <input id="inputQuizName" type="name" class="form-control p-4" name="" id="" aria-describedby="emailHelpId"
                                                placeholder="Введите имя">
                                        </div>
                                        <button onclick="onClickSendQuiz();" class="btn btn-success w-100 p-4 mt-4">Получить расчёт</button>
                                    </div>
                                </div>`;
}