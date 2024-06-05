import { useMsal } from "@azure/msal-react";
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";
import { useQuery } from "react-query";
import { IPublicClientApplication } from "@azure/msal-browser";

export async function getEntries(instance: IPublicClientApplication) {
    const url = "https://localhost:7165/api/Calendar";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        }
    });
    return await response.json() as ICalendarEntry[];
}

export function useCalendarQuery(instance : IPublicClientApplication) {
    return useQuery({
        queryFn: async () => {
            const responseData = await getEntries(instance);
            return responseData;
        }
    });
}