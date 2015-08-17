function getString(resq) {
  $('tbody').empty();
  resq.forEach(function(val) {
    $('tbody').append("<tr>" +
      "<td>" + val.id + "</td>" +
      "<td>" + val.name + "</td>" +
      "<td>" + val.chinese + "</td>" +
      "<td>" + val.math + "</td>" +
      "<td>" + val.english + "</td>" +
      "<td class='delete' data-id=" + val.id + ">" + '删除' + "</td>" +
      "</tr>");
  });
}


$(function() {

  var sortFlag = $('th').data('flag');
  $('thead').on('click', 'th', function() {
    var sortKey = $(this).data('tag');
    if (sortKey !== 'name') {
      $.get('/scores', {
        sortFlag: sortFlag,
        sortKey: sortKey
      }, function(resq, status) {
        $('tbody').empty();
        resq.forEach(function(val) {
          $('tbody').append("<tr>" + "<td>" + val.id + "</td>" +
            "<td>" + val.name + "</td>" +
            "<td>" + val.chinese + "</td>" +
            "<td>" + val.math + "</td>" +
            "<td>" + val.english + "</td>" +
            "<td class='delete' data-id=" + val.id + ">" + '删除' + "</td>" +
            "</tr>");
        });
      });
    }
    sortFlag = -sortFlag;
  });


  $('.delete').on('click', function() {
    var confirm_ = confirm('This action will delete current order! Are you sure?');
    var deleteId = $(this).data('id');
    console.log(deleteId);
    if (confirm_) {
      $.ajax({
        url: '/delete?id='+deleteId,
        type: "DELETE",
        success:function(msg) {
           $("tbody #" + deleteId).remove();
           console.log(1111111111111);
        }
      });
    }

  });


});
