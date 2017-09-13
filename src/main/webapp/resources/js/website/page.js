var fullviewcalendar;

var startDateModal = $("#startDateModal");
var endDateModal =  $("#endDateModal");


function toDate(dateStr, timeStr) {
    var arrayDate = dateStr.split("-");
    var arrayTime = timeStr.split(":");
    var date = new Date(arrayDate[2],
        arrayDate[1] - 1,
        arrayDate[0],
        arrayTime[0],
        arrayTime[1]);
    return date;
}

function updateDatePickerRelated(startSelector, endSelector, start, end) {

    var startDate = moment(start).format('DD-MM-YYYY');

    var endDate = moment(end).format('DD-MM-YYYY');

    $(startSelector).datepicker('setDate', startDate);

    $(startSelector).datepicker('setMaxDate', endDate);

    $(endSelector).datepicker('setDate', endDate);

    $(endSelector).datepicker('setMinDate', startDate);

}


function calendarPageFunction() {

    // full calendar

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var hdr = {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev,today,next'
    };

    var initDrag = function (e, eventObject) {
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end

        // store the Event Object in the DOM element so we can get to it later
        e.data('eventObject', eventObject);


        // make the event draggable using jQuery UI
        e.draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0 //  original position after the drag
        });
    };

    var addEvent = function (eventObject) {

        var html = $('<li><span class="' + eventObject.className + '" data-description="' + eventObject.description + '" data-icon="' +
            eventObject.icon + '">' + title + '</span></li>').prependTo('ul#external-events').hide().fadeIn();

        addEventToServer(eventObject);

        $("#event-container").effect("highlight", 800);

        initDrag(html, eventObject);
    };

    /* initialize the external events
     -----------------------------------------------------------------*/

    $('#external-events > li').each(function () {
        initDrag($(this));
    });

    $('#add-event').click(function () {
        var title = $('#title').val(),
            priority = $('input:radio[name=priority]:checked').val(),
            description = $('#description').val(),
            icon = $('input:radio[name=iconselect]:checked').val(),
            startDate = $('#startDate').val(),
            startTime = $('#startTime').val(),
            endDate = $('#endDate').val(),
            endTime = $('#endTime').val();

        title = title.length === 0 ? "Untitled Event" : title;
        description = description.length === 0 ? "No Description" : description;
        icon = icon.length === 0 ? " " : icon;
        priority = priority.length === 0 ? "label label-default" : priority;

        var eventObject = {
            title: title, // use the element's text as the event title
            description: description,
            icon: icon,
            className: priority,
            start: toDate(startDate, startTime),
            end: toDate(endDate, endTime)// use the element's children as the event class
        };

        addEvent(eventObject);
    });

    /* initialize the calendar
     -----------------------------------------------------------------*/

    fullviewcalendar = $('#calendar').fullCalendar({

        header: hdr,
        buttonText: {
            prev: '<i class="fa fa-chevron-left"></i>',
            next: '<i class="fa fa-chevron-right"></i>'
        },

        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!

        drop: function (date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }

        },

        select: function (start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent', {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    }, true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },

        events: function(start, end, timezone, callback) {
            $.ajax({
                url: '/events',
                dataType: 'json',
                type : "GET",
                data: {
                    // our hypothetical feed requires UNIX timestamps
                    start: new Date(start),
                    end: new Date(end)
                },
                success: function(doc) {
                    callback(doc);
                }
            });
        },

        eventClick: function (event) {
            console.log(event.title);
        },

        eventRender: function (event, element, icon) {
            if (!event.description == "") {
                element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description +
                    "</span>");
            }
            if (!event.icon == "") {
                element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon +
                    " '></i>");
            }

            element.bind('dblclick', function () {
                showEventDetail(event);
            });
        },

        windowResize: function (event, ui) {
            $('#calendar').fullCalendar('render');
        }
    });

    function showEventDetail(event) {
        $eventModal = $('#eventModal');

        var start = new Date(event.start);
        var end = new Date(event.end);

        // put values in the modal form
        $("#titleModal").val(event.title);
        $("#descriptionModal").text(event.description);

        $("#startDateModal").datepicker('setDate', moment(start).format('DD-MM-YYYY'));
        $("#endDateModal").datepicker('setDate', moment(end).format('DD-MM-YYYY'));

        updateDatePickerRelated(startDateModal,endDateModal,start,end);

        $eventModal.modal('show');
    }

    /* hide default buttons */
    $('.fc-header-right, .fc-header-center').hide();


    $('#calendar-buttons #btn-prev').click(function () {
        $('.fc-button-prev').click();
        return false;
    });

    $('#calendar-buttons #btn-next').click(function () {
        $('.fc-button-next').click();
        return false;
    });

    $('#calendar-buttons #btn-today').click(function () {
        $('.fc-button-today').click();
        return false;
    });

    $('#mt').click(function () {
        $('#calendar').fullCalendar('changeView', 'month');
    });

    $('#ag').click(function () {
        $('#calendar').fullCalendar('changeView', 'agendaWeek');
    });

    $('#td').click(function () {
        $('#calendar').fullCalendar('changeView', 'agendaDay');
    });


    function addEventToServer(event) {
        $.ajax({
            url: "/event/add",
            type: "POST",
            dataType: "json",
            data: event,
            success: function (response) {
                $('#calendar').fullCalendar('renderEvent', response, true);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus === "timeout") {
                    alert("Call has timed out"); //Handle the timeout
                } else {
                    alert("Another error was returned"); //Handle other error type
                }
            }
        });
    }
};
