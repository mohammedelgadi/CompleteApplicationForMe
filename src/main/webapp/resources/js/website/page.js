var fullviewcalendar;


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

        var initDrag = function (e,eventObject) {
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

            initDrag(html,eventObject);
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

            events: [{
                title: 'All Day Event',
                start: new Date(y, m, 1),
                description: 'long description',
                className: ["event", "bg-color-greenLight"],
                icon: 'fa-check'
            }, {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                className: ["event", "bg-color-red"],
                icon: 'fa-lock'
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                allDay: true,
                className: ["event", "bg-color-blue"],
                icon: 'fa-clock-o'
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                allDay: false,
                className: ["event", "bg-color-blue"],
                icon: 'fa-clock-o'
            }, {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                className: ["event", "bg-color-darken"]
            }, {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                className: ["event", "bg-color-darken"]
            }, {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                className: ["event", "bg-color-darken"]
            }, {
                title: 'Smartadmin Open Day',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ["event", "bg-color-darken"]
            }],

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

            var eventContent = $eventModal.html();

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
                type: "PUT",
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