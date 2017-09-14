
// end pagefunction

// destroy generated instances

// destroy generated instances
// pagedestroy is called automatically before loading a new page
// only usable in AJAX version!

addEventButton = $('#add-event');
addEventForm = $('#add-event-form');

startDateModal = $('#startDateModal');
endDateModal = $('#endDateModal');

startDate = $('#startDate');
endDate = $('#endDate');


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

        $('#startTimeModal').clockpicker({
            placement: 'bottom',
            donetext: 'Done',
            'default': 'now'
        });

        $('#endTimeModal').clockpicker({
            placement: 'bottom',
            donetext: 'Done',
            'default': 'now'
        });
    }

    // Date Range Picker
    startDate.datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 2,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            endDate.datepicker("option", "minDate", selectedDate);
        }

    });
    endDate.datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 2,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            startDate.datepicker("option", "maxDate", selectedDate);
        }
    });


    startDateModal.datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 2,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            endDateModal.datepicker("option", "minDate", selectedDate);
        }

    });
    endDateModal.datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 2,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            startDateModal.datepicker("option", "maxDate", selectedDate);
        }
    });

    initEventForm();


});