var app = function() {
  loadResults("Stroke+AND+Brain", 5, doneFn);
};

var loadResults = function(searchTerm, maxPages, doneCallback) {
  var page = 1;
  var allData = [];
  var callback = function(data) {
    allData = allData.concat(data.query.results.search_results.study);
    if (page === maxPages) {
      doneCallback(allData);
    } else {
      page += 1;
      loadXML(searchTerm, page, callback);
    }
  };

  loadXML(searchTerm, page, callback);
};

var loadXML = function(searchTerm, page, callback) {
  var url = "http://clinicaltrial.gov/ct2/results?term=" + searchTerm + "&Search=Search&displayxml=true&pg=" + page;
  var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=json&callback=?';

  $.getJSON( yql, function(data) {
    callback(data);
  });
};

var parseData = function(data) {
  var counts = {};
  data.forEach(function(study) {
    if (counts[study.recruitment]) {
      counts[study.recruitment] += 1;
    } else {
      counts[study.recruitment] = 1;
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