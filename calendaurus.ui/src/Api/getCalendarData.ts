import { useMsal } from "@azure/msal-react";
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";
import { useQuery } from "react-query";
import { IPublicClientApplication } from "@azure/msal-browser";

export async function getEntries(instance: IPublicClientApplication) {
    const url = "http://localhost:5234/api/Calendar";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        }
    });
    const responseData = await response.json() as ICalendarEntry[];
    return responseData;
}

export function useCalendarQuery(instance : IPublicClientApplication) {
    return useQuery({
        queryFn: async () => {
            const responseData = await getEntries(instance);
            return responseData;
        }
    });
}