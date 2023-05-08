const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diet', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.ENUM(
                'gluten free',
                'ketogenic',
                'dairy free',
                'vegan',
                'lacto ovo vegetarian',
                'pescatarian',
                'paleolithic',
                'fodmap friendly',
                'primal',
                'paleo',
                'whole 30'
            ),
            allowNull: false,
        }
    },
        {
        timestamps: false,
        }
    );
};