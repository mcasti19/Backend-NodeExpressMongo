import { NextFunction, Request, Response } from "express";
import { RolesRepository } from "../repositories";
import { RolesService } from "../services";
import { IRolesRepository, IRolesService } from "../types/RolesTypes";


const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository)

export const checkRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const roles: string[] = req.body && req.body?.roles ? req.body.roles : [];
    const role = Array.isArray(roles) && roles.length !== 0 ? roles : [ "user" ];
    console.log('Este es el nuevo Role creado :>>', role);

    try {
        const findRole = await rolesService.findRoles({ name: { $in: role } });

        if (findRole.length === 0) {
            res.status(404).json({ message: "Role Not Found" });
            return
        }


        req.body.roles = findRole.map(x => x._id);
        console.log('findRole :>>', req.body.roles);

        next();
    } catch (error) {
        console.log('error :>>', error);
        res.status(500).json({ message: "No posee el rol permitido", error })
    }
}