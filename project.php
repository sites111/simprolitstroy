<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="https://static.tildacdn.info/tild3234-3161-4562-a330-323865646436/ant-design_home-outl.svg" type=" image/svg+xml">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <title><?php echo $_GET['name']; ?></title>
    <style>
      .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
        max-width: 1190px !important;
      } 
    </style>
    <style>
                    .namer, .number {
                        color: #000;
                        border: 1px solid #ffffff;
                        background-color: #fff;
                        border-radius: 20px;
                        -moz-border-radius: 20px;
                        -webkit-border-radius: 20px;
                        font-size: 16px;
                        font-weight: 400;
                        height: 78px;
                        padding-left: 25px;
                        font-family: 'Montserrat';
                        width: 100%;
                    }

                    .namer:focus, .number:focus {
                        outline: none;
                    }

                    .miniformbutton {
                        color: #fff;
                        background-color: #8ed834;
                        border-radius: 67px;
                        font-family: Montserrat;
                        font-weight: 500;
                        font-size: 14px;
                        width: 295px;
                        height: 78px;
                        border: none;
                    }

                    .headleadmini {
                        font-family: 'Montserrat';
                    }
                </style>
    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/simprolitstroy.js?v=<?php echo filectime('js/simprolitstroy.js'); ?>" charset="utf-8" async>
    </script>
</head>
<body> 
<?php
  include 'layouts/header_page.php';
?>


  

    <div class="container mt-4">
        <div class="row row-cols-1  row-cols-sm-1 row-cols-md-2 gy-5 ">
            <div class="col">
              <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
             
                <div id="carouselElement" class="carousel-inner" role="listbox" style="border-radius: 15px;" >
                  <!--
                  <div class="carousel-item" data-toggle="modal" data-target="#caruselModal">
                    <img  src="https://фабрика-каркасов.рф/wp-content/uploads/2022/04/gelenjik01-600x338.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                      
                    </div>
                  </div>
                  <div class="carousel-item" data-toggle="modal" data-target="#caruselModal">
                    <img src="https://фабрика-каркасов.рф/wp-content/uploads/2022/01/modern38_min.jpg" class="d-block w-100 " alt="...">
                    <div class="carousel-caption d-none d-md-block">
                      
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev" style="">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Далее</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next" style="">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Назад</span>
                    </button> -->
                </div>
               
        <!-- Modal -->
<div class="modal fade" id="caruselModal" tabindex="-1" aria-labelledby="caruselModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    
        <button type="button" class="btn close" data-dismiss="modal" aria-label="Close" style="position: absolute; font-size: 50px; margin-left: 20px;">
          <span aria-hidden="true">&times;</span>
        </button>
        <img class="w-100" src="https://фабрика-каркасов.рф/wp-content/uploads/2022/01/modern38_min.jpg" alt="">
      
    
  </div>
</div>
            
                  <div class="row row-cols-3 mt-1 g-3 " id="carouseladditionimages">
                    <!--<div class="col">
                      <span data-bs-target="#carouselId" data-bs-slide-to="0" class="active">
                                      <img class="w-100 img-carusel" src="https://фабрика-каркасов.рф/wp-content/uploads/2022/02/flat_ekp_17.jpg" alt="">
                      </span> 
                    </div>
                    
                    <div class="col">
                      <span data-bs-target="#carouselId" data-bs-slide-to="1">
                          <img class="w-100 img-carusel" src="https://фабрика-каркасов.рф/wp-content/uploads/2022/04/gelenjik01-600x338.jpg" alt="">
                        </span>
                    </div>
            
                    <div class="col">
                      <span data-bs-target="#carouselId" data-bs-slide-to="2">
                          <img class="w-100 img-carusel" src="https://фабрика-каркасов.рф/wp-content/uploads/2022/01/modern38_min.jpg" alt="">
                        </span> 
                    </div>

                    <div class="col">
                      <span data-bs-target="#carouselId" data-bs-slide-to="3">
                          <img class="w-100 img-carusel" src="https://фабрика-каркасов.рф/wp-content/uploads/2022/01/modern38_min.jpg" alt="">
                        </span> 
                    </div>

                    <div class="col">
                      <span data-bs-target="#carouselId" data-bs-slide-to="4">
                          <img class="w-100 img-carusel" src="https://фабрика-каркасов.рф/wp-content/uploads/2022/01/modern38_min.jpg" alt="">
                        </span> 
                    </div>
                  -->
                  </div>
              </div>
            </div>

            <div class="col">
                <span class="h2" id="projectName"></span>
                <br> <br>
                <span class="h4 text-secondary">
                    Стоимость проекта от:
                </span>
                <br>
                <span class="h1" id="projectPrice"></span>
                <br>
                <button class="mt-3 p-3 btn-successs" onclick="modalSow('Заинтересовал проект <?php echo $_GET['name']; ?>?');"><span style=" padding-left: 20px;
                  padding-right: 20px;"> Заказать обратный звонок</span></button>
                <div class="row row-cols-1 row-cols-md-3 g-2 mt-3">
                    <div class="col">
                      <div class="card rounded-3  h-100">
                        <div class="card-body">
                          <h5 class="card-title" id="projectWidthLength">71</h5>
                          <p class="card-text">Размеры</p>
                        </div>
                      </div>
                    </div>

                    <div class="col">
                        <div class="card rounded-3  h-100">
                          <div class="card-body">
                            <h5 class="card-title" id="projectSquare">71 м²</h5>
                            <p class="card-text">Площадь</p>
                          </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card rounded-3   h-100">
                          <div class="card-body">
                            <h5 class="card-title" id="projectLevels">71</h5>
                            <p class="card-text">Этажей</p>
                          </div>
                        </div>
                    </div>

                    <span class="h2">
                        Описание
                    </span>      
                </div>

                <span id="projectDescription">
                    Проект «Flat house» с эксплуатируемой кровлей.

                    Общая площадь71,5 м2
                    Жилая площадь59,18 м2
                    Этажей1
                    Гостиная25,86 м2
                    Кухня-столовая14,33 м2
                    Спальня11,31 м2
                    Крыльцо5,73 м2
                    Санузел5,29
                </span>

                <br><br>

                <span class="h2 " style="display: none;"> 
                    В стоимость входит:
                </span>
                <br>
                <span style="display: none;">
                    Каркас внешних стен в соответствии с СП 260.1325800.2016
                    Каркас внутренних перегородок
                    Каркас стропильной системы
                    Крепеж для сборки
                    Перечень отделочных материалов с объемами
                </span>
        </div>
    </div>
</div>



<div class="container mt-4 ">
  <h1 class="f pb-4">Проекты</h1>
 
  <div id="projects_block" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col">
        
        <div class="card " style="background: #FFFFFF;
        box-shadow: 0px 13px 26px rgba(0, 0, 0, 0.13);
        border-radius: 18px !important; border: none;">
        <img src="image 13.png" style="border-radius: 18px;" alt="">
        <div class="p-3">
          <span class="pb-3" style="font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-size: 25px;
          line-height: 30px;
          
          color: #383936;">“Дом”</span>

          <div class="row row-cols-2 p-3 gy-3 pb-4">
            <div class="col">
              <div class="row g-2">
                <div class="col-auto">
                  <img class="w-100" style="max-width:20px;" src="icons/размердома.svg" alt="">
                </div>
                <div class="col">
                  <span>Размеры: 16х12</span>
                </div>
              </div>
              
             
            </div>
            <div class="col">
              <div class="row g-2">
                <div class="col-auto">
                  <img class="w-100" style="max-width:20px;" src="icons/этажей.svg" alt="">
                </div>
                <div class="col">
                  <span>Этажей: 6</span>
                </div>
              </div>
             
        
       
            </div>
            <div class="col">
              <div class="row g-2">
                <div class="col-auto">
                  <img class="w-100" style="max-width:20px;" src="icons/площадь.svg" alt="">
                </div>
                <div class="col">
                  <span>Площадь: 128.4 м²</span>
                </div>
              </div>
             
        
       
            </div>
           
          </div>
          <span style="font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-size: 19px;
          line-height: 23px;
          
          color: #6AA91B;"> 
          от 5 000 000 руб.
          </span>
          
        </div>
        <span class="p-4 text-center border-top border-2 border-success" style="font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        border-top: 1px solid #6AA91B !important;
        line-height: 24px;
       
        color: #6AA91B;
        ">Подробнее</span>
        </div>
      </div>
        
</div>


      
  </div>
  <div class="w-100 pt-4 mx-auto d-flex justify-content-center pb-4">
      <button id="btnMoreProjects" onclick="return clickMoreProjects();" class="btn-successs p-4" style=""><span class="w-100 f " style=" padding-left: 50px;
        padding-right: 50px;">СМОТРЕТЬ ЕЩЕ</span></button>
  </div>
</div> 

      <?php include "layouts/footer.php"; ?>

      <div class="modal fade" id="formModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered " style="max-width: 700px !important; ">
            <div class="modal-content text-center p-2 w-100 pb-4"  style="max-width: 700px !important; border-radius: 20px;">
             
                

                <div class="">
                    <button type="button" class="close w-100 text-right p-3 " data-dismiss="modal" onclick="$('#formModal').modal('hide');" style="text-align: right; max-height: 0px; margin-top: -20px !important; background: none; border: none;">

                        <span aria-hidden="true" style=" font-size: 50px !important;">&times;</span>
                    </button>
                <h1 class="text-center w-100 mt-1 " id="formModalLabel">Оставьте свои контакты</h1>
                
                </div>
                <span class="mt-2 h5"><b>Оставьте контакты</b> и мы с вами свяжемся</span>
               
                <div class="modal-body p-4 mt-3">
                    <div class="row row-cols-1 rol-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3 pb-4" style="justify-content: center;">
                        <div class="col col-lg-12">
                            <input id="inputFormName" onfocus="hideMobFixedButtomButton();" onblur="showMobFixedButtomButton();" class="namer" type="text" placeholder="Ваше имя" size="40" style="box-shadow: 0px 13px 17px rgba(0, 0, 0, 0.04);
                            border-radius: 20px;">
                        </div> 
                        <div class="col col-lg-12">
                            <input id="inputFormPhone" onfocus="hideMobFixedButtomButton();" onblur="showMobFixedButtomButton();" class="number" type="tel" name="Phone" placeholder="Ваш номер" size="40" data-tilda-rule="phone" data-tilda-mask="+7(999) 999-9999" style="box-shadow: 0px 13px 17px rgba(0, 0, 0, 0.04);
                            border-radius: 20px;">
                        </div>
                    </div>
                    <span class="p-3 mt-3 h5">Удобный способ связи</span>
                    <div class="row row-cols-2 row-cols-lg-4 g-4 mt-1 ">
                        
                        <div class="col">
                            <div id="formMessengerViber" class="contact-inactiv active h-100 " onclick="onClickFormMessenger(this, MESSENGER_VIBER);" style="cursor: pointer;">
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
                            <div id="formMessengerWhatsApp" class="contact-inactiv h-100 " onclick="onClickFormMessenger(this, MESSENGER_WHATSAPP);" style="cursor: pointer;">
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
                            <div id="formMessengerTelegram" class="contact-inactiv h-100 " onclick="onClickFormMessenger(this, MESSENGER_TELEGRAM);" style="cursor: pointer;">
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
                            <div id="formMessengerPhone" class="contact-inactiv h-100 " onclick="onClickFormMessenger(this, MESSENGER_PHONE);" style="cursor: pointer;">
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
                    
                        <div class="text-center mt-4">
                            <button class="miniformbutton" onclick="return onClickSendModal();" type="submit">Отправить данные</button>
                           
                        </div>
                  
                </div>
                
            </div>
            </div>
        </div>
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="newleadModalLabelSuccess" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered " style="max-width: 700px !important; ">
                <div class="modal-content text-center p-2 w-100"  style="max-width: 700px !important; border-radius: 20px;">
                    <div class=""> 
                        <button type="button" class="close w-100 text-right p-3 pb-3 " data-dismiss="modal" onclick="$('#successModal').modal('hide');" style="text-align: right; max-height: 50px; margin-top: -10px !important; background: none; border: none;">
                            <span aria-hidden="true" style=" font-size: 50px !important;">&times;</span>
                        </button>
                        <h1 class="modal-title text-center w-100 mt-3 " id="newleadModalLabelSuccess">Заявка успешно отправлена</h1>
                    </div>
                    <span class="mt-2 h5" style="padding-bottom: 50px;">Ожидайте, скоро мы с вами свяжемся</span>
                </div>
            </div>
        </div>

<div class="mob-center fixed-bottom d-block d-sm-none" style=" z-index:10000; ">

                <div id="mobFixedBottomsPhoneWhatsApp" class="row g-1 p-2" style="display: none!important">
                   <div class="col">
                       <a href="tel:+7 (843) 212 61-77">
                       <img  class="w-100" href src="images/ws.svg" alt="" style="filter: drop-shadow(0px 11px 22px rgba(0, 0, 0, 0.4));">
                       </a>
                    </div>
                   <div class="col">
                    <a href="whatsapp://send?phone=78432126177">
                       <img  class="w-100" src="images/call.svg" alt="" style="filter: drop-shadow(0px 11px 22px rgba(0, 0, 0, 0.4));">
                    </a>
                    </div>

                </div>    

            </div>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <script>
      getProject('<?php echo $_GET['name']; ?>');
      getCatalogProjects();
    </script>
</body>
</html>