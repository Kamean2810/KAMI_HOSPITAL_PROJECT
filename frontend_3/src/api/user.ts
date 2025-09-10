// src/api/user.ts
import axios from "axios";

const API_URL = "http://localhost:5000"; // or your deployed backend URL

// ✅ Export this interface so it can be imported in Register.tsx
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  dob: string; // format: "YYYY-MM-DD"
  gender: "Male" | "Female";
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  role: "Admin" | "Doctor" | "Patient";
}

export interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any; // optional user object returned from backend
}

// ---------------- Register User ----------------
export const registerUser = async (data: RegisterData) => {
  const response = await axios.post<ApiResponse>(
    `${API_URL}/api/users/patient/register`,
    data,
    { withCredentials: true }
  );
  return response;
};

// ---------------- Login User ----------------
export const loginUser = async (data: LoginData) => {
  const response = await axios.post<ApiResponse>(
    `${API_URL}/api/users/login`,
    data,
    { withCredentials: true }
  );
  return response;
};
