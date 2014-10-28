var app = function() {
  var loader = new App.DataLoader();
  loader.setSearchTerm("Stroke+AND+Brain", doneFn);
};

var parseData = function(data) {
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

var doneFn = function(data) {
  var parsedData = parseData(data);
  chartOverview(parsedData);
};

var chartOverview = function(data) {
  $("#app").highcharts({
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
    series: [{
      name: "Status",
      data: data
    }],
    tooltip: {
      pointFormat: "{point.y} Studies"
    }
  });
};

$(function() {
  app();
});