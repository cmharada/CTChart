/*global App*/
(function() {
  if (typeof App === undefined) {
    window.App = {};
  }

  var DetailTable = App.DetailTable = function($el, app) {
    this.app = app;
    this.data = null;
    this.$el = $el;
    this.$el.addClass("hidden");
  };

  DetailTable.prototype.setData = function(data) {
    this.data = data;
    this.render();
  };

  DetailTable.prototype.render = function() {
    var that = this;
    this.$el.empty();
    var $header = $("<tr></tr>");
    $header.append($("<td>Title</td>"));
    $header.append($("<td>URL</td>"));
    $header.append($("<td>Conditions</td>"));
    $header.append($("<td>Status</td>"));
    $header.append($("<td>Score</td>"));
    $header.append($("<td>Last Changed</td>"));
    this.$el.append($header);
    this.data.forEach(function(study) {
      var $row = $("<tr></tr>");
      $row.append($("<td>" + study.title + "</td>"));
      $row.append($("<td>" + study.url + "</td>"));
      $row.append($("<td>" + study.condition_summary + "</td>"));
      $row.append($("<td>" + study.status + "</td>"));
      $row.append($("<td>" + study.score + "</td>"));
      $row.append($("<td>" + study.last_changed + "</td>"));
      that.$el.append($row);
    });
  };
}());