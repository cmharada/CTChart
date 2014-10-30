/*global App*/
(function() {
  if (typeof App === undefined) {
    window.App = {};
  }

  var ConditionChart = App.ConditionChart = function($el, app) {
    this.app = app;
    this.data = null;
    this.$el = $el;
    this.$el.addClass("hidden");
    this.$el.highcharts({
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
        type: 'category',
        labels: {
          rotation: -45
        }
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
                app.clickCondition(this.name);
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
  };

  ConditionChart.prototype.setData = function(data) {
    this.data = data;
    if (this.chart.series.length > 0) {
      this.chart.series[0].setData(this.data);
    } else {
      this.chart.addSeries({
        name: "Status",
        data: this.data
      });
    }
    this.chart.hideLoading();
  };
}());