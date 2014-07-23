// Generated by CoffeeScript 1.6.3
var OldReportView, ReportViewOnlyCSV, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  _this = this;

ReportViewOnlyCSV = (function(_super) {
  __extends(ReportViewOnlyCSV, _super);

  function ReportViewOnlyCSV() {
    _ref = ReportViewOnlyCSV.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ReportViewOnlyCSV.prototype.el = "#content";

  ReportViewOnlyCSV.prototype.events = {
    "keyup #search": "filter"
  };

  ReportViewOnlyCSV.prototype.getCompletedDocsUUIDsAndFetch = function() {
    var completedDocs, db, results, _this;
    results = void 0;
    _this = this;
    completedDocs = void 0;
    results = new ResultCollection;
    results.model = Result;
    results.url = "result";
    db = $.couch.db("coconut");
    return db.view("coconut/byUUIDForReportActions", {
      success: function(data) {
        _this.completedDocs = data;
        return results.fetch({
          "question": _this.quid,
          success: function(allResults) {
            var fields;
            fields = void 0;
            console.log(allResults.first());
            window.allResults = allResults;
            console.log("trying to get all from");
            console.log(_this.quid);
            _this.results = allResults.where({
              question: _this.quid
            });
            fields = _.chain(_this.results).map(function(result) {
              return _.keys(result.attributes);
            }).flatten().uniq().value();
            if (_this["isActions"] !== void 0) {
              _this.fields = _(fields).without("_id", "_rev", "test", "user", "question", "collection", "createdAt", "lastModifiedAt", "Teléfono", "Calleynumero", "Día", "Mes", "Año", "Celular", "Casa", "Direccióndecorreoelectrónico", "NombredeusuariodeFacebook", "Nombredepersonadecontacto", "Parentescoopersonarelacionada", "Completado", "savedBy", "Sexo", "Tieneunnumerocelular", "Tieneunnumerodetelefonoenlacasa", "Tieneunadireccióndecorreoelectrónico", "TieneunnombredeusuariodeFacebook");
            } else {
              _this.fields = _(fields).without("_id", "_rev", "test", "user", "question", "collection");
            }
            return _this.render();
          }
        });
      },
      error: function(data) {
        return alert("Someting wrong");
      }
    });
  };

  ReportViewOnlyCSV.prototype.initialize = function(options) {
    var key, results, urlParams, value,
      _this = this;
    urlParams = [];
    this.$el.append('<div id="reportloader"><marquee ALIGN="Top" LOOP="infinite"  DIRECTION="right" style="font-size:24px; color:#FF8000">Cargando el informe. Por favor espera ...</marquee></div>');
    for (key in options) {
      value = options[key];
      this[key] = value;
      if (key !== "startDate" && key !== "endDate") {
        urlParams.push("" + key + "=" + value + "");
      }
    }
    this.urlParams = urlParams;
    console.log(this.quid);
    if (this['quid'] === "Participant Survey-es") {
      results = new ResultCollectionSurvey;
    } else {
      results = new ResultCollection;
    }
    results.model = Result;
    results.url = "result";
    if (this["isActions"] !== void 0) {
      return _this.getCompletedDocsUUIDsAndFetch();
    } else {
      return results.fetch({
        "question": this.quid,
        success: function(allResults) {
          var fields;
          console.log(allResults.first());
          window.allResults = allResults;
          console.log("trying to get all from");
          console.log(_this.quid);
          _this.results = allResults.where({
            "question": _this.quid
          });
          fields = _.chain(_this.results).map(function(result) {
            return _.keys(result.attributes);
          }).flatten().uniq().value();
          if (_this["isActions"] !== void 0) {
            _this.fields = _(fields).without("_id", "_rev", "test", "user", "question", "collection", "createdAt", "lastModifiedAt", "Teléfono", "Calleynumero", "Día", "Mes", "Año", "Celular", "Casa", "Direccióndecorreoelectrónico", "NombredeusuariodeFacebook", "Nombredepersonadecontacto", "Parentescoopersonarelacionada", "Completado", "savedBy", "Sexo", "Tieneunnumerocelular", "Tieneunnumerodetelefonoenlacasa", "Tieneunadireccióndecorreoelectrónico", "TieneunnombredeusuariodeFacebook");
          } else if (_this.quid === "Participant Survey-es") {
            _this.fields = _(fields).without("_id", "_rev", "test", "user", "question", "collection", "16Estasactualmenteasistiendoaunaescuelaouniversidad", "16ACuáleselnombredetuescuelaouniversidad", "16ACuáleselnombredetuescuelaouniversidad", "20Enlosúltimos12meseshassidosuspendidoadelaescuela", "17Estasactualmenteasistiendoaalgunodeestosprogramas", "18Hasrepetidouncursoenlaescuela", "18ACuálescursos", "21ACuálescursos", "23Hasidosuspendidoadelaescuela", "24Conrespectoatueducaciónquétegustaríalograrenelfuturo", "26Hasrealizadoalgunavezuntrabajoporpagaoganancia", "27Durantelaúltimasemanarealizastealgúntrabajoporpagaoganancia", "271Describeloquehaceseneltrabajoactual", "28Cuándocomenzasteeneltrabajoactual", "28Mes", "28Año", "29Enquélugarrealizasestetrabajo", "29EnquélugarOtros", "30Cuántashorastrabajasenundía", "31Cuántosdíastrabajasenunasemana", "32Enpromediocuántoganasenunasemana", "33Enestetrabajotúeres", "33OtroTúeres", "34Actualmenterealizasalgúntrabajoenelquenosetepagaonorecibesganancia", "34ADescribeloquehacesenestetrabajo", "35Cuándocomenzasteatrabajarenestetrabajo", "35Mes", "35Año", "36Enquélugarrealizasestetrabajo", "36EnquélugarrealizasestetrabajoOtros", "37Cuántashorastrabajasenundía", "38Cuántosdíastrabajasenunasemana", "39Enestetrabajotúeres", "39EnestetrabajotúeresOtro", "40Hasbuscadounnuevoomejorempleoenelúltimomes", "", "42Hasparticipadoenalgúnprogramadedesarrollodeempleo", "43Conquéfrecuenciatepreocupaservíctimadeladelincuenciaentubarrio", "44Conquéfrecuenciatepreocupaservíctimadeladelincuenciaentuescuelaouniversidad", "45Enquémedidatuvidahasidoafectadaporladelincuencia", "46Entuopiniónladelincuenciaesunproblemagraveentubarrio", "47Tepreocupalapresenciadepandillasentubarrio", "48Lapreocupaciónporladelincuenciaocrimenteimpiderealizarlascosasquedeseashacerentubarrio", "49Hastenidoalgunavezunaovariasdelassiguientesexperienciasconlapolicía", "49AUnpolicíameamenazóverbalmente", "49BUnpolicíamecobródinerosinjustificación", "49CUnpolicíatomóalgoquepertenecíaamí", "49DUnpolicíamemaltratófísicamente", "50Hassidotransportadoenunapatrullapolicialporunaredadaoporsospechadelapolicíahaciati", "51Hassidodetenidoporlapolicíaporcualquiermotivo", "51ASucedióestoenlosúltimos12meses", "52HassidodetenidoporlaPolicíaacusadodecometeralgúndelito", "52ASucedióestoenlosúltimos12meses", "53AlgunodetusamigoshasidodetenidoalgunavezporlaPolicía", "53ASucedióestoenlosúltimos12meses", "54Enlosúltimos12meseshastomadoalgodeunatiendasinpagarporella", "55Enlosúltimos12meseshasparticipadoenalgunapeleaoriña", "56Enlosúltimos12meseshasllevadouncuchillopuñalomachete", "56AEncuáleslugarespasó", "57Enlosúltimos12meseshasllevadounarmadefuego", "57ASilarespuestaesafirmativaencuáleslugarespasó", "58Enlosúltimos12meseshasvistoaalguienqueestabasiendoapuñaladocortadoobaleado", "58AEncuáleslugarespasó", "59Enlosúltimos12mesesalguientehaamenazadoconuncuchilloounapistola", "59AEncuáleslugarespasó", "60Enlosúltimos12mesesalguientehacortadooapuñaladotangravementequetuvistequeiraunmédico", "60ASilarespuestaesafirmativaencuáleslugarespasó", "61Enlosúltimos12mesesalguientehadisparadoconunarmadefuego", "61AEncuáleslugarespasó", "62Enlosúltimos12meseshasamenazadoaalguienconcortarleapuñalarleodispararle", "62AEncuáleslugarespasó", "63Enlosúltimos12meseshasamenazadoaalguienconuncuchillooarma", "63AEncuáleslugarespasó", "64Enlosúltimos12meseshascortadooapuñaladoaalguien", "64AEncuáleslugarespasó", "65Enlosúltimos12meseslehasdisparadoaalguien", "65AEncuáleslugarespasó", "66Enlosúltimos12meseshastenidoalgúnamigoomiembrodetufamiliaquelehandisparadocortadooapuñalado", "67Hasdañadoodestruidoapropósitoartículosquenotepertenecen", "68Algunavezhassidoatacadoorobado", "69Algunavezhasatacadoorobadoaalguien", "70Algunavezhassidosecuestrado", "71Algunavezhassecuestradoaalguien", "72AlgunavezhasrobadoalgodeunatiendaoalgoquenotepertenecíaqueteníaunvalormenordeRD$200", "73AlgunavezharobadoalgodeunatiendaoalgoquenotepertenecíaqueteníaunvalormayordeRD$200incluyendocarros", "74Algunavezhasvendidooayudadoavenderdrogas", "75Hasestadoinvolucradoenunapandilla", "75AActualmenteestásinvolucradoenunapandilla", "76Compartestiempooterelacionasconmiembrosdeunapandilla", "76AEncuáleslugarespasó", "77Enlosúltimos12meseshashabladoocompartidoconalguienborrachooqueestabadrogado", "78Algunavezhastomadounabebidaalcohólica–unacopavasoenteronosólounsorbo", "78AEnlosúltimos12meseshasconsumidoalcohol", "78BEnlosúltimos12meseshastomadocincovasoscopasomásdebebidasalcohólicasenelmismodía", "79Hasprobadoalgunavezcualquieradeestasdrogasmarihuanacocaínaheroínapastillascrackcementoocualquierotracosaparadrogarse", "80Hasusadoenalgunaocasiónunaagujaparainyectartedroga", "81Marcaelnombredelasdrogasquehayasprobadoenalgúnmomento", "81AMarihuana", "81BCrack", "81CCocaínaenpolvo", "81DHeroína", "81EMetanfetaminaocristal", "81FÉxtasisMDMA", "81GInhalantescomopegamentocementopinturaspray", "81HNoresponde", "81IOtra", "82Marcaelnombredelasdrogasquehayasprobadoenlosúltimos12meses", "82AMarihuana", "82BCrack", "82CCocaínaenpolvo", "82DHeroína", "82EMetanfetaminaocristal", "82FÉxtasisMDMA", "82GInhalantescomopegamentocementopinturaspray", "81HNoresponde", "82IOtra", "83Encasodequehayasprobadoalgunadrogaleecadanombreydinosquéedadteníaslaprimeravezquelaprobaste", "83AMarihuana", "83BCrack", "83CCocaínaenpolvo", "83DHeroína", "83EMetanfetaminaocristal", "83FÉxtasisMDMA", "83GInhalantescomopegamentocementopinturaspray", "83HOtraand83HOtradroga", "84Algunavezhastenidorelacionessexuales", "85Quéedadteníaslaprimeravezquetuvisterelacionessexuales", "86Conquiéneshastenidorelacionessexuales", "87Concuántaspersonasdiferenteshastenidorelacionessexualesenlosúltimos12meses", "88Laúltimavezquetuvisterelacionessexualestuotucompañeroautilizóuncondón", "89LaúltimavezquetuvisterelacionessexualescuálmétodousasteotucompañeroaparaprevenirelembarazoSeleccionesólounaopción", "89Otro", "90Algunavezalguientehaobligadoatenerrelacionessexuales", "91Algunavezhastenidorelacionessexualespordinerobienescelularesviviendaetcoserviciosproteccióncomidaetc", "91ASilarespuestaesafirmativaCuándofuelaúltimavez", "92Siquisierascompraruncondóncreesquepodríasencontrarlo", "93Siquisierastenersexocreesqueseríascapazdeconvenceratuparejaqueuseuncondónencasoqueélellanoquiera", "94Tesientescapazdetenerunaconversaciónabiertayhonestasobresexoconsuspadres", "95Algunavezhastenidounaconversaciónabiertayhonestasobresexocontuspadres", "96AlgunaveztehanenseñadoacercadelasInfeccionesdetransmisiónsexual", "96ADóndehasrecibidoinformacióndelasInfeccionesdeTransmisiónSexual", "96AOtro", "97Algunavezlehanenseñadoacercadeprevencióndeembarazo", "97ADóndehasrecibidoinformacióndeprevencióndeembarazo", "97AOtro", "98AlgunavezlehanenseñadoacercalainfecciónporVIHSida", "98ADóndehasrecibidoinformacióndeVIHSida", "98AOtro", "81AMarihuana", "81BCrack", "81CCocaínaenpolvo", "81DHeroína", "81EMetanfetaminaocristal", "81FxtasisMDMA", "81FÉxtasisMDMA", "81GInhalantescomopegamentocementopinturaspray", "81HNoresponde", "81HOtraespecifica", "81IOtra", "81IOtradroga", "82AMarihuana", "82Algunavezhastenidorelacionessexuales", "82BCrack", "82CCocaínaenpolvo", "82DHeroína", "82EMetanfetaminaocristal", "82FxtasisMDMA", "82GInhalantescomopegamentocementopinturaspray", "82IOtra", "82IOtradroga", "83AMarihuana", "83BCrack", "83CCocaínaenpolvo", "83DHeroína", "83EMetanfetaminaocristal", "83FxtasisMDMA", "83GInhalantescomopegamentocementopinturaspray", "83HOtra", "83HOtradroga", "83Quéedadteníaslaprimeravezquetuvisterelacionessexuales", "35Año", "35EnquélugarrealizasestetrabajoOtros", "35Mes", "83AMarihuana", "83BCrack", "83CCocaínaenpolvo", "83DHeroína", "83EMetanfetaminaocristal", "83FxtasisMDMA", "83GInhalantescomopegamentocementopinturaspray", "83HOtra", "83HOtradroga", "83Quéedadteníaslaprimeravezquetuvisterelacionessexuales");
          } else {
            _this.fields = _(fields).without("_id", "_rev", "test", "user", "question", "collection");
          }
          return _this.render();
        }
      });
    }
  };

  ReportViewOnlyCSV.prototype.filter = function(event) {
    var id, query, row, _ref1, _results;
    query = this.$el.find("#search").val();
    _ref1 = this.searchRows;
    _results = [];
    for (id in _ref1) {
      row = _ref1[id];
      if (~row.indexOf(query) || query.length < 3) {
        _results.push(this.$el.find(".row-" + id).show());
      } else {
        _results.push(this.$el.find(".row-" + id).hide());
      }
    }
    return _results;
  };

  ReportViewOnlyCSV.prototype.render = function() {
    var a, blob, csvContent, field, innerValue, result, resval, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3;
    if (this.results === void 0) {
      return;
    }
    csvContent = "";
    _ref1 = this.fields;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      field = _ref1[_i];
      innerValue = "";
      if (field === void 0) {
        innerValue = '';
      } else {
        innerValue = field.toString();
      }
      resval = innerValue.replace(/"/g, '""');
      if (resval.search(/("|,|\n)/g) >= 0) {
        resval = '"' + result + '"';
      }
      csvContent += resval + ',';
    }
    csvContent += "\n";
    _ref2 = this.results;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      result = _ref2[_j];
      if (this['provider_id'] !== void 0 && result.get('provider_id') !== this['provider_id']) {
        continue;
      }
      _ref3 = this.fields;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        field = _ref3[_k];
        innerValue = "";
        if (result.get(field) === void 0 || result.get(field) === null) {
          innerValue = '';
        } else {
          innerValue = result.get(field).toString();
        }
        resval = innerValue.replace(/"/g, '""');
        if (resval.search(/("|,|\n)/g) >= 0) {
          resval = '"' + result + '"';
        }
        csvContent += resval + ',';
      }
      csvContent += "\n";
    }
    a = document.createElement('a');
    blob = new Blob([csvContent], {
      'type': 'application/octet-stream'
    });
    a.href = window.URL.createObjectURL(blob);
    a.download = "report.csv";
    $('#reportloader').hide();
    return a.click();
  };

  return ReportViewOnlyCSV;

})(Backbone.View);

OldReportView = (function(_super) {
  __extends(OldReportView, _super);

  function OldReportView() {
    this.viewQuery = __bind(this.viewQuery, this);
    this.render = __bind(this.render, this);
    this.update = __bind(this.update, this);
    _ref1 = OldReportView.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  OldReportView.prototype.initialize = function(options) {
    this.quid = options.quid;
    return $("html").append("          <link href='js-libraries/Leaflet/leaflet.css' type='text/css' rel='stylesheet' />          <script type='text/javascript' src='js-libraries/Leaflet/leaflet.js'></script>          <style>            .dissaggregatedResults{              display: none;            }          </style>        ");
  };

  OldReportView.prototype.el = '#content';

  OldReportView.prototype.events = {
    "change #reportOptions": "update",
    "change #summaryField": "summarize",
    "click #toggleDisaggregation": "toggleDisaggregation"
  };

  OldReportView.prototype.update = function() {
    var reportOptions, url;
    reportOptions = {
      startDate: $('#start').val(),
      endDate: $('#end').val(),
      reportType: $('#report-type :selected').text()
    };
    _.each(this.locationTypes, function(location) {
      return reportOptions[location] = $("#" + location + " :selected").text();
    });
    url = "reports/" + _.map(reportOptions, function(value, key) {
      return "" + key + "/" + (escape(value));
    }).join("/");
    return Coconut.router.navigate(url, true);
  };

  OldReportView.prototype.render = function(options) {
    var _this = this;
    this.reportType = options.reportType || "results";
    this.startDate = options.startDate || moment(new Date).subtract('days', 30).format("YYYY-MM-DD");
    this.endDate = options.endDate || moment(new Date).format("YYYY-MM-DD");
    return Coconut.questions.fetch({
      success: function() {}
    }, this.$el.html("              <style>                table.results th.header, table.results td{                  font-size:150%;                }              </style>              <table id='reportOptions'></table>              "), $("#reportOptions").append(this.formFilterTemplate({
      id: "question",
      label: "Question",
      form: "                      <select id='selected-question'>                        " + (Coconut.questions.map(function(question) {
        return "<option>" + (question.label()) + "</option>";
      }).join("")) + "                      </select>                    "
    })), $("#reportOptions").append(this.formFilterTemplate({
      id: "start",
      label: "Start Date",
      form: "<input id='start' type='date' value='" + this.startDate + "'/>"
    })), $("#reportOptions").append(this.formFilterTemplate({
      id: "end",
      label: "End Date",
      form: "<input id='end' type='date' value='" + this.endDate + "'/>"
    })), $("#reportOptions").append(this.formFilterTemplate({
      id: "report-type",
      label: "Report Type",
      form: "                <select id='report-type'>                  " + (_.map(["spreadsheet", "results", "summarytables"], function(type) {
        return "<option " + (type === _this.reportType ? "selected='true'" : void 0) + ">" + type + "</option>";
      }).join("")) + "                </select>                "
    })), this[this.reportType](), $('div[data-role=fieldcontain]').fieldcontain(), $('select').selectmenu(), $('input[type=date]').datebox({
      mode: "calbox"
    }));
  };

  OldReportView.prototype.hierarchyOptions = function(locationType, location) {
    if (locationType === "region") {
      return _.keys(WardHierarchy.hierarchy);
    }
    return _.chain(WardHierarchy.hierarchy).map(function(value, key) {
      if (locationType === "district" && location === key) {
        return _.keys(value);
      }
      return _.map(value, function(value, key) {
        if (locationType === "constituan" && location === key) {
          return _.keys(value);
        }
        return _.map(value, function(value, key) {
          if (locationType === "shehia" && location === key) {
            return value;
          }
        });
      });
    }).flatten().compact().value();
  };

  OldReportView.prototype.mostSpecificLocationSelected = function() {
    var mostSpecificLocationType, mostSpecificLocationValue;
    mostSpecificLocationType = "region";
    mostSpecificLocationValue = "ALL";
    _.each(this.locationTypes, function(locationType) {
      if (this[locationType] !== "ALL") {
        mostSpecificLocationType = locationType;
        return mostSpecificLocationValue = this[locationType];
      }
    });
    return {
      type: mostSpecificLocationType,
      name: mostSpecificLocationValue
    };
  };

  OldReportView.prototype.formFilterTemplate = function(options) {
    return "            <tr>              <td>                <label style='display:inline' for='" + options.id + "'>" + options.label + "</label>              </td>              <td style='width:150%'>                " + options.form + "                </select>              </td>            </tr>        ";
  };

  OldReportView.prototype.viewQuery = function(options) {
    var results;
    results = new ResultCollection();
    return results.fetch({
      question: this.quid,
      isComplete: true,
      include_docs: true,
      success: function() {
        results.fields = {};
        results.each(function(result) {
          return _.each(_.keys(result.attributes), function(key) {
            if (!_.contains(["_id", "_rev", "question"], key)) {
              return results.fields[key] = true;
            }
          });
        });
        results.fields = _.keys(results.fields);
        return options.success(results);
      }
    });
  };

  OldReportView.prototype.results = function() {
    var _this = this;
    this.$el.append("          <table id='results' class='tablesorter'>            <thead>              <tr>              </tr>            </thead>            <tbody>            </tbody>          </table>        ");
    return this.viewQuery({
      success: function(results) {
        var tableData;
        window.theseResults = results;
        tableData = results.map(function(result) {
          return _.map(results.fields, function(field) {
            return result.get(field);
          });
        });
        $("table#results thead tr").append("                  " + (_.map(results.fields, function(field) {
          return "<th>" + field + "</th>";
        }).join("")) + "                ");
        return $("table#results tbody").append(_.map(tableData, function(row) {
          return "                  <tr>                    " + (_.map(row, function(element, index) {
            return "                      <td>" + element + "</td>                    ";
          }).join("")) + "                  </tr>                ";
        }).join(""));
      }
    });
  };

  return OldReportView;

})(Backbone.View);

_.each($('table tr'), function(row, index) {
  if (index % 2 === 1) {
    return $(row).addClass("odd");
  }
});

({
  spreadsheet: function() {
    return _this.viewQuery({
      success: function(results) {
        var csvData;
        console.log(results);
        csvData = results.map(function(result) {
          return _.map(results.fields, function(field) {
            return result.get(field);
          }).join(",");
        }).join("\n");
        _this.$el.append("                <a id='csv' href='data:text/octet-stream;base64," + (Base64.encode(results.fields.join(",") + "\n" + csvData)) + "' download='" + (_this.startDate + "-" + _this.endDate) + ".csv'>Download spreadsheet</a>              ");
        return $("a#csv").button();
      }
    });
  },
  summarytables: function() {
    var _this = this;
    return Coconut.resultCollection.fetch({
      includeData: true,
      success: function() {
        var fields;
        fields = _.chain(Coconut.resultCollection.toJSON()).map(function(result) {
          return _.keys(result);
        }).flatten().uniq().sort().value();
        fields = _(fields).without("_id", "_rev");
        _this.$el.append("                <br/>                Choose a field to summarize:<br/>                <select id='summaryField'>                  " + (_.map(fields, function(field) {
          return "<option id='" + field + "'>" + field + "</option>";
        }).join("")) + "                </select>              ");
        return $('select').selectmenu();
      }
    });
  },
  summarize: function() {
    var field,
      _this = this;
    field = $('#summaryField option:selected').text();
    return this.viewQuery({
      success: function(resultCollection) {
        var results;
        results = {};
        resultCollection.each(function(result) {
          return _.each(result.toJSON(), function(value, key) {
            if (key === field) {
              if (results[value] != null) {
                results[value]["sums"] += 1;
                return results[value]["resultIDs"].push(result.get("_id"));
              } else {
                results[value] = {};
                results[value]["sums"] = 1;
                results[value]["resultIDs"] = [];
                return results[value]["resultIDs"].push(result.get("_id"));
              }
            }
          });
        });
        _this.$el.append("                <h2>" + field + "</h2>                <table id='summaryTable' class='tablesorter'>                  <thead>                    <tr>                      <th>Value</th>                      <th>Total</th>                    </tr>                  </thead>                  <tbody>                    " + (_.map(results, function(aggregates, value) {
          return "                          <tr>                            <td>" + value + "</td>                            <td>                              <button id='toggleDisaggregation'>" + aggregates["sums"] + "</button>                            </td>                            <td class='dissaggregatedResults'>                              " + (_.map(aggregates["resultIDs"], function(resultID) {
            return resultID;
          }).join(", ")) + "                            </td>                          </tr>                          ";
        }).join("")) + "                  </tbody>                </table>              ");
        $("button").button();
        $("a").button();
        return _.each($('table tr'), function(row, index) {
          if (index % 2 === 1) {
            return $(row).addClass("odd");
          }
        });
      }
    });
  },
  toggleDisaggregation: function() {
    return $(".dissaggregatedResults").toggle();
  }
});

/*
//@ sourceMappingURL=ReportViewOnlyCSV.map
*/