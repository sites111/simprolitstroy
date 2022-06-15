<div class="header bg-dark" style="background-image: url(bg.png)  ">
  <?php
    include 'header.php';
  ?>
  <?php
    include 'menu_desctop.php';
  ?>
  <!-- мобильное -->
  <div class="container mt-2 pb-2 d-block d-sm-none">
    <div class="row">
      <div class="col text-light">
        <button type="button" class=" text-light border-0 bg-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <div class="row g-2">
            <div class="col">
              <span class="h2">
              МЕНЮ
              </span>
            </div>
            <div class="col-auto">
              <img class="pt-1" style="max-width: 25px; transform: rotate (180deg) !important;" src="ant-design_lerft-outl1.svg" alt="">
            </div>
          </div>
        </button>
      </div>
      <div class="col text-light d-flex justify-content-end">
        <button type="button" class=" text-light border-0 bg-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          <div class="row g-2">
            <div class="col-auto">
              <img class="pt-1" style="max-width: 25px" src="ant-design_left-outl.svg" alt="">
            </div>
            <div class="col">
              <span class="h2">
              УСЛУГИ
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
  <!-- Button trigger modal --> 
  <!-- Modal --> 
  <?php
    include 'menu_mobile.php';
    ?>
</div>