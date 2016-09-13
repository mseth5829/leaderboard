console.log("loaded");


$("form").on("submit", ajaxAddItem);
$("#edit").on("submit", getEdit);


function ajaxAddItem(ev) {
  ev.preventDefault();
  console.log("form submitted:", ev);

  var user = $("form input")[0].value;
  var score = $("form input")[1].value;
  var params = {user: user, score: score};

  $.post("/data", params, function(data) {
    showTable();
  });
}

function showTable(){
  $.get('http://localhost:3000/data', function(data) {
    $('tbody').empty();
    for(var i = 0; i< data.user.length; i++){
      var row = $('<tr>');
      var link = $('<a>').attr("href","/" + data.id[i]);
      var cell = $('<td>').text(data.user[i]);
      var userCell = $(link).append(cell);
      var cell2 = $('<td>').text(data.score[i]);

      var newData = row.append(userCell).append(cell2);
      $(newData).appendTo('tbody');
    }
  })
};
