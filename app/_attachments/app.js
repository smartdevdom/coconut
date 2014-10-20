// Generated by CoffeeScript 1.6.3
var Coconut, Router, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    "login": "login",
    "logout": "logout",
    "design": "design",
    "select": "select",
    "show/customResults/:question_id": "showCustomResults",
    "show/results/:question_id": "showResults",
    "new/result": "newResult",
    "new/result/:question_id": "newResult",
    "new/result/:question_id/:options": "newResult",
    "edit/result/:result_id": "editResult",
    "edit/result/:result_id/:options": "editResult",
    "view/result/:result_id/:options": "viewResult",
    "delete/result/:result_id": "deleteResult",
    "delete/result/:result_id/:confirmed": "deleteResult",
    "edit/resultSummary/:question_id": "editResultSummary",
    "analyze/:form_id": "analyze",
    "delete/:question_id": "deleteQuestion",
    "edit/:question_id": "editQuestion",
    "manage": "manage",
    "sync": "sync",
    "sync/send": "syncSend",
    "sync/get": "syncGet",
    "sync/send_and_get": "syncSendAndGet",
    "configure": "configure",
    "map": "map",
    "reports": "reports",
    "reports/:question_id/*options": "reports",
    "reportscsv/:question_id/*options": "reportsCSV",
    "reportregsurvey/:question_id/*options": "reportRegSurvey",
    "reportregsurveycsv/:question_id/*options": "reportRegSurveyCSV",
    "dashboard": "dashboard",
    "dashboard/*options": "dashboard",
    "alerts": "alerts",
    "show/case/:caseID": "showCase",
    "users": "users",
    "messaging": "messaging",
    "help": "help",
    "summary/:client_id": "summary",
    "update/inactive/:result_id": "markInactive",
    "attendancelist/:question_id/*options": "attendancelist",
    "marp/:question_id/:options": "marpData",
    "": "default"
  };

  Router.prototype.route = function(route, name, callback) {
    var _this = this;
    Backbone.history || (Backbone.history = new Backbone.History);
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    return Backbone.history.route(route, function(fragment) {
      var args;
      args = _this._extractParameters(route, fragment);
      callback.apply(_this, args);
      $('#loading').slideDown();
      _this.trigger.apply(_this, ['route:' + name].concat(args));
      return $('#loading').fadeOut();
    }, this);
  };

  Router.prototype.help = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.helpView == null) {
          Coconut.helpView = new HelpView();
        }
        return Coconut.helpView.render();
      }
    });
  };

  Router.prototype.users = function() {
    return this.adminLoggedIn({
      success: function() {
        if (Coconut.usersView == null) {
          Coconut.usersView = new UsersView();
        }
        return Coconut.usersView.render();
      }
    });
  };

  Router.prototype.messaging = function() {
    return this.adminLoggedIn({
      success: function() {
        if (Coconut.messagingView == null) {
          Coconut.messagingView = new MessagingView();
        }
        return Coconut.messagingView.render();
      }
    });
  };

  Router.prototype["default"] = function() {
    switch (Coconut.config.local.get("mode")) {
      case "cloud":
        return Coconut.router.navigate("dashboard", true);
      case "mobile":
        return Coconut.router.navigate("new/result", true);
    }
  };

  Router.prototype.clientLookup = function() {
    if (Coconut.scanBarcodeView == null) {
      Coconut.scanBarcodeView = new ScanBarcodeView();
    }
    return Coconut.scanBarcodeView.render();
  };

  Router.prototype.summary = function(clientID) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.clientSummary == null) {
          Coconut.clientSummary = new ClientSummaryView();
        }
        Coconut.clientSummary.client = new Client({
          clientID: clientID
        });
        return Coconut.clientSummary.client.fetch({
          success: function() {
            if (Coconut.clientSummary.client.hasDemographicResult()) {
              return Coconut.clientSummary.render();
            } else {
              return Coconut.router.navigate("/new/result/Client Demographics/" + clientID, true);
            }
          },
          error: function() {
            throw "Could not fetch or create client with " + clientID;
          }
        });
      }
    });
  };

  Router.prototype.userLoggedIn = function(callback) {
    return User.isAuthenticated({
      success: function(user) {
        return callback.success(user);
      },
      error: function() {
        Coconut.loginView.callback = callback;
        return Coconut.loginView.render();
      }
    });
  };

  Router.prototype.adminLoggedIn = function(callback) {
    return this.userLoggedIn({
      success: function(user) {
        if (User.currentUser.isAdmin()) {
          return callback.success(user);
        }
      },
      error: function() {
        return $("#content").html("<h2>Must be an admin user</h2>");
      }
    });
  };

  Router.prototype.logout = function() {
    User.logout();
    return Coconut.router.navigate("", true);
  };

  Router.prototype.alerts = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.config.local.mode === "mobile") {
          return $("#content").html("Alerts not available in mobile mode.");
        } else {
          return $("#content").html("            <h1>Alerts</h1>            <ul>              <li>                <b>Localised Epidemic</b>: More than 10 cases per square kilometer in KATI district near BAMBI shehia (map <a href='#reports/location'>Map</a>). Recommend active case detection in shehia.              </li>              <li>                <b>Abnormal Data Detected</b>: Only 1 case reported in MAGHARIBI district for June 2012. Expected amount: 25. Recommend checking that malaria test kits are available at all health facilities in MAGHARIBI.              </li>            </ul>          ");
        }
      }
    });
  };

  Router.prototype.reports = function(quid, s_options) {
    var reportOptions;
    if (s_options == null) {
      s_options = '';
    }
    if (Coconut.config.local.mode === "mobile") {
      return $("#content").html("Reports not available in mobile mode.");
    }
    quid = unescape(decodeURIComponent(quid));
    reportOptions = {};
    s_options.replace(/([^=\/]+)=([^\/]*)/g, function(m, key, value) {
      reportOptions[key] = value;
      return console.log(m, key, value);
    });
    reportOptions['quid'] = quid;
    reportOptions['reportType'] = "results";
    if (Coconut.reportView == null) {
      Coconut.reportView = new ReportView(reportOptions);
    }
    return Coconut.reportView.render(reportOptions);
  };

  Router.prototype.reportsCSV = function(quid, s_options) {
    var reportOptions;
    if (s_options == null) {
      s_options = '';
    }
    if (Coconut.config.local.mode === "mobile") {
      return $("#content").html("Reports not available in mobile mode.");
    }
    quid = unescape(decodeURIComponent(quid));
    reportOptions = {};
    s_options.replace(/([^=\/]+)=([^\/]*)/g, function(m, key, value) {
      reportOptions[key] = value;
      return console.log(m, key, value);
    });
    reportOptions['quid'] = quid;
    reportOptions['reportType'] = "results";
    if (Coconut.reportViewCSV == null) {
      Coconut.reportViewCSV = new ReportViewOnlyCSV(reportOptions);
    }
    return Coconut.reportViewCSV.render(reportOptions);
  };

  Router.prototype.reportRegSurvey = function(quid, s_options) {
    var reportOptions;
    if (s_options == null) {
      s_options = '';
    }
    if (Coconut.config.local.mode === "mobile") {
      return $("#content").html("Reports not available in mobile mode.");
    }
    quid = unescape(decodeURIComponent(quid));
    reportOptions = {};
    s_options.replace(/([^=\/]+)=([^\/]*)/g, function(m, key, value) {
      reportOptions[key] = value;
      return console.log(m, key, value);
    });
    reportOptions['quid'] = quid;
    reportOptions['reportType'] = "results";
    if (Coconut.reportView == null) {
      Coconut.reportView = new RegSurveyReportView(reportOptions);
    }
    return Coconut.reportView.render(reportOptions);
  };

  Router.prototype.reportRegSurveyCSV = function(quid, s_options) {
    var reportOptions;
    if (s_options == null) {
      s_options = '';
    }
    if (Coconut.config.local.mode === "mobile") {
      return $("#content").html("Reports not available in mobile mode.");
    }
    quid = unescape(decodeURIComponent(quid));
    reportOptions = {};
    s_options.replace(/([^=\/]+)=([^\/]*)/g, function(m, key, value) {
      reportOptions[key] = value;
      return console.log(m, key, value);
    });
    reportOptions['quid'] = quid;
    reportOptions['reportType'] = "results";
    if (Coconut.reportView == null) {
      Coconut.reportView = new RegSurveyReportViewOnlyCSV(reportOptions);
    }
    return Coconut.reportView.render(reportOptions);
  };

  Router.prototype.dashboard = function(options) {
    return this.userLoggedIn({
      success: function() {
        var reportViewOptions;
        if (Coconut.config.local.mode === "mobile") {
          return $("#content").html("Reports not available in mobile mode.");
        } else {
          options = options != null ? options.split(/\//) : void 0;
          reportViewOptions = {};
          _.each(options, function(option, index) {
            if (!(index % 2)) {
              return reportViewOptions[option] = options[index + 1];
            }
          });
          console.log("ASDSA");
          if (Coconut.dashboardView == null) {
            Coconut.dashboardView = new DashboardView();
          }
          return Coconut.dashboardView.render(reportViewOptions);
        }
      }
    });
  };

  Router.prototype.showCase = function(caseID) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.caseView == null) {
          Coconut.caseView = new CaseView();
        }
        Coconut.caseView["case"] = new Case({
          caseID: caseID
        });
        return Coconut.caseView["case"].fetch({
          success: function() {
            return Coconut.caseView.render();
          }
        });
      }
    });
  };

  Router.prototype.configure = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.localConfigView == null) {
          Coconut.localConfigView = new LocalConfigView();
        }
        return Coconut.localConfigView.render();
      }
    });
  };

  Router.prototype.editResultSummary = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.resultSummaryEditor == null) {
          Coconut.resultSummaryEditor = new ResultSummaryEditorView();
        }
        Coconut.resultSummaryEditor.question = new Question({
          id: unescape(question_id)
        });
        return Coconut.resultSummaryEditor.question.fetch({
          success: function() {
            return Coconut.resultSummaryEditor.render();
          }
        });
      }
    });
  };

  Router.prototype.editQuestion = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.designView == null) {
          Coconut.designView = new DesignView();
        }
        Coconut.designView.render();
        return Coconut.designView.loadQuestion(unescape(question_id));
      }
    });
  };

  Router.prototype.deleteQuestion = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        return Coconut.questions.get(unescape(question_id)).destroy({
          success: function() {
            Coconut.menuView.render();
            return Coconut.router.navigate("manage", true);
          }
        });
      }
    });
  };

  Router.prototype.sync = function(action) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.syncView == null) {
          Coconut.syncView = new SyncView();
        }
        return Coconut.syncView.render();
      }
    });
  };

  Router.prototype.syncSend = function(action) {
    Coconut.router.navigate("", false);
    return this.userLoggedIn({
      success: function() {
        if (Coconut.syncView == null) {
          Coconut.syncView = new SyncView();
        }
        return Coconut.syncView.sync.sendToCloud({
          success: function() {
            return Coconut.syncView.update();
          }
        });
      }
    });
  };

  Router.prototype.syncGet = function(action) {
    Coconut.router.navigate("", false);
    return this.userLoggedIn({
      success: function() {
        if (Coconut.syncView == null) {
          Coconut.syncView = new SyncView();
        }
        return Coconut.syncView.sync.getFromCloud();
      }
    });
  };

  Router.prototype.syncSendAndGet = function(action) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.syncView == null) {
          Coconut.syncView = new SyncView();
        }
        return Coconut.syncView.sync.sendAndGetFromCloud({
          success: function() {
            return _.delay(function() {
              Coconut.router.navigate("", false);
              return document.location.reload();
            }, 1000);
          }
        });
      }
    });
  };

  Router.prototype.manage = function() {
    return this.adminLoggedIn({
      success: function() {
        if (Coconut.manageView == null) {
          Coconut.manageView = new ManageView();
        }
        return Coconut.manageView.render();
      }
    });
  };

  Router.prototype.newResult = function(question_id, s_options) {
    var db, question, quid, standard_values, surveyByUUID, uuid;
    if (s_options == null) {
      s_options = '';
    }
    quid = unescape(decodeURIComponent(question_id));
    standard_values = {};
    s_options.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
      return standard_values[key] = value;
    });
    standard_values['question'] = quid;
    question = new Question({
      "id": quid
    });
    if (question_id === "Exit Survey-es") {
      return question.fetch({
        success: function() {
          var _this = this;
          return $.ajax({
            url: "http://107.20.181.244/cocorest/views/wsfindprogramnames.json",
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
              withOrigin: true
            },
            success: function(response) {
              Coconut.questionView = new QuestionView({
                standard_values: _(standard_values).omit('question'),
                result: new Result(standard_values),
                model: question,
                wsData: {
                  'programsList': response
                }
              });
              return Coconut.questionView.render();
            }
          });
        }
      });
    } else if (question_id === "Participant Survey-es") {
      uuid = standard_values['uuid'];
      db = $.couch.db("coconut");
      surveyByUUID = 'coconut/byUUIDForReportActions?key="' + uuid + '"';
      return db.view(surveyByUUID, {
        success: function(data) {
          if (data.rows.length === 0) {
            return question.fetch({
              success: function() {
                Coconut.questionView = new QuestionView({
                  standard_values: _(standard_values).omit('question'),
                  result: new Result(standard_values),
                  model: question
                });
                return Coconut.questionView.render();
              }
            });
          } else {
            return alert("Encuesta para este usuario ya existe!");
          }
        },
        error: function(data) {
          return alert("Someting wrong");
        }
      });
    } else {
      return question.fetch({
        success: function() {
          Coconut.questionView = new QuestionView({
            standard_values: _(standard_values).omit('question'),
            result: new Result(standard_values),
            model: question
          });
          return Coconut.questionView.render();
        }
      });
    }
  };

  Router.prototype.editResult = function(result_id, s_options) {
    if (s_options == null) {
      s_options = '';
    }
    return this.userLoggedIn({
      success: function() {
        var standard_values;
        standard_values = {};
        s_options.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
          return standard_values[key] = value;
        });
        if (Coconut.questionView == null) {
          Coconut.questionView = new QuestionView();
        }
        Coconut.questionView.standard_values = standard_values;
        Coconut.questionView.readonly = false;
        Coconut.questionView.result = new Result({
          _id: result_id
        });
        return Coconut.questionView.result.fetch({
          success: function() {
            Coconut.questionView.model = new Question({
              id: Coconut.questionView.result.question()
            });
            return Coconut.questionView.model.fetch({
              success: function() {
                return Coconut.questionView.render();
              }
            });
          }
        });
      }
    });
  };

  Router.prototype.viewResult = function(result_id, s_options) {
    var standard_values;
    if (s_options == null) {
      s_options = '';
    }
    standard_values = {};
    s_options.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
      return standard_values[key] = value;
    });
    if (Coconut.questionView == null) {
      Coconut.questionView = new QuestionView();
    }
    Coconut.questionView.standard_values = standard_values;
    Coconut.questionView.readonly = false;
    Coconut.questionView.result = new Result({
      _id: result_id
    });
    return Coconut.questionView.result.fetch({
      success: function() {
        Coconut.questionView.model = new Question({
          id: Coconut.questionView.result.question()
        });
        return Coconut.questionView.model.fetch({
          success: function() {
            return Coconut.questionView.renderSummary();
          }
        });
      }
    });
  };

  Router.prototype.deleteResult = function(result_id, confirmed) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.questionView == null) {
          Coconut.questionView = new QuestionView();
        }
        Coconut.questionView.readonly = true;
        Coconut.questionView.result = new Result({
          _id: result_id
        });
        return Coconut.questionView.result.fetch({
          success: function() {
            if (confirmed === "confirmed") {
              return Coconut.questionView.result.destroy({
                success: function() {
                  Coconut.menuView.update();
                  return Coconut.router.navigate("show/results/" + (escape(Coconut.questionView.result.question())), true);
                }
              });
            } else {
              Coconut.questionView.model = new Question({
                id: Coconut.questionView.result.question()
              });
              return Coconut.questionView.model.fetch({
                success: function() {
                  Coconut.questionView.render();
                  $("#content").prepend("                    <h2>Are you sure you want to delete this result?</h2>                    <div id='confirm'>                      <a href='#delete/result/" + result_id + "/confirmed'>Yes</a>                      <a href='#show/results/" + (escape(Coconut.questionView.result.question())) + "'>Cancel</a>                    </div>                  ");
                  $("#confirm a").button();
                  $("#content form").css({
                    "background-color": "#333",
                    "margin": "50px",
                    "padding": "10px"
                  });
                  return $("#content form label").css({
                    "color": "white"
                  });
                }
              });
            }
          }
        });
      }
    });
  };

  Router.prototype.design = function() {
    return this.userLoggedIn({
      success: function() {
        $("#content").empty();
        if (Coconut.designView == null) {
          Coconut.designView = new DesignView();
        }
        return Coconut.designView.render();
      }
    });
  };

  Router.prototype.markInactive = function(uuid) {
    var db;
    db = void 0;
    db = $.couch.db("coconut");
    db.view("coconut/byUUID?key=\"" + uuid + "\"", {
      success: function(data) {
        var i, numRows;
        i = void 0;
        numRows = void 0;
        numRows = data.rows.length;
        i = 0;
        while (i < numRows) {
          invalideDocById(data.rows[i].id);
          i++;
        }
        $("#content").empty();
        $("#content").html("<p align='center' style='font-size:12pt'>Documento fue marcado exitosamente como no activo. Ya no se mostrará como resultado.</p>");
      },
      error: function() {
        console.log("someting wrong...");
      }
    });
  };

  Router.prototype.attendancelist = function(question_id, s_options) {
    var activity_id, activity_provider_id, db, quid, standard_values;
    if (s_options == null) {
      s_options = '';
    }
    quid = unescape(decodeURIComponent(question_id));
    standard_values = {};
    s_options.replace(/([^=\/]+)=([^\/]*)/g, function(m, key, value) {
      return standard_values[key] = value;
    });
    activity_provider_id = standard_values['activity_provider_id'];
    activity_id = standard_values['activity_id'];
    db = void 0;
    db = $.couch.db("coconut");
    return db.view("coconut/findParticipantsByProvider?key=\"" + activity_provider_id + "\"", {
      success: function(participants) {
        return db.view("coconut/findAttendanceByActivity?key=\"" + activity_id + "\"", {
          success: function(attendanceList) {
            var question, result;
            if (attendanceList.rows.length === 0) {
              standard_values['question'] = quid;
              question = new Question({
                "id": quid
              });
              return question.fetch({
                success: function() {
                  Coconut.attendanceListView = new AttendanceListView({
                    standard_values: _(standard_values).omit('question'),
                    result: new Result(standard_values),
                    model: question,
                    wsData: {
                      'participants': participants
                    }
                  });
                  return Coconut.attendanceListView.render();
                }
              });
            } else {
              result = attendanceList.rows[0];
              if (Coconut.attendanceListView == null) {
                Coconut.attendanceListView = new AttendanceListView;
              }
              Coconut.attendanceListView.standard_values = standard_values;
              Coconut.attendanceListView.wsData = {
                'participants': participants
              };
              Coconut.attendanceListView.result = new Result({
                _id: result.id
              });
              return Coconut.attendanceListView.result.fetch({
                success: function() {
                  Coconut.attendanceListView.model = new Question({
                    id: Coconut.attendanceListView.result.question()
                  });
                  return Coconut.attendanceListView.model.fetch({
                    success: function() {
                      return Coconut.attendanceListView.render();
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  };

  Router.prototype.marpData = function(question_id, s_options) {
    var db, participant_id, quid, standard_values;
    if (s_options == null) {
      s_options = '';
    }
    quid = unescape(decodeURIComponent(question_id));
    standard_values = {};
    s_options.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
      return standard_values[key] = value;
    });
    participant_id = standard_values['uuid'];
    db = void 0;
    db = $.couch.db("coconut");
    return db.view("coconut/findMARPByUUID?key=\"" + participant_id + "\"", {
      success: function(marpList) {
        var question, result;
        if (marpList.rows.length === 0) {
          standard_values['question'] = quid;
          question = new Question({
            "id": quid
          });
          return question.fetch({
            success: function() {
              Coconut.questionView = new QuestionView({
                standard_values: _(standard_values).omit('question'),
                result: new Result(standard_values),
                model: question,
                wsData: {
                  'participant_id': participant_id
                }
              });
              return Coconut.questionView.render();
            }
          });
        } else {
          result = marpList.rows[0];
          if (Coconut.questionView == null) {
            Coconut.questionView = new QuestionView;
          }
          Coconut.questionView.standard_values = standard_values;
          Coconut.questionView.wsData = {
            'participant_id': participant_id
          };
          Coconut.questionView.result = new Result({
            _id: result.id
          });
          return Coconut.questionView.result.fetch({
            success: function() {
              Coconut.questionView.model = new Question({
                id: Coconut.questionView.result.question()
              });
              return Coconut.questionView.model.fetch({
                success: function() {
                  return Coconut.questionView.render();
                }
              });
            }
          });
        }
      }
    });
  };

  Router.prototype.showCustomResults = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.customResultsView == null) {
          Coconut.customResultsView = new CustomResultsView();
        }
        Coconut.customResultsView.question = new Question({
          id: unescape(question_id)
        });
        return Coconut.customResultsView.question.fetch({
          success: function() {
            return Coconut.customResultsView.render();
          }
        });
      }
    });
  };

  Router.prototype.showResults = function(question_id) {
    if (Coconut.resultsView == null) {
      Coconut.resultsView = new ResultsView();
    }
    Coconut.resultsView.question = new Question({
      id: unescape(question_id)
    });
    return Coconut.resultsView.question.fetch({
      success: function() {
        return Coconut.resultsView.render();
      }
    });
  };

  Router.prototype.map = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.mapView == null) {
          Coconut.mapView = new MapView();
        }
        return Coconut.mapView.render();
      }
    });
  };

  Router.prototype.startApp = function() {
    Coconut.config = new Config();
    return Coconut.config.fetch({
      success: function() {
        if ("module" !== Coconut.config.local.get("mode")) {
          $("[data-role=footer]").html("            <div class='question-buttons' id='bottom-menu'></div>            <div style='padding-top:50px;padding-bottom:50px' id='footer-menu'>              <center>              <span style='font-size:75%;display:inline-block'>                <span id='user'></span>              </span>              " + ((function() {
            switch (Coconut.config.local.get("mode")) {
              case "cloud":
                return "                      <a href='#login'>Login</a>                      <a href='#logout'>Logout</a>                      <a id='reports' href='#reports'>Reports</a>                      <a id='manage-button' href='#manage'>Manage</a>                      &nbsp;                    ";
              case "mobile":
                return "                      <a href='#sync/send_and_get'>Sync (last done: <span class='sync-sent-and-get-status'></span>)</a>                    ";
            }
          })()) + "              <a href='#help'>Help</a>              <span style='font-size:75%;display:inline-block'>Version<br/><span id='version'></span></span>              <span style='font-size:75%;display:inline-block'><br/><span id='databaseStatus'></span></span>              </center>              </div>          ").navbar();
          $('#application-title').html(Coconut.config.title());
        }
        Coconut.loginView = new LoginView();
        Coconut.questions = new QuestionCollection();
        Coconut.questionView = new QuestionView();
        Coconut.menuView = new MenuView();
        Coconut.syncView = new SyncView();
        Coconut.menuView.render();
        Coconut.syncView.update();
        return Backbone.history.start();
      },
      error: function() {
        if (Coconut.localConfigView == null) {
          Coconut.localConfigView = new LocalConfigView();
        }
        return Coconut.localConfigView.render();
      }
    });
  };

  return Router;

})(Backbone.Router);

Coconut = {};

Coconut.router = new Router();

Coconut.router.startApp();

Coconut.debug = function(string) {
  console.log(string);
  return $("#log").append(string + "<br/>");
};

/*
//@ sourceMappingURL=app.map
*/
