import jwt from "jsonwebtoken";

export const generarJWT = (id: string, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };
        jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: '30m'
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