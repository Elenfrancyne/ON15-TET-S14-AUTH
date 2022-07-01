const UserSchema = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const SECRET = process.env.SECRET;
const login = (req, res) => {
    try {
        UserSchema.findOne({ email: req.body.email }), (error, user) => {
            console.log("USUÁRIO", user)
            if (!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            console.log("A SENHA É VÁLIDA?", validPassword);
            return res.status(401).send({
                message: "Login não autorizado!"
            })
        };
        const token = jwt.sing({ name: user.name }, SECRET);
        console.log("TOKEN CRIADO COM SUCESSO!!!", token)

        res.status(200).send({
            "message": "Login autorizado",
            token
        });


    } catch (error) {
        console.error(error)
    }
};


module.exports = {
    login
}