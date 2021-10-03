const {sequelize} = require ('../database/models');
const dbConnectionTest = async () => {
try {
    await sequelize.authenticate();
    console.log('La conexión ha sido establecida exitosamente');
} catch (error) {
    console.error('No se puede conectar con database:', error);
}
};
module.exports=dbConnectionTest