// import { Request, Response } from 'express';
// import jwt from "jsonwebtoken";

// export const generarJWT = (id: string, name: string): Promise<void> => {
//     return new Promise((req: Request, res: Response) => {
//         const payload = { id, name };
//         jwt.sign(payload, process.env.JWT_SECRET, {
//             expiresIn: '1h'
//         }, (err, token) => {

//             if (err) {
//                 console.log(err);
//                 reject('Token could not be generated')
//             }
//             resolve(token);
//         })
//     })
// }
// // export default generarJWT

import jwt from "jsonwebtoken";

export const generarJWT = (id: string, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };
        jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated')
            } else if (token) {
                resolve(token);
            } else {
                reject('Token could not be generated')
            }
        })
    })
}