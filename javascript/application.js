/*global App*/
var CTChart = function() {
  this.loader = new App.DataLoader();
  this.statusChart = new App.OverviewChart($("#status"), this);
  this.conditionChart = new App.ConditionChart($("#condition"), this);
  this.statusData = null;
  this.conditionData = null;
};

CTChart.prototype.search = function(searchTerm) {
  var that = this;
  this.loader.setSearchTerm(searchTerm, function(data) {
    var parsedData = that.parseStatusData(data);
    that.statusChart.setData(parsedData);
  });
};

CTChart.prototype.parseStatusData = function(data) {
  var that = this;
  this.statusData = {};
  data.forEach(function(study) {
    if (that.statusData[study.status.content]) {
      that.statusData[study.status.content].push(study);
    } else {
      that.statusData[study.status.content] = [study];
    }
  });
  var results = [];
  Object.keys(this.statusData).forEach(function(key) {
    results.push([key, that.statusData[key].length]);
  });
  return results;
};

CTChart.prototype.parseConditionData = function(statusName) {
  var that = this;
  this.conditionData = {};
  var data = this.statusData[statusName];
  data.forEach(function(study) {
    var conditions = study.condition_summary.split("; ");
    conditions.forEach(function(conditionName) {
      if (that.conditionData[conditionName]) {
        that.conditionData[conditionName].push(study);
      } else {
        that.conditionData[conditionName] = [study];
      }
    });
  });
  var results = [];
  Object.keys(this.conditionData).forEach(function(key) {
    results.push([key, that.conditionData[key].length]);
  });
  return results;
};

CTChart.prototype.clickStatus = function(statusName) {
  $("#condition").removeClass("hidden");
  $("#condition").highcharts().showLoading();
  var data = this.parseConditionData(statusName);
  this.conditionChart.setData(data);
};

$(function() {
  window.app = new CTChart();
  $("#search_bar").submit(function(event) {
    event.preventDefault();
    $("#status").removeClass("hidden");
    $("#status").highcharts().showLoading();
    var inputText = $("#input_bar").val();
    window.app.search(inputText);
  });
});