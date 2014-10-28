/*global App*/
(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var DataLoader = App.DataLoader = function() {
    this.searchTerm = null;
  };

  DataLoader.prototype.setSearchTerm = function(searchTerm, callback) {
    this.searchTerm = searchTerm;
    this.loadResults(this.searchTerm, 5, callback);
  };

  DataLoader.prototype.loadXML = function(searchTerm, page, callback) {
    var url = "http://clinicaltrial.gov/ct2/results?term=" + searchTerm +
      "&Search=Search&displayxml=true&pg=" + page;
    var yql = "http://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent("select * from xml where url='" + url + "'") +
      "&format=json&callback=?";

    $.getJSON( yql, callback);
  };

  DataLoader.prototype.loadResults = function(searchTerm, maxPages, doneCallback) {
    var that = this;
    var page = 1;
    var allData = [];
    var callback = function(data) {
      allData = allData.concat(data.query.results.search_results.clinical_study);
      if (page === maxPages) {
        debugger;
        doneCallback(allData);
      } else {
        page += 1;
        that.loadXML(searchTerm, page, callback);
      }
    };

    this.loadXML(searchTerm, page, callback);
  };
}());