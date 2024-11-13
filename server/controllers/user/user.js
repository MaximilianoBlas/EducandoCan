const { models } = require("../../db");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const input = req.body.payload;

  try {
    async function hashPassword(password) {
      const saltRounds = 10; // Puedes ajustar la cantidad de rondas de sal
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    }

    // Verificar la contraseña al hacer login
    async function verifyPassword(password, hashedPassword) {
      return await bcrypt.compare(password, hashedPassword);
    }

    const user = await models.User.create({
      user: hashPassword(input),
    });

    res.json(user);

    // const user = await models.User.findOne();
    // if (input === user.user) res.json("match");
    // else res.json("no");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };
