// Generated by CoffeeScript 1.6.2
var LocalConfig, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

LocalConfig = (function(_super) {
  __extends(LocalConfig, _super);

  function LocalConfig() {
    _ref = LocalConfig.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LocalConfig.prototype.initialize = function() {
    return this.set({
      _id: "coconut.config.local"
    });
  };

  LocalConfig.prototype.url = "/local_configuration";

  return LocalConfig;

})(Backbone.Model);

/*
//@ sourceMappingURL=LocalConfig.map
*/
