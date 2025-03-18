import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../types/UsersTypes";

const UserSchema: Schema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        permissions: {
            type: [ String ],
            default: [],
        },
        roles: [
            {
                ref: "Roles",
                type: Schema.Types.ObjectId
            }
        ],
        employeeId: {
            ref: "Employees",
            type: mongoose.Schema.Types.ObjectId
        },
        status: {
            type: String,
            default:'Active'
        },
        img_profile: {
            ref: "Employees",
            type: mongoose.Schema.Types.ObjectId
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.pre<User>("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
    }
    next()
});

UserSchema.method("comparePassword", async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password as string)
});

UserSchema.methods.toJSON = function () {
    const userObj = this.toObject();
    delete userObj.password;
    return userObj;
}

export const UserModel = mongoose.model<User>('Users', UserSchema);