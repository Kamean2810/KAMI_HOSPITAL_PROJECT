import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  dob: Date;
  gender: "Male" | "Female";
  password: string;
  role: "Admin" | "Doctor" | "Patient";
  doctorDepartment?: string;
  docAvatar?: {
    public_id: string;
    url: string;
  };
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  nic: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: ["Admin", "Doctor", "Patient"] },
  doctorDepartment: String,
  docAvatar: {
    public_id: String,
    url: String
  }
});

// Password hashing middleware
userSchema.pre<IUserDocument>("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument>("User", userSchema);
