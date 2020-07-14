var temp = "<li><a id='1' class='fa fa-angle-right active' href='#'>Chapter 1</a></li>";
for(var index = 0; index < 11; index++) {
    temp += "<li><a id='" + (index + 2) + "' class='fa fa-angle-right' href='#'>Chapter " + (index + 2) + "</a></li>";
}
$('#my_ul').html(temp);
temp = "";
var arr = JSON.parse($.getJSON({'url': "../json/questions.json", 'async': false}).responseText);
function Show_Question() {
    $('#question_num_ul a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(this).attr('class', 'fa fa-angle-right active');
        $(this).parent().siblings().children().attr('class', 'fa fa-angle-right');
        var chapter_id = $(this).attr('chapter'), question_index = $(this).attr('question');
        if($('.showing_div input[type=hidden]').val() == 0) {
            var div_id = $('.showing_div').attr('id');
            $('#' + div_id + ' input:checked').prop('checked', false);
            $('#' + div_id + ' .btn-primary').attr('disabled', '');
        }
        $("#Chapter-" + chapter_id + "_Question-" + question_index).show('slow').attr('class', 'showing_div');
        $("#Chapter-" + chapter_id + "_Question-" + question_index).siblings().hide();
    });
}
function Render_List_Of_Question(id) {
    var html = "";
    if(arr.IOS305[id].length == 0) {
        html = "<p>There Isn't any questions for this chapter.</p>";
        //$('#question_content').html('<div>sdsd</div>');
        $('#question_numbers').html(html).show('slow');
        return;
    }
    html += "<ul id='question_num_ul'>";
    for(var index = 0; index < arr.IOS305[id].length; index++) {
        if(arr.IOS305[id][index].true != '')
            html += "<li><a question='" + index + "' chapter='" + id + "' class='fa fa-angle-right' href='#'>Question " + (index + 1) + "</a></li>";
    }
    html += "</ul>"
    $('#question_numbers').html(html);
    Show_Question();
}
function Submit_Answer() {
    $('.btn-primary').on('click', function() {
        $(this).siblings(':last').val('1');
        $(this).siblings('.btn-secondary').removeAttr('disabled');
        $('#question_num_ul .active').css('background-color', '#FF7F9B');
        $('#end').removeAttr('disabled');
        $('#end').show();
    });
}
function Reset_Answer() {
    $('.btn-secondary').on('click', function() {
        $(this).siblings(':last').val('0');
        $(this).siblings('input:checked').prop('checked', false);
        $(this).siblings('.btn-primary').attr('disabled', '');
        $(this).attr('disabled', '');
        $('#question_num_ul .active').css('background-color', '');
        var count = 0;
        $('input[type=hidden]').each(function () {
            if($(this).val() == "1") {
                count++;
            }
        });
        if(count == 0) {
            $('#end').attr('disabled', '');
            $('#end').hide();
        }
    });
}
function Enable_Submit() {
    $('input').on('click', function () {
        $(this).siblings('.btn-primary').removeAttr('disabled');
    });
}
function Render_Content_Of_Question(id) {
    var html = "";
    for(var index = 0; index < arr.IOS305[id].length; index++) {
        html += "<div id='Chapter-" + id + "_Question-" + index + "' count='" + arr.IOS305[id][index].true.split('_').length + "'";
        html += " class='hidden_div'><h3>Question " + (index + 1) +"</h3><h5>" + arr.IOS305[id][index].question + "</h5>";
        var choise = ["1", "2", "3", "4"];
        if(arr.IOS305[id][index].true.length == 1) {
            for(var answer_index = 0; answer_index < choise.length; answer_index++) {
                if(arr.IOS305[id][index][choise[answer_index]] != '') {
                var choise_info = "Chapter-" + id + "_Question-" + index + "_Choise-" + choise[answer_index];
                html += choise[answer_index] + "- <input type='radio' id='" + choise_info + "' value='";
                arr.IOS305[id][index].true == choise[answer_index] ? html += "true" : html += choise[answer_index];
                html += "' name='Chapter-" + id + "_Question-" + index + "'>";
                html += "<label for='" + choise_info + "'>" + arr.IOS305[id][index][choise[answer_index]] + "</label><br>";
                }
                else {
                    break;
                }
            }
            html += "<div id='myModal_" + id + "" + index + "' class='modal fade' role='dialog'><div class='modal-dialog'>";
            html += "<div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>";
            html += "&times;</button></div><div class='modal-body'><p>The Answer is " + arr.IOS305[id][index].true + "</p>";
            html += "</div></div></div></div>";
        }
        else {
            var ans_split = 0;
            for(var answer_index = 0; answer_index < choise.length; answer_index++) {
                if(arr.IOS305[id][index][choise[answer_index]] != '') {
                var choise_info = "Chapter-" + id + "_Question-" + index + "_Choise-" + choise[answer_index];
                html += choise[answer_index] + "- <input type='checkbox' id='" + choise_info + "' value='";
                if(arr.IOS305[id][index].true.split('_')[ans_split] == choise[answer_index]) {
                    html += "true";
                    ans_split++;
                }
                else {
                    html += choise[answer_index];
                }
                html += "' name='Chapter-" + id + "_Question-" + index + "'>";
                html += "<label for='" + choise_info + "'>" + arr.IOS305[id][index][choise[answer_index]] + "</label><br>";
                }
                else {
                    break;
                }
            }
            html += "<div id='myModal_" + id + "" + index + "' class='modal fade' role='dialog'><div class='modal-dialog'>";
            html += "<div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>";
            html += "&times;</button></div><div class='modal-body'><p>The Answer is ";
            for(var an = 0; an < arr.IOS305[id][index].true.split('_').length; an++) {
                (an + 1 ) == arr.IOS305[id][index].true.split('_').length ? 
                html += arr.IOS305[id][index].true.split('_')[an] : 
                html += arr.IOS305[id][index].true.split('_')[an] + " & ";
            }
            html += "</p></div></div></div></div>";
        }
        html += "<button type='button' class='btn btn-primary' disabled style='left: 20%;position: absolute;top: 113%;'>Submit</button>";
        html += "<button type='button' class='btn btn-secondary' disabled style='left: 45%;position: absolute;top: 113%;'>Reset</button>";
        html += "<button type='button' class='btn btn-warning' style='left: 70%;position: absolute;top: 113%;' data-toggle='modal' data-target='#myModal_" + id + "" + index + "'>Help</button>";
        html += "<input type='hidden' value='0'/>"
        html += "</div>";
    }
    $("#question_content").html(html);
    Submit_Answer();
    Reset_Answer();
    Enable_Submit();
}
Render_List_Of_Question(1), Render_Content_Of_Question(1);
$('#my_ul a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $('#ok').attr('value', '');
    var attr = $('#end').attr('disabled');
    if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('class', 'fa fa-angle-right active');
        $(this).parent().siblings().children().attr('class', 'fa fa-angle-right');
        var chapter_id = $(this).attr('id');
        Render_List_Of_Question(chapter_id);
        Render_Content_Of_Question(chapter_id);
        Show_Question();
    }
    else {
        if(!$(this).hasClass('active')) {
            temp += "<p>Would you need to left exam and go to another chapter?</p>";
            $('#change_chapter_body').html(temp);
            $('#ok').removeAttr('disabled');
            $('#no').removeAttr('disabled');
            $('#change_chapter').modal('show');
            temp = "";
            $('#ok').attr('value', $(this).attr('id'));
        }
    }
});
$('#end').on('click', function () {
    if($(this).text() == 'End Exam') {
        var real_answer = 0, wrong = [];
        $('#question_content div').each(function () {
            if($("#" + $(this).attr('id') + " input[type=hidden]").val() == 1) {
                var count = $(this).attr('count'), condition = true;
                $("#" + $(this).attr('id') + " input:checked").each(function () {
                    if(condition) {
                        count--;
                        $(this).val() == "true" ? condition = true : condition = false;
                    }
                });
                count == 0 && condition ? real_answer++ : wrong.push($(this).attr('id').split('_')[1].split('-')[1]);
            }
        });
        temp += "<p>Your Score Is " + (real_answer * 100 / $('#question_content div[id^="Chapter"]').length).toFixed(2) + "/100</p><hr>";
        for(var index = 0; index < wrong.length; index++) {
            temp += "<p>Your Answer On Question " + (parseInt(wrong[index]) + 1) + " Is Wrong. Try Again.</p>";
        }
        $('#final_body').html(temp);
        $('#question_content').html('');
        $('#question_numbers').html('');
        $(this).text('Try Again');
        $(this).attr('data-toggle', 'modal');
        temp = "";
    }
    else if($(this).text() == 'Try Again') {
        $(this).attr('disabled', '');
        $('.active').click();
        $(this).text('End Exam');
        $(this).attr('data-toggle', '');
        $(this).hide();
    }
});
$('#ok').on('click', function () {
    $('#' + $(this).val()).attr('class', 'fa fa-angle-right active');
    $('#' + $(this).val()).parent().siblings().children().attr('class', 'fa fa-angle-right');
    var chapter_id = $(this).val();
    Render_List_Of_Question(chapter_id);
    Render_Content_Of_Question(chapter_id);
    Show_Question();
    $(this).val('');
    $('#change_chapter').modal('hide');
    setTimeout(function(){
        $('#end').hide();
        $('#end').attr('disabled', '');
        $(this).removeAttr('disabled');
        $('#no').removeAttr('disabled');
        $('#no').val('')
     },0);
});
$('#no').on('click', function () {
    $('#change_chapter').modal('hide');
    setTimeout(function () {
        $(this).removeAttr('disabled');
        $('#ok').removeAttr('disabled');
        $(this).val('');
        $('#ok').val('');
    }, 0);
});
