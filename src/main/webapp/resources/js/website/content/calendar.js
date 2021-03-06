var fullviewcalendar;

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

    var initDrag = function (e) {
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end

        var eventObject = {
            title: $.trim(e.children().text()), // use the element's text as the event title
            description: $.trim(e.children('span').attr('data-description')),
            icon: $.trim(e.children('span').attr('data-icon')),
            className: $.trim(e.children('span').attr('class')) // use the element's children as the event class
        };
        // store the Event Object in the DOM element so we can get to it later
        e.data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        e.draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0 //  original position after the drag
        });
    };

    var addEvent = function (title, priority, description, icon) {
        title = title.length === 0 ? "Untitled Event" : title;
        description = description.length === 0 ? "No Description" : description;
        icon = icon.length === 0 ? " " : icon;
        priority = priority.length === 0 ? "label label-default" : priority;

        var html = $('<li><span class="' + priority + '" data-description="' + description + '" data-icon="' +
            icon + '">' + title + '</span></li>').prependTo('ul#external-events').hide().fadeIn();

        $("#event-container").effect("highlight", 800);

        initDrag(html);
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
            icon = $('input:radio[name=iconselect]:checked').val();

        addEvent(title, priority, description, icon);
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
        },

        windowResize: function (event, ui) {
            $('#calendar').fullCalendar('render');
        }
    });

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

};

// end pagefunction

// destroy generated instances

// destroy generated instances
// pagedestroy is called automatically before loading a new page
// only usable in AJAX version!

var pagedestroy = function () {

    /*
    Example below:

    $("#calednar").fullCalendar( 'destroy' );
    if (debugState){
        root.console.log("✔ Calendar destroyed");
    }

    For common instances, such as Jarviswidgets, Google maps, and Datatables, are automatically destroyed through the app.js loadURL mechanic

    */

    fullviewcalendar.fullCalendar('destroy');
    fullviewcalendar = null;
    $("#add-event").off();
    $("#add-event").remove();

    $('#external-events > li').off();
    $('#external-events > li').remove();
    $('#add-event').off();
    $('#add-event').remove();
    $('#calendar-buttons #btn-prev').off();
    $('#calendar-buttons #btn-prev').remove();
    $('#calendar-buttons #btn-next').off();
    $('#calendar-buttons #btn-next').remove();
    $('#calendar-buttons #btn-today').off();
    $('#calendar-buttons #btn-today').remove();
    $('#mt').off();
    $('#mt').remove();
    $('#ag').off();
    $('#ag').remove();
    $('#td').off();
    $('#td').remove();

    if (debugState) {
        root.console.log("✔ Calendar destroyed");
    }
}


$(document).ready(function () {

    /* DO NOT REMOVE : GLOBAL FUNCTIONS!
     *
     * pageSetUp(); WILL CALL THE FOLLOWING FUNCTIONS
     *
     * // activate tooltips
     * $("[rel=tooltip]").tooltip();
     *
     * // activate popovers
     * $("[rel=popover]").popover();
     *
     * // activate popovers with hover states
     * $("[rel=popover-hover]").popover({ trigger: "hover" });
     *
     * // activate inline charts
     * runAllCharts();
     *
     * // setup widgets
     * setup_widgets_desktop();
     *
     * // run form elements
     * runAllForms();
     *
     ********************************
     *
     * pageSetUp() is needed whenever you load a page.
     * It initializes and checks for all basic elements of the page
     * and makes rendering easier.
     *
     */

    pageSetUp();

    /*
     * ALL PAGE RELATED SCRIPTS CAN GO BELOW HERE
     * eg alert("my home function");
     *
     * var pagefunction = function() {
     *   ...
     * }
     * loadScript("js/plugin/_PLUGIN_NAME_.js", pagefunction);
     *
     * TO LOAD A SCRIPT:
     * var pagefunction = function (){
     *  loadScript(".../plugin.js", run_after_loaded);
     * }
     *
     * OR
     *
     * loadScript(".../plugin.js", run_after_loaded);
     */

    // PAGE RELATED SCRIPTS

    // pagefunction


    // end destroy

    // loadscript and run pagefunction
    loadScript("/resources/js/plugin/moment/moment.min.js", function () {

        loadScript("/resources/js/plugin/fullcalendar/jquery.fullcalendar.min.js", calendarPageFunction);
    });

    loadScript("resources/js/plugin/clockpicker/clockpicker.min.js", runClockPicker);


    function runClockPicker() {
        $('#startTime').clockpicker({
            placement: 'bottom',
            donetext: 'Done',
            'default': 'now'
        });

        $('#endTime').clockpicker({
            placement: 'bottom',
            donetext: 'Done',
            'default': 'now'
        });
    }

    // Date Range Picker
    $("#startDate").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 2,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            $("#endDate").datepicker("option", "minDate", selectedDate);
        }

    });
    $("#endDate").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 2,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            $("#startDate").datepicker("option", "maxDate", selectedDate);
        }
    });


});