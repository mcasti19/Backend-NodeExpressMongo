import mongoose, { Schema } from "mongoose";
import { Employee } from "../types/EmployeeTypes";


const EmployeeSchema: Schema = new Schema<Employee>(
    {
        img_profile: {
            type: String,
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        last_name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        userId: {
            ref: "Users",
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            default: ''
        },
        hireDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Validación para asegurarse de que la fecha de contratación no sea posterior a la fecha actual
EmployeeSchema.pre("save", function (next) {
    if ((this as any).hireDate > new Date()) {
        throw new Error("La fecha de contratación no puede ser posterior a la fecha actual");
    }
    next();
});


export const EmployeeModel = mongoose.model<Employee>("Employees", EmployeeSchema);