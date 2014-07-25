/**
 * Created by Akiba on 2014/7/25.
 */
$(function(){
    $.getJSON("OriginLocation.txt",function(data){
        var option = "";
        var destobj = [];
        $.each(data,function(i,n){
            option += "<option value=" + n.id + ">" + n.name + "</option>";
            destobj.push(n.name);
        })

        $("#location").append(option);
        $.getJSON("DestinationsFromAuckland.txt",function(data){destobj["191"] = data;});
        $.getJSON("DestinationsFromChristchurch.txt",function(data){destobj["318"] = data;});
        $.getJSON("DestinationsFromHamilton.txt",function(data){destobj["193"] = data;});
        $.getJSON("DestinationsFromWellington.txt",function(data){destobj["196"] = data;});
        $("select#location").change(function() {
            var options = $("#location option:selected");
            var option = "";
            $.each(destobj[options.val()],function(i,n){
                option += "<option value=" + n.id + ">" + n.name + "</option>";
            });
            $("#destination").empty();
            $("#destination").append(option);
            $("#destination").prop('disabled', false);

        })
    })
    $("#destination").change(function() {
        $("#searchnow").prop('disabled', false);
    })
    $("#searchnow").click(function() {
        $.getJSON("AvailableDates.txt", function (data) {
            //var option = "";
            var dates = [];
            $.each(data, function (i, n) {
                //option += "<option value=" + n.dateAsLong + ">" + n.display + "</option>"; // here is the select method, but this time I would not use it.
                dates.push(n.date);
            })
//            $("#date").empty();
//            $("#date").append(option);
            $('#date').datepicker({
                beforeShowDay: showday,
                format: "D, dd M yyyy"
            })
            $("#calendar div.row").datepicker({
                beforeShowDay: showday
            })
            function showday(date) {
                datearray = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0" + date.getDate()).slice(-2));
                if ($.inArray(datearray, dates) != -1) {
                    return true;
                } else {
                    return false;
                }
            }
        })
    })


});