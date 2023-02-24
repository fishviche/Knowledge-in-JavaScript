const { pool } = require('../src/database/database.js');

const loremIpsum = require("lorem-ipsum").loremIpsum;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Lima Border
// Norte: -11.777146, -77.171731
// Sur: -12.321619, -76.832829
// ESTE: -11.999387, -76.944870
// OESTE: -12.059828, -77.129234
function generateCoordenates(){
  const latitude = `-${getRandomInt(11, 12)}.${getRandomInt(100000, 999999)}`;
  const logintude = `-${getRandomInt(76, 77)}.${getRandomInt(100000, 999999)}`
  return {
    "latitude": parseFloat(latitude),
    "logintude": parseFloat(logintude)
  }
}

function generateRandomComment(){
  return loremIpsum({
    count: getRandomInt(1,3),
    format: "plain",
    paragraphLowerBound: getRandomInt(1,5),
    paragraphUpperBound: getRandomInt(6,10),
    sentenceLowerBound: getRandomInt(1,8),
    sentenceUpperBound: getRandomInt(9,15),
    units: "paragraphs"
  });
}

function generateParams(){
  return {
    'url': [],
    'comments': generateRandomComment()
  }
}

const addReport = async () => {
  const posible_district_id = [3929,3930,3931,3932,3933,3928,3934,3935,3936,3937,3938,3939,3940,3941,3942,3943,3944,3945,3946,3947,3949,3950,3951,3948,3952,3953,3954,3955,3956,3957,3958,3959,3960,3961,3962,3963,3964,3965,3966,3967,3968,3969,3970]
  const district_id = posible_district_id[getRandomInt(0, 42)];
  const data = [
    getRandomInt(1, 100000),
    getRandomInt(1, 2),
    district_id,
    JSON.stringify(generateCoordenates()),
    JSON.stringify(generateParams()),
    getRandomInt(1, 10)
  ]
  response = await pool.query(
    `INSERT INTO report(reporter_id, category_id, district_id, geolocation, params, score)
      VALUES ($1, $2, $3, $4, $5, $6);`,
      data
  );
}

// Add 100k reports;
// for(let i = 0; i < 100000; i ++){
//   addReport();
// }  