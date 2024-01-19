const jwt = require("jsonwebtoken");
const { Token } = require('../models/models');
class generateJWT {
    acess(id, email, current_role) {
        return jwt.sign({ id, email, current_role }, process.env.SECRET_KEY_ACESS, {
            expiresIn: "24h",
        });
    }
    refresh(id, email, current_role) {
        return jwt.sign({ id, email, current_role }, process.env.SECRET_KEY_REFRESH, {
            expiresIn: "30d",
        });
    }
    saveRefreshToken = async (userId, refreshToken) => {
        await Token.create({ userId, refreshToken });
    };
    updateRefreshToken = async (userId, newRefreshToken) => {
        await Token.update({ refreshToken: newRefreshToken }, { where: { userId } });
        console.log("token is updated")
    };
    tokens(id, email, current_role) {
        return {
            access: jwt.sign({ id, email, current_role }, process.env.SECRET_KEY_ACESS, {
                expiresIn: "24h",
            }),
            refresh: jwt.sign({ id, email, current_role }, process.env.SECRET_KEY_REFRESH, {
                expiresIn: "30d",
            })
        }
    }
}
module.exports = new generateJWT();