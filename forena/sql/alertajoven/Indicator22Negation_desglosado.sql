--ACCESS=access content
SELECT distinct
    reg.uuid,
    reg.nombre,
    reg.apellido,
    reg.sexo,
    reg.dob,
    DATE_FORMAT(FROM_DAYS(DATEDIFF(reg.Fecha, reg.dob)), '%Y') + 0 AS age,
    reg.provider_id,
    agency.field_agency_name_value as provider_name
FROM
    bitnami_drupal7.aj_labor labor
        JOIN
    bitnami_drupal7.aj_registration reg ON labor.uuid = reg.uuid
    JOIN 
    bitnami_drupal7.field_data_field_agency_name agency on reg.provider_id = agency.entity_id
WHERE
  1 = 1 
--SWITCH=:collateral
-- estecolateralparticipante can have 1 of 4 values: No, Si, No Sabe (which means Don't know), blank (which means no value, not set)
--CASE=collateral
and reg.Estecolateralparticipante = 'Sí'
--CASE=nonCollateral
and reg.Estecolateralparticipante != 'Sí'
--END

--IF=:from_date
and SUBSTRING(labor.created, 1, 10) >= :from_date
--END
--IF=:to_date
and SUBSTRING(labor.created, 1, 10) <= :to_date
--END

--IF=:provider_id
and reg.provider_id in (:provider_id) 
--END

AND (
(4_Actualmentetienesuntrabajoenel in ('No', ''))
AND (8_Cuandoiniciasteelcursotecnicoyaestabas in ('No', ''))
AND (13_Hasrecibidounprestamoatravesdelproyecto in ('No', '') AND 14_Tienesunnegociopropio in ('No', ''))
AND (16_Siyateniasunnegocioconsiderasquedespuesdel in ('No', ''))
)
GROUP BY UUID
