import { useMsal } from "@azure/msal-react";
import { prepareToken } from "./authUtils";
import { ICalendarEntry } from "../types";
import { useQuery } from "react-query";
import { IPublicClientApplication } from "@azure/msal-browser";
import dayjs from "dayjs";
import { postSignUp } from "./postSignUp";

export async function getEntries(instance: IPublicClientApplication) {
    const url = `${process.env.REACT_APP_API_URL}/api/Calendar`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        }
    });
    if(response.status === 400){
        const responseBody = await response.text();
        if(responseBody === "User does not exist"){
            postSignUp(instance);
            alert("You have been signed up for the calendar. Please try again.")
        }
    }
    const responseData = await response.json() as ICalendarEntry[];
    const entries = responseData.map((entry) => {
        return {
            ...entry,
            start:  dayjs(entry.start),
            created: dayjs(entry.created),
            updated: dayjs(entry.updated)
        }
    });
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