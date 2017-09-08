/**
 * User: MELGADI
 * Date: 08/09/2017
 */


// Model i agree button
$("#i-agree").click(function () {
    $this = $("#terms");
    if ($this.checked) {
        $('#myModal').modal('toggle');
    } else {
        $this.prop('checked', true);
        $('#myModal').modal('toggle');
    }
});