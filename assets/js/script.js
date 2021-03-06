var containerEl = $('#container')

var currentDay = $('#currentDay')
  .text(moment().format('dddd' + ', ' + 'MMMM Do'))

var hourlyBlocks = [
  {
    hourLabel: '9am',
    hourId: 9,
    hourDesc: ''
  },
  {
    hourLabel: '10am',
    hourId: 10,
    hourDesc: ''
  },
  {
    hourLabel: '11am',
    hourId: 11,
    hourDesc: ''
  },
  {
    hourLabel: '12pm',
    hourId: 12,
    hourDesc: ''
  },
  {
    hourLabel: '1pm',
    hourId: 13,
    hourDesc: ''
  },
  {
    hourLabel: '2pm',
    hourId: 14,
    hourDesc: ''
  },
  {
    hourLabel: '3pm',
    hourId: 15,
    hourDesc: ''
  },
  {
    hourLabel: '4pm',
    hourId: 16,
    hourDesc: ''
  },
  {
    hourLabel: '5pm',
    hourId: 17,
    hourDesc: ''
  }
]

// CREATE TIME BLOCKS
var createTimeBlocks = function (param) {
  for (var i = 0; i < param.length; i++) {
    var timeBlockEl = $('<section>')
      .addClass('row time-block')

    var hourOfDayEl = $('<div>')
      .addClass('hour col-1')
      .text(param[i].hourLabel)
      .attr('id', param[i].hourId)

    var descriptionEl = $('<textarea>')
      .addClass('description col-8')
      .attr('placeholder', 'add a task, appointment, or reminder')
      .attr('data-descId', param[i].hourId)
      .val(param[i].hourDesc)

    var saveBtnEl = $('<div>')
      .addClass('saveBtn fas fa-save col-1')
      .attr('id', 'saveBtn')
      .attr('data-saveBtnId', param[i].hourId)

    timeBlockEl.append(hourOfDayEl)
    timeBlockEl.append(descriptionEl)
    timeBlockEl.append(saveBtnEl)
    containerEl.append(timeBlockEl)
  }
}

// // LOAD DESCRIPTION CONTENTS TO CORRECT HOUR BLOCKS
var loadSavedItems = function () {
  var savedBlocks = JSON.parse(localStorage.getItem('savedBlocks'))

  if (!savedBlocks) {
    createTimeBlocks(hourlyBlocks)
    // console.log('No tasks found.')
  } else {
    createTimeBlocks(savedBlocks)
    // console.log('Tasks found.')
    // console.log(savedBlocks)
  }
}

// FXN TO SAVE DESCRIPTION CONTENTS TO LOCAL STORAGE FOR THE HOUR BLOCK IT'S ATTACHED TO
var saveTimeBlockInfo = function (id) {
  // get array object by hourId that matches fxn id
  var hourObj = hourlyBlocks.find(elem => elem.hourId == id)
  hourObj.hourDesc = $('textarea[data-descId=' + id + ']').val()
  console.log(hourObj.hourDesc)

  // send to local storage
  var hourContent = hourlyBlocks
  localStorage.setItem('savedBlocks', JSON.stringify(hourContent))
}

// FXN TO COMPARE TIME BLOCK WITH CURRENT HOUR OF DAY AND ADJUST BACKGROUND COLOR FOR CURRENT, PAST, AND FUTURE
var checkCurrentHour = function () {
  // select hourId for each time block
  $('.hour').each(function () {
    // console.log($(this).attr('id'))
    var hour = $(this).attr('id')
    if (hour < moment().hour()) {
      $('textarea[data-descId=' + hour + ']')
        .removeClass('present future')
        .addClass('past')
    } else if (hour == moment().hour()) {
      $('textarea[data-descId=' + hour + ']')
        .removeClass('past future')
        .addClass('present')
    } else if (hour > moment().hour()) {
      $('textarea[data-descId=' + hour + ']')
        .removeClass('present past')
        .addClass('future')
    }
  })
}

loadSavedItems()
checkCurrentHour()

// EVENT HANDLER FOR SAVE BTN CLICK
$('.saveBtn').on('click', function () {
  console.log('Save button was clicked.')
  var saveBtnId = $(this).attr('data-saveBtnId')
  saveTimeBlockInfo(saveBtnId)
})
