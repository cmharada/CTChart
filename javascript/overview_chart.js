/*global App*/
(function() {
  if (typeof App === undefined) {
    window.App = {};
  }

  var OverviewChart = App.OverviewChart = function($el) {
    this.data = null;
    $el.highcharts({
      chart: {
        type: "column"
      },
      title: {
        text: "Status Chart"
      },
      subtitle: {
        text: "Source: clinicaltrial.gov"
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        min: 0,
        title: {
          text: "# of studies"
        }
      },
      plotOptions: {
        series: {
          cursor: "pointer",
          point: {
            events: {
              click: function(e) {
                alert("hi");
              }
            }
          }
        }
      },
      tooltip: {
        pointFormat: "{point.y} Studies"
      }
    });
    this.chart = $el.highcharts();
    this.chart.showLoading();
  };

  OverviewChart.prototype.setData = function(data) {
    this.data = this.parseData(data);
    this.chart.addSeries({
      name: "Status",
      data: this.data
    });
    this.chart.hideLoading();
  };

  OverviewChart.prototype.parseData = function(data) {
    var counts = {};
    data.forEach(function(study) {
      if (counts[study.status.content]) {
        counts[study.status.content] += 1;
      } else {
        counts[study.status.content] = 1;
      }
    });
    var results = [];
    Object.keys(counts).forEach(function(key) {
      results.push([key, counts[key]]);
    });
    return results;
  };
}());