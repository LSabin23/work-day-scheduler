var containerEl = $('#container')

var currentDay = $('#currentDay')
  .text(moment().format('dddd' + ', ' + 'MMMM Do'))

var hourlyBlocks = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']

// CREATE TIME BLOCKS
for (var i = 0; i < hourlyBlocks.length; i++) {
  var timeBlockEl = $('<section>')
    .addClass('row time-block')
    .attr('data-', hourlyBlocks[i])

  var hourOfDayEl = $('<div>')
    .addClass('hour col-1')
    .text(hourlyBlocks[i])

  var descriptionEl = $('<textarea>')
    .addClass('description col-8')
    .attr('placeholder', 'add a task, appointment, or reminder')

  var saveBtnEl = $('<div>')
    .addClass('saveBtn fas fa-save col-1')

  timeBlockEl.append(hourOfDayEl)
  timeBlockEl.append(descriptionEl)
  timeBlockEl.append(saveBtnEl)
  containerEl.append(timeBlockEl)
}

// FXN TO SAVE DESCRIPTION CONTENTS TO LOCAL STORAGE FOR THE HOUR BLOCK IT'S ATTACHED TO

// EVENT HANDLER FOR SAVE BTN CLICK

// LOAD DESCRIPTION CONTENTS TO CORRECT HOUR BLOCKS


