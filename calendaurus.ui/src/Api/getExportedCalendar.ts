import { IPublicClientApplication } from "@azure/msal-browser";
import dayjs from "dayjs";
import { ICalendarEntry } from "../types";
import { prepareToken } from "./authUtils";

export async function getExportedCalendar(instance: IPublicClientApplication) {
    const user = sessionStorage.getItem("user");
    const userEmail = user ? JSON.parse(user).username : "";
    const url = `${process.env.REACT_APP_URL}/api/Calendar/${userEmail}/export`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        }
    }).then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'calendar.ics');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        });
}