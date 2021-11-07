var containerEl = $('#container')

var currentDay = $('#currentDay')
  .text(moment().format('dddd' + ', ' + 'MMMM Do'))

var hourlyBlocks = [9, 10, 11, 12, 1, 2, 3, 4, 5]
var timeLabel = ''
var timeIdCounter = 9
var timeBlockEl = $('<section>').addClass('row time-block')

// CREATE TIME BLOCKS
for (var i = 0; i < hourlyBlocks.length; i++) {
  timeBlockEl
    .attr('data-hour', hourlyBlocks[i])
    .attr('id', timeIdCounter)

  if (hourlyBlocks[i] === 9 || hourlyBlocks[i] === 10 || hourlyBlocks[i] === 11) {
    timeLabel = 'am'
  } else {
    timeLabel = 'pm'
  }
  var hourOfDayEl = $('<div>')
    .addClass('hour col-1')
    .text(hourlyBlocks[i] + timeLabel)

  var descriptionEl = $('<textarea>')
    .addClass('description col-8')
    .attr('placeholder', 'add a task, appointment, or reminder')

  var saveBtnEl = $('<div>')
    .addClass('saveBtn fas fa-save col-1')
    .attr('id', 'saveBtn')

  timeBlockEl.append(hourOfDayEl)
  timeBlockEl.append(descriptionEl)
  timeBlockEl.append(saveBtnEl)
  containerEl.append(timeBlockEl)

  timeIdCounter++
}

// FXN TO SAVE DESCRIPTION CONTENTS TO LOCAL STORAGE FOR THE HOUR BLOCK IT'S ATTACHED TO
// var saveTimeBlockInfo = function () {
  // identify the description in the same row as the button that was clicked
  // get the content of the description
  // identify the hour block the save button and description are tied to (same row)
  // get the content of the hour block OR the index number content?
  // tie the description and hour block together
  // send to local storage
// }

// EVENT HANDLER FOR SAVE BTN CLICK
// $('#saveBtn').on('click', function ()) {
//   saveTimeBlockInfo()
// }

// LOAD DESCRIPTION CONTENTS TO CORRECT HOUR BLOCKS

// FXN TO COMPARE TIME BLOCK WITH CURRENT HOUR OF DAY AND ADJUST BACKGROUND COLOR FOR CURRENT, PAST, AND FUTURE
var checkCurrentHour = function () {
  // select description for each time block
  $(timeBlockEl.attr('id').children('hour')).each(function () {
    console.log($(this))
    // use variable set to hour block Moment.js hour value to compare with current hour
    var hour = hourOfDayEl.attr('id')
    if (hour < moment().hour()) {
      $('textarea' + hourOfDayEl.attr('id')).removeClass('present')
      $('textarea' + hourOfDayEl.attr('id')).removeClass('future')
      $('textarea' + hourOfDayEl.attr('id')).addClass('past')
    } else if (hour == moment().hour()) {
      $('textarea' + hourOfDayEl.attr('id')).removeClass('past')
      $('textarea' + hourOfDayEl.attr('id')).removeClass('future')
      $('textarea' + hourOfDayEl.attr('id')).addClass('present')
    } else if (hour > moment().hour()) {
      $('textarea' + hourOfDayEl.attr('id')).removeClass('present')
      $('textarea' + hourOfDayEl.attr('id')).removeClass('past')
      $('textarea' + hourOfDayEl.attr('id')).addClass('future')
    }
  })
}

checkCurrentHour()
