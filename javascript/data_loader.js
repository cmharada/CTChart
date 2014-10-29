/*global App*/
(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var DataLoader = App.DataLoader = function() {
    this.searchTerm = null;
  };

  DataLoader.prototype.setSearchTerm = function(searchTerm, callback) {
    this.loadXML(this.searchTerm, 100, function(data) {
      callback(data.query.results.search_results.clinical_study);
    });
  };

  DataLoader.prototype.loadXML = function(searchTerm, count, callback) {
    var url = "http://clinicaltrial.gov/ct2/results?term=" + searchTerm +
      "&Search=Search&displayxml=true&count=" + count;
    var yql = "http://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent("select * from xml where url='" + url + "'") +
      "&format=json&callback=?";

    $.getJSON( yql, callback);
  };
}());