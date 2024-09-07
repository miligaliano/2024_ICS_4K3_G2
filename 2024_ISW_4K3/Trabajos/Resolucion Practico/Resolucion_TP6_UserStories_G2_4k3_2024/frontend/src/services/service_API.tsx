import axios from "axios";

export const apiBack = process.env.NEXT_PUBLIC_API_BACK;

export const API_BACK = axios.create({
    baseURL: apiBack,
    headers: {
        "Content-Type": "application/json",
    }
})