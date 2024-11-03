<!DOCTYPE html>
<html lang="ru">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
   <link rel="stylesheet" href="./css/style.css">
   <title>Календарь</title>
   <meta name="description" content="Календарь задач для организации">
   <meta property="og:site_name" content="Календарь задач">
   <meta property="og:title" content="Календарь задач для организаций">
</head>

<body>
   <header>
      <nav>
         <ul class="nav-items menu-left">
            <li class="nav-item"><a href="#">Главная</a></li>
            <li class="nav-item"><a href="#">Календарь</a></li>
            <li class="nav-item"><a href="#">График смен</a></li>
         </ul>
         <ul class="nav-items menu-right">
            <li>
               <div class="user-name">
                  <p>Иван Иванов</p>
                  <P>ivanov@kv-pol.ru</P>
               </div>
            </li>
            <li class="nav-item user-avatar"><a href="#" class="fa-regular fa-user fa-2xl"></a></li>
         </ul>
      </nav>
   </header>
   <main>
      <div class="conteiner">
         <div class="left">
            <div class="calendar">
               <div class="month">
                  <i class="fa fa-angle-left prev"></i>
                  <div class="date"></div>
                  <i class="fa fa-angle-right next"></i>
               </div>
               <div class="weekdays">
                  <div>пн</div>
                  <div>вт</div>
                  <div>ср</div>
                  <div>чт</div>
                  <div>пт</div>
                  <div>сб</div>
                  <div>вс</div>
               </div>
               <div class="days">
                  <!-- вставим через js -->
               </div>
               <div class="goto-today">
                  <div class="goto">
                     <input type="text" placeholder="мм/гггг" class="date-input">
                     <button class="goto-btn">перейти</button>
                  </div>
                  <button class="today-btn">сегодня</button>
               </div>
            </div>
         </div>
         <div class="right">
            <div class="today-date">
               <div class="event-day"></div>
               <div class="event-date"></div>
            </div>
            <div class="events">
               <!-- всавляем через js -->
            </div>
            <div class="add-event-wrapper">
               <div class="add-event-header">
                  <div class="title">Добавить задачу</div>
                  <i class="fas fa-times close"></i>
               </div>
               <div class="add-event-body">
                  <div class="add-event-input">
                     <input type="text" placeholder="Название задачи" class="event-name" />
                  </div> 
                  <div class="add-event-input">
                     <input type="text" placeholder="Начальное время" class="event-time-from" />
                  </div> 
                  <div class="add-event-input">
                     <input type="text" placeholder="Время окончания" class="event-time-to" />
                  </div>  
               </div>
               <div class="add-event-footer">
                  <button class="add-event-btn">Добавить задачю</button>
               </div>
            </div>
         </div>
         <button class="add-event">
            <i class="fas fa-plus"></i>
         </button>
      </div>
   </main>

<script src="js/main.js"></script>
</body>

</html>