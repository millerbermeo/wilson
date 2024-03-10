import Cliente from "../models/me.cliente.model.js";
import jwt from 'jsonwebtoken';

export const ValidarUsuario = async (req, res) => {
  try {
    let { identificacion, password } = req.body;
    const cliente = await Cliente.findOne({ identificacion, password });

    if (cliente) {
      let token = jwt.sign({ user: cliente }, process.env.SECRET, { expiresIn: process.env.TIME });
      return res.status(200).json({ "message": "Usuario autorizado", "token": token });
    } else {
      return res.status(404).json({ "message": "Usuario no autorizado" });
    }
  } catch (e) {
    return res.status(500).json({ "message": e.message });
  }
};


export const validarToken = async (req, res, next) => {
  try {
    let tokenCliente = req.headers['token'];
    if (!tokenCliente) {
      return res.status(402).json({ "message": "El token es requerido" });
    } else {
      jwt.verify(tokenCliente, process.env.SECRET, (error, decoded) => {
        if (error) {
          return res.status(402).json({ "message": "El token es inválido" });
        } else {
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ "message": error.message });
  }
};