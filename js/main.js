const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const dayNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

// Массив задач по умолчанию
/* const eventsArr = [
  {
    day: 31,
    month: 10,
    year: 2024,
    events: [
      {
        title: "Задача 1 доделать наконецто этот календарь",
        time: "10:00",
      },
      {
        title: "Задача 2 Сделал дело гуляй спать",
        time: "11:00",
      },
    ],
  },
  {
    day: 2,
    month: 11,
    year: 2024,
    events: [
      {
        title: "Задача 3 доделать наконецто этот календарь",
        time: "10:00",
      },
      {
        title: "Задача 3 Сделал дело гуляй спать",
        time: "11:00",
      },
    ],
  },
]; */
// добавим пустой массив задач
let eventsArr = [];
// затем вызовем функцию вставить задачи
getEvents();

// функция последних дней предыдущего месяца

function initCalendar() {
  const firstDay = new Date(year, month, 0);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 8 - lastDay.getDay() - 1;

  // вставим месяц и год в шапку календаря
  date.innerHTML = months[month] + " " + year;

  // вставим дни в dom

  let days = " ";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
  }

  // Счетчик дней в месяце
  for (let i = 1; i <= lastDate; i++) {
    // проверим присутствует ли задачи в текущем дне
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    // если дата совпадает с сегодняшним днем то добавляем класс today
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      // если задачи нашлись то всгда добавлять класс
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event" >${i}</div>`;
      } else {
        days += `<div class="day" >${i}</div>`;
      }
    }
  }

  // Дни следующего месяца
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date" >${j}</div>`;
  }

  daysContainer.innerHTML = days;
  // добавим слушатель событий после инициализации календаря
  addListner();
}

initCalendar();

// Предыдущий месяц
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// следующий месяц
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// добавим слушателей на кнопки перелистывания месяцев
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// добавим слушатель на кнопку "сегодня" и повесим функцию на нее по клику

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");
addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});
// закрыть по нажатию вне окнна
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

// ограничим название 50 символами
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// отформатируем данные в полях время начала и окончания задачи
addEventFrom.addEventListener("input", (e) => {
  // уберем все кроме чисел и знака:
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  // после добавления двух цифр автоматически добавим :
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  // не дадим пользователю вести более 5 символов
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});
addEventTo.addEventListener("input", (e) => {
  // уберем все кроме чисел и знака:
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  // после добавления двух цифр автоматически добавим :
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  // не дадим пользователю вести более 5 символов
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// давайте создадим функцию добавлеия слушателя дней после формирования календаря

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      // установим текущий день в качестве активного
      activeDay = Number(e.target.innerHTML);

      // удалить активный из уже активного дня.
      days.forEach((day) => {
        day.classList.remove("active");
        //вызовем   активный день после клика
        getActiveDay(e.target.innerHTML);
        updateEvents(Number(e.target.innerHTML));
      });
      // если день из предыдущего месяца то преходим на предыдущий месяц
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          // выбрать все дни из редыдущего месяца
          const days = document.querySelectorAll(".day");
          // после перехода на предыдущий месяц добавляем актив на кликнутый день
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
      getActiveDay(e.target.innerHTML);
    });
  });
}

// Давайте сделаем дату вверху у активного дня

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.getDay();
  eventDay.innerHTML = dayNames[dayName];
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// напишем функцию вывода задач в активном дне
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    // возьмем задачи только для выделенного дня
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      // выведем задачи на экран
      event.events.forEach((event) => {
        events += `
        <div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  // если ничего не найдено
  if (events === "") {
    events = `<div class="no-event">
            <h3>Нет задач,<br> ты свободен!</h3>
           
        </div>`;
  }
  // console.log(events);
  eventsContainer.innerHTML = events;
  // сохранить задачи после обновления страницы
  saveEvents();
}

// напишем вункцию добавления задач
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  // небольшая проверка на наличие контента
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Пожалуйста заполните все поля!");
    return;
  }
  // принимает шаблон и делит эту строку на упорядоченный список подстрок, выполняя поиск по шаблону, помещает эти подстроки в массив и возвращает массив.
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Не правильный формат времени");
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + eventTimeTo,
  };

  let eventAdded = false;
  // проверьте, не являются ли "Задача" пустой
  if (eventsArr.length > 0) {
    // если в текущем дне уже есть какое-либо событие, то добавьте это
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  // если массив событий пуст или в текущем дне нет события, создайте новое
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  // удалить актив из формы добавления события
  addEventContainer.classList.remove("active");
  // Очистить поля
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";

  //Показать текущие добавленные задачи
  updateEvents(activeDay);

  // показать наличие задачь после добавления на днях в календаре
  const activeDayElem = document.querySelector(".day.active");
  if (!activeDayElem.classList.contains("event")) {
    activeDayElem.classList.add("event");
  }
});

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

//  добавим функцию исключения задачи после нажатия

eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;
    // получите название Задачи, затем выполните поиск в массиве по названию и удалите
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            event.events.splice(index, 1);
          }
        });
        // если в этой дате не осталось событий то удаляется весь сонтейнер
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          // после удаления всех задач всегда убирать класс "Задач" у этого дня
          const activeDayElem = document.querySelector(".day.active");
          if (activeDayElem.classList.contains("event")) {
            activeDayElem.classList.remove("event");
          }
        }
      }
    });
    // после очистки списка задач обновим поле задач
    updateEvents(activeDay);
  }
});
// Напишем функцию которая позволяет сохранять события в локальном хранилище и получать их оттуда
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}
