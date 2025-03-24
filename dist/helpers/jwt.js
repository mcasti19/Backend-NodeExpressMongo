"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            }
            else if (token) {
                resolve(token);
            }
            else {
                reject('Token could not be generated');
            }
        });
    });
};
exports.generarJWT = generarJWT;
