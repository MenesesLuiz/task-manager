const { DataTypes, Model } = require('sequelize');

class Usuario extends Model {
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            senha:  {
                type: DataTypes.STRING,
                allowNull: false
            }, 
        }, {
            sequelize,
            tableName: {
                singular: 'usuario',
                plural: 'usuarios'
            } 
        });
    }

    static associate(models) {
        this.hasMany(models.Tarefas);
    }
}

module.exports = Usuario;