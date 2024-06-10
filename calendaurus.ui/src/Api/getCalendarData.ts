import { useMsal } from "@azure/msal-react";
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";
import { useQuery } from "react-query";
import { IPublicClientApplication } from "@azure/msal-browser";
import dayjs from "dayjs";

export async function getEntries(instance: IPublicClientApplication) {
    const url = "https://localhost:7165/api/Calendar";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        }
    });
    const responseData = await response.json() as ICalendarEntry[];
    const entries = responseData.map((entry) => {
        return {
            ...entry,
            start:  dayjs(entry.start).add(3, "hour"),
            created: dayjs(entry.created),
            updated: dayjs(entry.updated)
        }
    });
    console.log(entries);
    return entries;
}

export function useCalendarQuery(instance : IPublicClientApplication) {
    return useQuery({
        queryFn: async () => {
            const responseData = await getEntries(instance);
            return responseData;
        }
    });
}