import { errorhandling } from "../helper/errohandling.js";
import models from "../model/init-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const home = async (req, res) => {
  try {
    res.send("Ini Halaman Home saya");
  } catch (error) {
    res.send(errorhandling(400, "Gagal Request"));
  }
};

const createuser = async (req, res) => {
  try {
    const { id, usr, pswd } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(pswd, salt);
    const result = await models.users.create(
      {
        id: id,
        username: usr,
        password: passhash,
      },
      { returning: true }
    );
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const createitem = async (req, res) => {
  try {
    const { name, category, price, stock, image, user_id } = req.body;

    const result = await models.item.create(
      {
        name: name,
        category: category,
        price: price,
        stock: stock,
        image: image,
        user_id: user_id,
      },
      { returning: true }
    );
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const deleteitem = async (req, res) => {
  try {
    const result = await models.item.destroy({
      where: { id: req.params.id },
    });
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const updateitem = async (req, res) => {
  try {
    const { name, category, price, stock, image, user_id } = req.body;

    const result = await models.item.update(
      {
        name: name,
        category: category,
        price: price,
        stock: stock,
        image: image,
        user_id: user_id,
      },
      { where: { id: req.params.id }, returning: true }
    );
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const listitems = async (req, res) => {
  try {
    const listuser = await models.item.findAll();
    res.send(errorhandling(listuser, 200, "suskes"));
  } catch (error) {}
};
const dataitems = async (req, res) => {
  try {
    const listuser = await models.item.findOne({
      where: { id: req.params.id },
      returning: true,
    });
    res.send(errorhandling(listuser, 200, "suskes"));
  } catch (error) {}
};

const loginuser = async (req, res) => {
  try {
    const user = await models.users.findOne({
      where: { username: req.body.usr },
    });
    if (user) {
      const password_valid = await bcrypt.compare(req.body.pswd, user.password);
      if (password_valid) {
        const token = jwt.sign(
          JSON.parse(JSON.stringify(user)),
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.send(errorhandling(token, 200, "sukses"));
      } else {
        res.send(errorhandling(400, "Password Incorrect"));
      }
    } else {
      res.send(errorhandling(400, "User does not exist"));
    }
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const deleteuser = async (req, res) => {
  try {
    const result = models.users.destroy({
      where: { id: req.params.id },
    });
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(400, error.message);
  }
};

const updateuser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(req.body.pswd, salt);
    const result = await models.users.update(
      {
        username: req.body.usr,
        password: passhash,
      },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(400, error.message);
  }
};
export default {
  home,
  listitems,
  loginuser,
  deleteuser,
  updateuser,
  createuser,
  createitem,
  deleteitem,
  updateitem,
  dataitems,
};
