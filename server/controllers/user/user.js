const { models } = require("../../db");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const input = req.body.payload;

  try {
    async function hashPassword(password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    }

    async function verifyPassword(password, hashedPassword) {
      return await bcrypt.compare(password, hashedPassword);
    }

    // const password = await hashPassword(input);
    // const user = await models.User.create({
    //   user: password,
    // });
    // res.json(user);
    const user = await models.User.findOne();

    const verify = await verifyPassword(input, user.user);

    if (verify) res.json(verify);
    else res.json("incorrect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };
