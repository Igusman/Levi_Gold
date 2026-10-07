import axios from "axios"
import { appConfig } from "../utils/appConfig"
import { CustomerType } from "../types/customersType"





export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${appConfig.apiCustomersUrl}/customers`, authHeaders())
        console.log("Fetched customers:", response.data)
        console.log(response.statusText)
        return response.data
    } catch (error) {
        console.error("Error fetching customers:", error)
        throw error
    }
}

export const getCustomersByDate = async (dateIso: string) => {
    // backend expects a date string in the route (new Date(dateIso) used server-side)
    const resp = await axios.get(`${appConfig.apiCustomersUrl}/customers/date/${encodeURIComponent(dateIso)}`);
    return resp.data;
}

const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const addCustomer = async (customer: CustomerType) => {
    try {

        const response = await axios.post(`${appConfig.apiCustomersUrl}/customers`, customer)
        console.log("Added customer:", response.data)
        return response.data
    } catch (error) {
        console.error("Error adding customer:", error)
        throw error
    }
}




export const cancelAppointment = async (phoneNumber: string) => {
    await axios.delete(`${appConfig.apiCustomersUrl}/customers/cancel`, { data: { phoneNumber }, ...authHeaders() });
};

export const updateAppointmentTime = async (phoneNumber: string, newQueue: string) => {
    await axios.put(`${appConfig.apiCustomersUrl}/customers/update-time/${encodeURIComponent(phoneNumber)}`, { newQueue }, authHeaders());
};

export const approveAppointment = async (phoneNumber: string) => {
    // backend exposes GET /customers/approve/:phoneNumber
        const resp = await axios.get(`${appConfig.apiCustomersUrl}/customers/approve/${encodeURIComponent(phoneNumber)}`, authHeaders());
    return resp.data;
};

export const rejectAppointment = async (phoneNumber: string) => {
    // backend exposes GET /customers/reject/:phoneNumber
                const resp = await axios.get(`${appConfig.apiCustomersUrl}/customers/reject/${encodeURIComponent(phoneNumber)}`, authHeaders());
    return resp.data;
};

export const signin = async (userName: string, password: string) => {
    const resp = await axios.post(`${appConfig.apiCustomersUrl}/user/signin`, { userName, password });
    // backend returns the token as a string, not { token: ... }
    if (resp.data) {
        localStorage.setItem('token', resp.data);
        // Save expiration time (3 hours from now)
        const expirationTime = Date.now() + (3 * 60 * 60 * 1000); // 3 hours in milliseconds
        localStorage.setItem('tokenExpiration', expirationTime.toString());
    }
    return resp.data;
}