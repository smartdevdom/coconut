-- ACCESS=access content
SELECT 
		provider.field_agency_name_value as provider_name,
		reg.uuid,
		reg.nombre,
		reg.apellido,
		reg.sexo,
		DATE_FORMAT(FROM_DAYS(DATEDIFF(DATE_FORMAT(NOW(), '%Y-%m-%d'), reg.dob)), '%Y')+0 AS age,
		survey.10Tienesunactadenacimientodominicana as '(E)P10-ActaDeNacimiento',
		exi.9Conseguistetuactade as '(S)P9-ActaDeNacimiento',
		exi.9AOtro as '(S)9A-Otro',
		survey.16Actualmenteestasasistiendoa as '(E)P16-RecibeEduación',
		exi.11Estasactualmente as '(S)P11-RecibeEduación',
		survey.21Hascompletadoalgúncursotécnico as '(E)P21-CursoTécnico',
		exi.12Hascompletadoa as '(S)P12-CursoTécnico',
		survey.26ADescribeloquehaceseneltrabajoactual as '(E)P26-TrabajoActual',
		exi.13Actualmentetienesuntrabajoenquetepaguen as '(S)P13-TrabajoActual',
		survey.48Hassidot as '(E)P48-TransportadoPolicía',
		exi.15ACuántasveceshassido as '(S)P15A-TransportadoPolicía',
		survey.49Hassidodetenidoporlapolicíaporalgúnmotivo as '(E)P49-DetenidoPolicía',
		exi.15BCuántasveceshassido as '(S)P15B-DetenidoPolicía',
		survey.50Hassidod as '(E)P50-AcusadoDelito',
		exi.15CCuántasveceshassido as '(S)P15C-AcusadoDelito',
		survey.51Algunode as '(E)P51-AtenciónIntegral',
		exi.15DCuántasveceshassidoenviado as '(S)P51-AtenciónIntegral',
		survey.43Enquémedidatuvidahasidoafectadaporladelincuencia as '(E)P43-ImpactoDelincuencia',
		exi.16Enquémedidatuvidaha as '(S)P16-ImpactoDelincuencia',
		survey.82Algunavezhastenidorelacionessexuales as '(E)P82-RelacionesSexuales',
		exi.17Algunavezhastenidorelacionessexuales as '(S)P17-RelacionesSexuales',
		survey.86Laúltima as '(E)P86-SexoCondón',
		exi.18Laúltimavez as '(S)P18-SexoCondón',
		CONCAT_WS(',', 
				case when survey.87ANoutilicéningún = "true" then "Ninguno" end,
				case when survey.87BCondón = "true" then " Condón" end,
				case when survey.87CCondónfemenino = "true" then "CondónFemenino" end,
				case when survey.87DPíldoraanticonceptiva = "true" then "Píldora" end,
				case when survey.87ERitmoma = "true" then "Ritmo" end,
				case when survey.87FRetirod = "true" then "Retiro" end,
				case when survey.87GMelamujereslactando = "true" then "Mela" end,
				case when survey.87HDIUcomoMirenaoParagard = "true" then "DIU" end,
				case when survey.87IInyecci = "true" then "Inyección" end,
				case when survey.87JImplant = "true" then "Implante" end,
				case when survey.87KEsterilizaciónfemenina = "true" then "EsterilizaciónFemenina" end,
				case when survey.87LEsterilizaciónmasculina = "true" then "EsterilizaciónMasculina" end,
				case when survey.87MNoséInseguro = "true" then "NoSé-Inseguro" end,
				case when survey.87NOtro != "" then concat('Otro:', survey.87NOtro) end) as '(E)P87-MétodoPrevEmbarazo',
			exi.19Laúltimavez as '(S)P19-MétodoPrevEmbarazo',
			survey.90Siquisie as '(E)P90-ComprarCondón',
			exi.20Siquisierascompraruncondóncreesquepodríasencontrarlo as '(S)P20-ComprarCondón',
			survey.91Siquisie as '(E)P91-ConvencerParejaUsoCondón',
			exi.21Siquisierastenersexo as '(S)P91-ConvencerParejaUsoCondón',
			exi.23EstatusdeSalida as '(S)P23-EstatusDeSalida'
FROM bitnami_drupal7.aj_exit exi
JOIN bitnami_drupal7.aj_registration reg on exi.uuid = reg.uuid
JOIN bitnami_drupal7.aj_survey survey on exi.uuid = survey.uuid
JOIN bitnami_drupal7.field_data_field_agency_name provider on exi.provider_id = provider.entity_id
where exi.provider_id in (:provider_id)
