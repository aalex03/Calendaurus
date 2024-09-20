import { IPublicClientApplication } from "@azure/msal-browser"
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";

export const putCalendarEntryMutation = async (instance : IPublicClientApplication, entry: ICalendarEntry) => {
    const url = `${process.env.REACT_API_URL}/api/Calendar/${entry.id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        },
        body: JSON.stringify(entry)
    });
}