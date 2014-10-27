var app = function() {
  var $app = $("#app");
  loadXML("http://clinicaltrial.gov/ct2/results?term=Stroke+AND+Brain&Search=Search&displayxml=true", cb);
};

var loadXML = function(url, callback) {
  var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=json&callback=?';

  $.getJSON( yql, function(data) {
    callback(data);
  });
};

var cb = function(data) {
  $("#app").text(JSON.stringify(data.query.results));
};

$(function() {
  app();
});