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
          $('tbody').append("<tr id=" + val.id + ">" +
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


  $('tbody').on('click', '.delete', function() {
    var confirm_ = confirm('This action will delete current order! Are you sure?');
    var deleteId = $(this).data('id');
    if (confirm_) {
      $.ajax({
        url: '/delete?id=' + deleteId,
        type: "DELETE",
        success: function(msg) {
          $("tbody #" + deleteId).remove();
        }
      });
    }
  });


  $('tfoot').on('click', '.add', function() {
    var name = $('.name').val();
    var chinese = $('.chinese').val();
    var math = $('.math').val();
    var english = $('.english').val();

    $.ajax({
      url: '/add',
      type: "POST",
      data: {
        name: name,
        chinese: chinese,
        math: math,
        english: english
      },
      success: function(msg) {
        var id = msg.id;
        $("tbody").append("<tr id=" + id + ">" +
          "<td>" + name + "</td>" +
          "<td>" + chinese + "</td>" +
          "<td>" + math + "</td>" +
          "<td>" + english + "</td>" +
          "<td class='delete' data-id=" + id + ">" + '删除' + "</td>" +
          "</tr>");

        $('.name').val('');
        $('.chinese').val('');
        $('.math').val('');
        $('.english').val('');
      }
    });
  });


});
