// Generated by CoffeeScript 1.6.2
(function(doc) {
  var community, family, key, names, sexo, spacePattern;

  if (doc.collection === "result" && doc.complete) {
    if (!((doc['Apellido'] != null) && doc['Nombre'] && doc['BarrioComunidad'] && doc['Sexo'])) {
      return;
    }
    spacePattern = new RegExp(" ", "g");
    family = (doc['Apellido'] || '').toLowerCase();
    names = (doc['Nombre'] || '').toLowerCase();
    community = (doc['BarrioComunidad'] || '').toLowerCase();
    sexo = (doc['Sexo'] || '').toLowerCase();
    key = [family, names, community, sexo].join(":").replace(spacePattern, '');
    return emit(key, doc);
  }
});

/*
//@ sourceMappingURL=map.map
*/
