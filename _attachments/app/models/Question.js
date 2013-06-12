// Generated by CoffeeScript 1.6.2
var Question, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Question = (function(_super) {
  __extends(Question, _super);

  function Question() {
    this.summaryFieldNames = __bind(this.summaryFieldNames, this);
    this.resultSummaryFields = __bind(this.resultSummaryFields, this);    _ref = Question.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Question.prototype.type = function() {
    return this.get("type");
  };

  Question.prototype.label = function() {
    if (this.get("label") != null) {
      return this.get("label");
    } else {
      return this.get("id");
    }
  };

  Question.prototype.repeatable = function() {
    return this.get("repeatable");
  };

  Question.prototype.questions = function() {
    return this.get("questions");
  };

  Question.prototype.value = function() {
    if (this.get("value") != null) {
      return this.get("value");
    } else {
      return "";
    }
  };

  Question.prototype.required = function() {
    if (this.get("required") != null) {
      return this.get("required");
    } else {
      return "true";
    }
  };

  Question.prototype.validation = function() {
    if (this.get("validation") != null) {
      return this.get("validation");
    } else {
      return null;
    }
  };

  Question.prototype.attributeSafeText = function() {
    var returnVal;

    returnVal = this.get("label") != null ? this.get("label") : this.get("id");
    return returnVal.replace(/[^a-zA-Z0-9]/g, "");
  };

  Question.prototype.url = "/question";

  Question.prototype.set = function(attributes) {
    if (attributes.questions != null) {
      attributes.questions = _.map(attributes.questions, function(question) {
        return new Question(question);
      });
    }
    if (attributes.id != null) {
      attributes._id = attributes.id;
    }
    return Question.__super__.set.call(this, attributes);
  };

  Question.prototype.loadFromDesigner = function(domNode) {
    var attribute, property, result, _i, _len, _ref1;

    result = Question.fromDomNode(domNode);
    if (result.length === 1) {
      result = result[0];
      this.set({
        id: result.id
      });
      _ref1 = ["label", "type", "repeatable", "required", "validation"];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        property = _ref1[_i];
        attribute = {};
        attribute[property] = result.get(property);
        this.set(attribute);
      }
      return this.set({
        questions: result.questions()
      });
    } else {
      throw "More than one root node";
    }
  };

  Question.prototype.resultSummaryFields = function() {
    var resultSummaryFields,
      _this = this;

    resultSummaryFields = this.get("resultSummaryFields");
    if (resultSummaryFields) {
      return resultSummaryFields;
    } else {
      return _.reduce([0, 1, 2], function(returnValue, index) {
        var _ref1;

        if (((_ref1 = _this.questions()) != null ? _ref1.length : void 0) < index) {
          returnValue[_this.questions()[index].label()] = "on";
        }
        return returnValue;
      }, {});
    }
  };

  Question.prototype.summaryFieldNames = function() {
    return _.keys(this.resultSummaryFields());
  };

  Question.prototype.summaryFieldKeys = function() {
    return _.map(this.summaryFieldNames(), function(key) {
      return key.replace(/[^a-zA-Z0-9 -]/g, "").replace(/[ -]/g, "");
    });
  };

  return Question;

})(Backbone.Model);

Question.fromDomNode = function(domNode) {
  return _(domNode).chain().map(function(question) {
    var attribute, id, property, propertyValue, result, _i, _len, _ref1;

    question = $(question);
    id = question.attr("id");
    if (question.children("#rootQuestionName").length > 0) {
      id = question.children("#rootQuestionName").val();
    }
    if (!id) {
      return;
    }
    result = new Question;
    result.set({
      id: id
    });
    _ref1 = ["label", "type", "repeatable", "select-options", "radio-options", "autocomplete-options", "validation", "required"];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      property = _ref1[_i];
      attribute = {};
      propertyValue = question.find("#" + property + "-" + id).val();
      if (property === "required") {
        propertyValue = String(question.find("#" + property + "-" + id).is(":checked"));
      }
      if (propertyValue != null) {
        attribute[property] = propertyValue;
        result.set(attribute);
      }
    }
    if (question.find(".question-definition").length > 0) {
      result.set({
        questions: Question.fromDomNode(question.children(".question-definition"))
      });
    }
    return result;
  }).compact().value();
};

/*
//@ sourceMappingURL=Question.map
*/
