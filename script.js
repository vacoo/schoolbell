$(document).ready(function () {
  var select = document.createElement("select");

  for (var key in modes) {
    var option = document.createElement("option");
    option.value = modes[key].name;
    option.innerText = modes[key].name;
    select.appendChild(option);
  }

  var mode = document.getElementById("mode");
  mode.appendChild(select);

  // Проверка расписания
  var item = null;

  setInterval(() => {
    let nowDate = new Date();
    let time = nowDate.toLocaleString().slice(12, 20);

    if (item === null) {
      var mode = modes.find(mode => mode.name === select.value);

      var dayList = mode.table[nowDate.getDay()];

      for (let key in dayList) {
        if (dayList[key].start <= time && dayList[key].end >= time) {
          item = dayList[key];
          $("#bell")[0].play();
          $("#alert").text("Звонок!")
        }
      }
    } else {
      if (item.end >= time) {
        $("#bell")[0].play();
      } else {
        $("#alert").text("-");

        $("#bell")[0].pause();
        $("#bell")[0].currentTime = 0;

        item = null;
      }
    }

  }, 1000);


  // Часы
  setInterval(() => {
    function getWeekDay(day) {
      switch (day) {
        case 0:
          return "Воскресение";
        case 1:
          return "Понедельник";
        case 2:
          return "Вторник";
        case 3:
          return "Среда";
        case 4:
          return "Четверг";
        case 5:
          return "Пятница";
        case 6:
          return "Суббота";
      }
    }

    let nowDate = new Date();
    $("#time").text(nowDate.toLocaleString());

    var table = document.createElement("table");

    var mode = modes.find(mode => mode.name === select.value);

    for (let key in mode.table) {

      var dividerTr = document.createElement("tr");
      var dividerTd = document.createElement("td");
      dividerTd.colSpan = 2;

      dividerTd.innerHTML = "<b>" + getWeekDay(Number(key)) + "</b>";
      dividerTr.append(dividerTd);

      table.append(dividerTr);

      if (mode.table[key].length !== 0) {
        for (let key2 in mode.table[key]) {
          var tr = document.createElement("tr");
          var startTd = document.createElement("td");
          var endTd = document.createElement("td");

          var item = mode.table[key][key2];

          startTd.innerText = item.start;
          endTd.innerText = item.end;

          tr.append(startTd)
          tr.append(endTd)

          table.append(tr);
        }
      } else {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.colSpan = 2;
        td.innerText = "-";
        tr.append(td)

        table.append(tr);
      }



    }

    $("#table").html(table);

  }, 1000);



})