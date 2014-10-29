/*global App*/
var CTChart = function() {
  this.loader = new App.DataLoader();
  this.statusChart = new App.OverviewChart($("#status"));
  this.data = null;
};

CTChart.prototype.search = function(searchTerm) {
  var that = this;
  searchTerm = searchTerm.replace(/ /g,"+");
  this.loader.setSearchTerm(searchTerm, function(data) {
    var parsedData = that.parseData(data);
    that.statusChart.setData(parsedData);
  });
};

CTChart.prototype.parseData = function(data) {
  var that = this;
  this.data = {};
  data.forEach(function(study) {
    if (that.data[study.status.content]) {
      that.data[study.status.content] = that.data[study.status.content].concat(study);
    } else {
      that.data[study.status.content] = [study];
    }
  });
  var results = [];
  Object.keys(this.data).forEach(function(key) {
    results.push([key, that.data[key].length]);
  });
  return results;
};

$(function() {
  var app = new CTChart();
  $("#search_bar").submit(function(event) {
    event.preventDefault();
    $("#status").removeClass("hidden");
    $("#status").highcharts().showLoading();
    var inputText = $("#input_bar").val();
    app.search(inputText);
  });
});