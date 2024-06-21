import { IPublicClientApplication } from "@azure/msal-browser"
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";

export const postCalendarEntryMutation = async (instance : IPublicClientApplication, entry: ICalendarEntry) => {
    const url = "https://localhost:7165/api/Calendar";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        },
        body: JSON.stringify(entry)
    });
}