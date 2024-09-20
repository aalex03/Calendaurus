import { IPublicClientApplication } from "@azure/msal-browser"
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";

export const deleteCalendarEntry = async (instance : IPublicClientApplication, entry: ICalendarEntry) => {
    const url = `${process.env.REACT_APP_API_URL}/api/Calendar/${entry.id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        },
    });
    //return await response.json();
}