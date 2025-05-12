const Tarefa = require('../models/Tarefa.js');
const Usuario = require('../models/Usuario.js');
const sequelize = require('./database/database.js')

models = [Tarefa, Usuario]

class Database {
    constructor() { 
        this.init();
        this.associate();
    }

    async init() {
        this.connection = sequelize;
        models.forEach(model => model.init(this.connection));
        await this.connection.sync({force: true});
    }

    associate() {
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

models.exports = new Database();