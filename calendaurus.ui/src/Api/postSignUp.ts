import { IPublicClientApplication } from "@azure/msal-browser"
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";

export const postSignUp = async (instance : IPublicClientApplication) => {
    const user = sessionStorage.getItem("user");
    const email = JSON.parse(user!).username;
    const url = `${process.env.REACT_API_URL}/api/Calendar/signUp/${email}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        },
    });
}