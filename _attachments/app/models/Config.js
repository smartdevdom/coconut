// Generated by CoffeeScript 1.6.2
var Config, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Config = (function(_super) {
  __extends(Config, _super);

  function Config() {
    _ref = Config.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Config.prototype.initialize = function() {
    if (this.database_name() !== this.cloud_database_name()) {
      console.warn("Local and cloud database names are different: " + (this.database_name()) + " <-> " + (this.cloud_database_name()));
    }
    return this.set({
      _id: "coconut.config"
    });
  };

  Config.prototype.fetch = function(options) {
    Config.__super__.fetch.call(this);
    Coconut.config.local = new LocalConfig();
    return Coconut.config.local.fetch({
      success: function() {
        return typeof options.success === "function" ? options.success() : void 0;
      },
      error: function() {
        return typeof options.error === "function" ? options.error() : void 0;
      }
    });
  };

  Config.prototype.url = "/configuration";

  Config.prototype.title = function() {
    return this.get("title") || "Coconut";
  };

  Config.prototype.database_name = function() {
    return Backbone.couch_connector.config.db_name;
  };

  Config.prototype.cloud_database_name = function() {
    return Backbone.couch_connector.config.db_name;
  };

  Config.prototype.design_doc_name = function() {
    return Backbone.couch_connector.config.ddoc_name;
  };

  Config.prototype.cloud_url = function() {
    return "http://" + (this.get("cloud")) + "/" + (this.cloud_database_name());
  };

  Config.prototype.cloud_url_with_credentials = function() {
    return "http://" + (this.get("cloud_credentials")) + "@" + (this.get("cloud")) + "/" + (this.cloud_database_name());
  };

  return Config;

})(Backbone.Model);

/*
//@ sourceMappingURL=Config.map
*/
