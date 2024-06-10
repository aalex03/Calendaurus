import { IPublicClientApplication } from "@azure/msal-browser"
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";

export const postCalendarEntryMutation = async (instance : IPublicClientApplication, entry: ICalendarEntry) => {
    const url = `http://localhost:5234/api/Calendar/${entry.id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        },
    });
    return await response.json();
}