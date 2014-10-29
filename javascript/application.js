var statusChart;
var app = function() {
  var loader = new App.DataLoader();
  statusChart = new App.OverviewChart($("#app"));
  loader.setSearchTerm("Stroke+AND+Brain", function(data) {
    statusChart.setData(data);
  });
};

$(function() {
  app();
});