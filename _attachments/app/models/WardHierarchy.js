// Generated by CoffeeScript 1.6.2
/*
wardHierarchy = new WardHierarchy()
wardHierarchy.fetch
  success: ->
    WardHierarchy.hierarchy = wardHierarchy.get("hierarchy")
    Backbone.history.start()
  error: (error) ->
    console.error "Error loading Ward Hierarchy: #{error}"
*/

var WardHierarchy, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

WardHierarchy = (function(_super) {
  __extends(WardHierarchy, _super);

  function WardHierarchy() {
    _ref = WardHierarchy.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  WardHierarchy.prototype.initialize = function() {
    return this.set({
      _id: "Ward Hierarchy"
    });
  };

  WardHierarchy.prototype.url = "/wardHierarchy";

  WardHierarchy.byWard = function(targetWard) {
    var result;

    result = {};
    _.each(WardHierarchy.hierarchy, function(districts, region) {
      return _.each(districts, function(constituans, district) {
        return _.each(constituans, function(wards, constituan) {
          return _.each(wards, function(ward) {
            if (ward === targetWard) {
              return result = {
                region: region,
                district: district,
                constituan: constituan
              };
            }
          });
        });
      });
    });
    return result;
  };

  WardHierarchy.region = function(ward) {
    if (ward == null) {
      return;
    }
    return WardHierarchy.byWard(ward.toUpperCase()).region;
  };

  WardHierarchy.district = function(ward) {
    if (ward == null) {
      return;
    }
    return WardHierarchy.byWard(ward.toUpperCase()).district;
  };

  WardHierarchy.constituan = function(ward) {
    if (ward == null) {
      return;
    }
    return WardHierarchy.byWard(ward.toUpperCase()).constituan;
  };

  WardHierarchy.ward = function(ward) {
    return ward;
  };

  WardHierarchy.shehia = function(shehia) {
    return shehia;
  };

  WardHierarchy.allRegions = function() {
    return _.sortBy(_.keys(WardHierarchy.hierarchy), function(region) {
      return region;
    });
  };

  WardHierarchy.allDistricts = function() {
    return _.chain(_.map(WardHierarchy.hierarchy, function(districts, region) {
      return _.keys(districts);
    })).flatten().sortBy(function(district) {
      return district;
    }).value();
  };

  WardHierarchy.allConstituans = function() {
    return _.chain(_.map(WardHierarchy.hierarchy, function(districts, region) {
      return _.map(districts, function(constituans, district) {
        return _.keys(constituans);
      });
    })).flatten().sortBy(function(constituan) {
      return constituan;
    }).value();
  };

  WardHierarchy.allWards = function(options) {
    if (options == null) {
      options = {};
    }
    return _.chain(_.map(WardHierarchy.hierarchy, function(districts, region) {
      if (options.region) {
        if (region !== options.region) {
          return;
        }
      }
      return _.map(districts, function(constituans, district) {
        if (options.district) {
          if (district !== options.district) {
            return;
          }
        }
        return _.map(constituans, function(wards, constituan) {
          if (options.constituan) {
            if (constituan !== options.constituan) {
              return;
            }
          }
          return wards;
        });
      });
    })).flatten().compact().sortBy(function(ward) {
      return ward;
    }).value();
  };

  return WardHierarchy;

})(Backbone.Model);

/*
//@ sourceMappingURL=WardHierarchy.map
*/