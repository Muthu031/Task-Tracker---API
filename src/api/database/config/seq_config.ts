 
import { Sequelize } from 'sequelize';
 

//                               /databasename/  , /user/   ,  /password/ 
export const sequelize = new Sequelize('task-tracker', 'root', 'root', {
 host: '127.0.0.1',
 port: Number(3306),
 dialect: 'mariadb',
 logging: false,
 pool: {
   max: 10, // can set the maximum number of connections in the pool
   min: 5, // can set the minimum number of connections in the pool
   acquire: 30000, // can set the maximum time, in milliseconds, that pool will try to get connection before throwing error
   idle: 10000, // can set the maximum time, in milliseconds, that a connection can be idle before being released
 },
 dialectOptions: {
   connectTimeout: 40000, // can adjust the connectTimeout values as needed.
 },
});
// Check the db connection
sequelize
 .authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch((err) => {
   console.error('Unable to connect to the database:', err);
   process.exit(1);
 });



export default sequelize;


