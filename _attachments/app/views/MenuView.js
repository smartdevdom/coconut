// Generated by CoffeeScript 1.6.2
var MenuView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MenuView = (function(_super) {
  __extends(MenuView, _super);

  function MenuView() {
    this.render = __bind(this.render, this);    _ref = MenuView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MenuView.prototype.el = '.question-buttons';

  MenuView.prototype.events = {
    "change": "render"
  };

  MenuView.prototype.render = function() {
    var _this = this;

    this.$el.html("      <div id='navbar' data-role='navbar'>        <ul></ul>      </div>    ");
    return Coconut.questions.fetch({
      success: function() {
        _this.$el.find("ul").html(Coconut.questions.map(function(question, index) {
          return "<li><a id='menu-" + index + "' href='#show/results/" + (escape(question.id)) + "'><h2>" + question.id + "<div id='menu-partial-amount'></div></h2></a></li>";
        }).join(" "));
        $(".question-buttons").navbar();
        return _this.update();
      }
    });
  };

  MenuView.prototype.update = function() {
    var _this = this;

    Coconut.questions.each(function(question, index) {
      var results;

      results = new ResultCollection();
      return results.fetch({
        question: question.id,
        isComplete: "false",
        success: function() {
          return $("#menu-" + index + " #menu-partial-amount").html(results.length);
        }
      });
    });
    return $.ajax("app/version", {
      dataType: "text",
      success: function(result) {
        return $("#version").html(result);
      },
      error: $("#version").html("-")
    });
  };

  return MenuView;

})(Backbone.View);

/*
//@ sourceMappingURL=MenuView.map
*/
