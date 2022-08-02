const { DataTypes, Model} = require("sequelize");
const sequelize = require("../config/db");

class User extends Model {

    static associate(models) {
    }

    toJSON() {
        const user = this.get();
        delete user.password;
        return user;
    }
}


User.init({

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: "Email Must be unique",
            },
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: {
                msg: "Phone Number Must be unique",
            },
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = User;
