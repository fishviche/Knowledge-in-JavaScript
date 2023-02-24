const xl = require('excel4node');
const { pool } = require('../database/database.js');
const excelService = {}

excelService.getReportByDistrict = async (district_id) => {
  const wb = new xl.Workbook();
  const wsDistrict = wb.addWorksheet(`Denuncias por distrito`);
  query = `SELECT date_part('year', R.REPORTED_IN) AS YEAR, RP.NAME AS DENUNCIANTE, D.NAME AS DISTRITO,
  R.GEOLOCATION ->> 'latitude' AS LATITUD,
  R.GEOLOCATION ->> 'logintude' AS LONGITUD,
  R.PARAMS ->>'comments' AS COMENTARIOS 
  FROM REPORT AS R
  LEFT JOIN REPORTER AS RP
  ON R.REPORTER_ID = RP.REPORTER_ID
  LEFT JOIN DISTRICT AS D
  ON R.DISTRICT_ID = D.DISTRICT_ID
  WHERE R.DISTRICT_ID = $1`
  let response = await pool.query(query, [district_id]);
  let headers = ['Año de la denuncia', 'Denunciante', 'Distrito donde se realizo la denuncia',
  'Latitud de la denuncia', 'Longitud de la denuncia', 'Comentarios'];
  headers.forEach( (element, index) => {
    wsDistrict.cell(1, index + 1).string(String(element));
  });
  let districtName = ''
  let startRow = 2;
  response.rows.forEach( (element) => {
    wsDistrict.cell(startRow, 1).string(String(element.year));
    wsDistrict.cell(startRow, 2).string(String(element.denunciante));
    wsDistrict.cell(startRow, 3).string(String(element.distrito));
    wsDistrict.cell(startRow, 4).string(String(element.latitud));
    wsDistrict.cell(startRow, 5).string(String(element.longitud));
    wsDistrict.cell(startRow, 6).string(String(element.comentarios));
    startRow += 1;
    districtName = element.distrito;
  })
  let fileName =  districtName.replace(/\s+/g, '_') + '.xlsx'
  wb.write(fileName);
  return fileName
}

const graphPage = async (wb) => {
  const wsGraph = wb.addWorksheet(`Data Graficas`);
  const query = await pool.query(`
  SELECT COUNT(R.DISTRICT_ID), D.NAME, R.CATEGORY_ID, date_part('year', REPORTED_IN) AS YEAR
  FROM REPORT AS R
  LEFT JOIN DISTRICT AS D
  ON R.DISTRICT_ID = D.DISTRICT_ID
  GROUP BY R.DISTRICT_ID, D.NAME, R.CATEGORY_ID, date_part('year', REPORTED_IN);
  `, []);
  let years = await pool.query(`
  SELECT date_part('year', REPORTED_IN) AS YEAR from REPORT
  GROUP BY date_part('year', REPORTED_IN);
  `, []);
  let data = query.rows
  years = years.rows.map(el => el.year).sort((a,b) => a-b);
  let districtsName = data.map( data => data.name);
  districtsName = districtsName.filter((item,index)=>{
    return districtsName.indexOf(item) === index;
  });
  wsGraph.cell(1, 1).string('Año');
  wsGraph.cell(1, 2).string('Distrito');
  wsGraph.cell(1, 3).string('Delincuencia');
  wsGraph.cell(1, 4).string('Limpieza');
  // Insertar años, nombre de distritos
  let startRow = 2;
  for(let i = 0; i < years.length; i ++){
    for(let j = 0; j < districtsName.length; j++){
      wsGraph.cell(startRow, 1).string(String(years[i]));
      wsGraph.cell(startRow, 2).string(String(districtsName[j]));
      // Delincuencia
      let delincuenciaData = data.find(element => element.name === districtsName[j] && element.year === years[i] && element.category_id === 1);
      wsGraph.cell(startRow, 3).string(String(delincuenciaData.count));
      // Limpieza
      let limpiezaData = data.find(element => element.name === districtsName[j] && element.year === years[i] && element.category_id === 2);
      wsGraph.cell(startRow, 4).string(String(limpiezaData.count));
      startRow += 1;
    }
  }
  return 200
}

const dataPage = async(wb) => {
  const wsData = wb.addWorksheet(`Data Distritos`);
  query = `SELECT
    D.name,
    D.buildings[$1] -> $2 ->> 'extension' AS "extension",
    D.buildings[$1] -> $2 ->> 'population' AS "population",
    D.buildings[$1] -> $2 ->> 'birth_rate' AS "birth_rate",
    D.buildings[$1] -> $2 ->> 'death_rate' AS "death_rate",
    D.buildings[$1] -> $2 ->> 'level_education' AS "level_education",
    D.buildings[$1] -> $2 ->> 'level_of_wealth' AS "level_of_wealth",
    D.buildings[$1] -> $2 ->> 'quality_of_food' AS "quality_of_food",
    D.poblation[$1] -> $2 ->> 'schools' AS "schools",
    D.poblation[$1] -> $2 ->> 'city_hall' AS "city_hall",
    D.poblation[$1] -> $2 ->> 'hospitals' AS "hospitals",
    D.poblation[$1] -> $2 ->> 'libraries' AS "libraries"
    FROM DISTRICT AS D`
  const headers = ['Año','Distrito', 'Extensión', 'Población', 'Tasa de natalidad',
    'Tasa de mortalidad', 'Nivel de educación', 'Nivel de riqueza',
    'Calidad de comida', 'Escuelas', 'Municipalidades',
    'Hospitales', 'Librerías'
  ];
  const dataYears = ['2017', '2018', '2019', '2020', '2021', '2022'];
  let startRow = 2;
  headers.forEach( (element, index) => {
    wsData.cell(1, index + 1).string(String(element));
  })
  for(let i = 0; i < dataYears.length; i ++){
    let response = await pool.query(query, [ i, dataYears[i] ]);
    response.rows.forEach( (element) => {
      let startColumn = 2
      for(let j in element) {
        wsData.cell(startRow, startColumn).string(String(element[j]));
        wsData.cell(startRow, 1).string(String(dataYears[i]));
        
        startColumn += 1;
      }
      startRow += 1;
    })
  }
  return 200
}

const dataReportByDistricPage = async(wb) => {
  const wsRptDtc= wb.addWorksheet(`Denuncias por distritos`);
  query = `SELECT COUNT(R.*), D.NAME, C.NAME AS CATEGORIA, AVG(score)
  FROM REPORT AS R
  LEFT JOIN DISTRICT AS D
  ON R.DISTRICT_ID = D.DISTRICT_ID
  LEFT JOIN CATEGORY AS C
  ON C.CATEGORY_ID = R.CATEGORY_ID
  GROUP BY D.NAME, C.NAME
  ORDER BY D.NAME ASC, C.NAME DESC`
  let headers = ['Distrito', 'Tipo de Denuncia', 'Cantidad de denuncias',
  'Promedio de calificaciones'];
  headers.forEach( (element, index) => {
    wsRptDtc.cell(1, index + 1).string(String(element));
  });
  let response = await pool.query(query, []);
  let startRow = 2;
  response.rows.forEach((element) => {
    wsRptDtc.cell(startRow, 1).string(String(element.name));
    wsRptDtc.cell(startRow, 2).string(String(element.categoria));
    wsRptDtc.cell(startRow, 3).string(String(element.count));
    wsRptDtc.cell(startRow, 4).string(String(parseFloat(element.avg).toFixed(2)));
    startRow += 1;
  });
  return 200;
}

excelService.createReporte = async () => {
  const wb = new xl.Workbook();
  let status = await dataPage(wb);
  status = await dataReportByDistricPage(wb);
  status = await graphPage(wb);
  wb.write('Excel.xlsx');
  return {message:'Excel creado'}
}

module.exports = excelService;