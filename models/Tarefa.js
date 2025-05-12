const { DataTypes, Model } = require('sequelize');

class Tarefas extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true, 
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: {
                singular: 'tarefa',
                plural: 'tarefas'
            }
        });
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id'
        });
    }
}

module.exports = Tarefas;