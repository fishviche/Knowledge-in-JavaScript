const { pool } = require('../src/database/database.js');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeName(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const addReporter = async() => {
  const posible_district_id = [3929,3930,3931,3932,3933,3928,3934,3935,3936,3937,3938,3939,3940,3941,3942,3943,3944,3945,3946,3947,3949,3950,3951,3948,3952,3953,3954,3955,3956,3957,3958,3959,3960,3961,3962,3963,3964,3965,3966,3967,3968,3969,3970]
  const district_id = posible_district_id[getRandomInt(0, 42)];
  try{
    response = await pool.query(
      `INSERT INTO reporter(district_id, name, age, document_number)
        VALUES ($1, $2, $3, $4)`,
      [
        district_id,
        makeName(10),
        getRandomInt(18, 100),
        getRandomInt(10000000, 99999999)
      ]
    );
  } catch {
    response = await pool.query(
      `INSERT INTO reporter(district_id, name, age, document_number)
        VALUES ($1, $2, $3, $4)`,
      [
        district_id,
        makeName(10),
        getRandomInt(18, 100),
        getRandomInt(10000000, 99999999)
      ]
    );
  }
  
}
// Add 100k users;
// for(let i = 1; i <= 100000; i ++){
//   addReporter()
// }
