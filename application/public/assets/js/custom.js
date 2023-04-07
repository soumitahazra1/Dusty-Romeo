// top header

//stellarnav
jQuery(document).ready(function ($) {
  jQuery('.stellarnav').stellarNav({
    breakpoint: 960,
    position: 'right',
    // phoneBtn: '18009997788',
    // locationBtn: 'https://www.google.com/maps'
  });
});

// side bar
$(".sidebar-dropdown > a").click(function () {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function () {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function () {
  $(".page-wrapper").addClass("toggled");
});



//   tab
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

//   map view


// roster shift select box

// filter guards page
// guards filter
$(document).ready(function () {
  $("#show_filter").click(function () {
    $(".filter-section").toggle();
  });
});

// Weekly hours chart
if ($("#weeklyHours").length) {
  const weeklyH = document.getElementById('weeklyHours');
  const weeklyHours = new Chart(weeklyH, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Weekly Hours',
        data: [29.7, 8.1, 16.2, 6.8, 18.9, 21.6, 12.6],
        backgroundColor: [
          'rgba(90, 218, 69, 1)',

        ],
        borderColor: [
          'rgba(70, 127, 207, 1)',
        ],
        borderWidth: 1
      }]
    },

  })
}


// admin dashboard line top chart
if ($("#adminLinChat").length) {
  const adminLine = document.getElementById('adminLinChat');
  const adminlinchat = new Chart(adminLine, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Weekly Labour',
        data: [10, 20, 50, 15, 28, 40, 30],
        backgroundColor: [
          'rgba(90, 218, 69, 1)',
        ],
        borderColor: [
          'rgba(70, 127, 207, 1)',
        ],
        borderWidth: 1
      }]
    },

  })
}

// admin dashboard line chart
if ($("#adminShiftChart").length) {
  const adminShift = document.getElementById('adminShiftChart');
  const adminShiftChart = new Chart(adminShift, {
    type: 'line',


    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
      datasets: [{
        label: 'Series 1', // Name the series
        data: [2, 4, 6, 1, 5, 7, 3, 10, 4, 11], // Specify the data values array
        fill: false,
        borderColor: '#d54841', // Add custom color border (Line)
        backgroundColor: '#d54841', // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      },
      {
        label: 'Series 2', // Name the series
        data: [4, 2, 6, 1, 5, 11, 2, 10, 4, 9], // Specify the data values array
        fill: false,
        borderColor: '#f29917', // Add custom color border (Line)
        backgroundColor: '#f29917', // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      },

      {
        label: 'Series 3', // Name the series
        data: [10, 2, 4, 5, 9, 1, 4, 8, 4, 7], // Specify the data values array
        fill: false,
        borderColor: '#2789f0', // Add custom color border (Line)
        backgroundColor: '#2789f0', // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      }

      ]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
  })
}





// shifte filled
if ($("#shiftFilled").length) {
  const shiftF = document.getElementById('shiftFilled');
  const shiftFilled = new Chart(shiftF, {
    type: 'pie',
    data: {
      labels: ['Filled', 'Unfilled'],
      datasets: [{
        label: 'Weekly Labour',
        data: [70, 30],
        backgroundColor: [
          'rgba(90, 218, 69, 1)',
          'rgba(244, 65, 65, 1)',
        ],
        borderColor: [
          'rgba(90, 218, 69, 1)',
          'rgba(244, 65, 65, 1)',
        ],
        borderWidth: 1
      }]
    },

  })
}


// weekly closur hour chart
if ($("#weekClosur").length) {
  const weekC = document.getElementById('weekClosur');
  const weekClosur = new Chart(weekC, {
    type: 'bar',
    data: {
      labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'],
      datasets: [{
        label: 'Weekly Closur',
        data: [10, 20, 50, 15, 28],
        backgroundColor: [
          'rgba(70, 127, 207, 1)',
        ],
        borderColor: [
          'rgba(70, 127, 207, 1)',
        ],
        borderWidth: 1
      }]
    },

  })
}


// guards available
if ($("#guardsAvailable").length) {
  const guardsA = document.getElementById('guardsAvailable');
  const guardsAvailable = new Chart(guardsA, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Weekly Labour',
        data: [10, 20, 50, 15, 28, 40, 30],
        backgroundColor: [
          'rgba(90, 218, 69, 1)',
        ],
        borderColor: [
          'rgba(70, 127, 207, 1)',
        ],
        borderWidth: 1
      }]
    },

  })
}


// dashboard new job request
$(document).ready(function () {
  $(".color_red").click(function () {
    $("#dashboardGuardName").remove();
  });

  $(document).on('click', '.refresh', function (e) {
    console.log(this.value);
    window.location.href = '/' + this.value;
  });

  $('.datepicker').datepicker({
  });
});


function capitalizeFirstLetter(str, inAllWordsOfString = false) {
  if (!inAllWordsOfString) {
    //convert given string to lowercase
    let lowerStr = str.toLowerCase();
    // Now convert first character to upper case
    let firstCharacter = str.charAt(0).toUpperCase();
    // Now combine firstCharacter and lowerStr and return
    return firstCharacter + lowerStr.slice(1);
  } else {
    let str1 = str.split(" ");
    let returnStr = "";

    for (let i = 0; i < str1.length; i++) {
      let lowerStr = str1[i].toLowerCase();
      returnStr =
        returnStr + str1[i].charAt(0).toUpperCase() + lowerStr.slice(1) + " ";
    }
    return returnStr.trim();
  }
}







