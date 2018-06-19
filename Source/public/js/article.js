$(document).ready(function() {
    refreshComments($('#articleID').val());
});

// submit form ajax
function postComment() {
    var comment = $('#newComment').val();
    var articleID = $('#articleID').val();
    var username = 'Admin';

    $.ajax({
        method: "POST",
        url: "/api/comments",
        data: {
            comment: comment,
            articleID: articleID,
            username: username
        },
        success: function( data ) {
            alertComment(true, "Post a comment successfully!");
            $('#newComment').val(''); //reset
            refreshComments(articleID);
        },
        error: function(xhr, status, errorThrown) {
            alertComment(false, "Post a comment failed!<br>Error: " + xhr.responseText);;
        }
    });
    return false; //prevent default submit
}

function alertComment(isSuccess, message) {
    alert_state = isSuccess ? 'alert-success' : 'alert-danger';
    html = '<div class="alert ' + alert_state + ' alert-dismissable fade in">';
    html += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
    html += message;
    html += '</div>';
    $("#alert-message").html(html);

    // auto close
    $("#alert-message").finish().fadeTo(2000, 500).slideUp(500);
}

function refreshComments(articleID, offset, limit) {
    $.ajax({
        method: "GET",
        url: "/api/comments",
        data: {
            articleID: articleID,
            offset: offset,
            limit: limit
        },
        success: function( html ) {
            $('#comments').html(html);
        },
        error: function(xhr, status, errorThrown) {
            var err = eval("(" + xhr.responseText + ")");
            console.error(err.Message);
        }
    });
}

function gotoPage(offset) {
    var articleID = $('#articleID').val();
    var limit = $('#page-limit').val();
    refreshComments(articleID, offset, limit);
}

function deleteComment(commentID) {
    $.ajax({
        method: "DELETE",
        url: "/api/comments/" + commentID,
        success: function(data) {
            console.log(data);
            var articleID = $('#articleID').val();
            var limit = $('#page-limit').val();
            var offset = $('#offset').val();
            refreshComments(articleID, offset, limit);
        }
    });
}

function changeCommentDisplayLimitPerPage() {
    var articleID = $('#articleID').val();
    var limit = $('#page-limit').val();
    var offset = $('#offset').val();
    // alert(articleID + " " + limit + " " + offset);
    refreshComments(articleID, offset, limit);
}