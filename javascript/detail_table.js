/*global App*/
(function() {
  if (typeof App === undefined) {
    window.App = {};
  }

  var DetailTable = App.DetailTable = function($el, app) {
    var that = this;
    this.app = app;
    this.rows = [];
    this.$el = $el;
    this.$el.addClass("hidden");
    this.$el.find("#title").click(function() {
      that.sortBy("title");
    });
    this.$el.find("#score").click(function() {
      that.sortBy("score");
    });
    this.$el.find("#last_changed").click(function() {
      that.sortBy("last_changed");
    });
  };

  DetailTable.prototype.setData = function(data) {
    var that =  this;
    this.data = data;
    for (var i = 0; i < this.rows.length; i++) {
      this.rows[i].remove();
    }
    this.rows = [];
    data.forEach(function(study) {
      var $row = $("<tr></tr>");
      var shortTitle = study.title;
      if (study.title.length > 30) {
        shortTitle = study.title.slice(0, 28) + "...";
      }
      $row.append($("<td><span class='short_title'>" + shortTitle +
        "</span><span class='tooltip'>" + study.title + "</span>" + "</td>"));
      $row.append($("<td><a href='" + study.url + "'>" + study.url + "</a></td>"));
      $row.append($("<td>" + study.condition_summary + "</td>"));
      $row.append($("<td>" + study.status.content + "</td>"));
      $row.append($("<td>" + study.score + "</td>"));
      $row.append($("<td>" + study.last_changed + "</td>"));
      that.rows.push($row);
      that.$el.append($row);
    });

  };

  DetailTable.prototype.sortBy = function(parameter) {
    this.data.sort(function(a, b) {
      if (parameter === "last_changed") {
        var dateA = new Date(a.last_changed);
        var dateB = new Date(b.last_changed);
        return dateA - dateB;
      } else if (parameter === "score") {
        return a.score - b.score;
      } else if (parameter === "title") {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      }
    });
    this.setData(this.data);
  };
}());