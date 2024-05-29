import { ICalendarEntry } from "./types";

export const mocks: ICalendarEntry[] = [
    {
        id: "1",
        title: "Meeting",
        description: "Discuss the project",
        start: new Date('2024-06-01T10:00:00'),
        end: new Date('2024-06-01T12:00:00'),
        created: new Date(),
        updated: new Date(),
        type: 1,
        location: "Online"
    },
    {
        id: "2",
        title: "Team Building Event",
        description: "Outdoor activities and team games",
        start: new Date('2024-06-15T08:00:00'),
        end: new Date('2024-06-15T17:00:00'),
        created: new Date(),
        updated: new Date(),
        type: 2,
        location: "Central Park"
    },
    {
        id: "3",
        title: "Client Presentation",
        description: "Present the Q2 results to the client",
        start: new Date('2024-07-10T14:00:00'),
        end: new Date('2024-07-10T15:30:00'),
        created: new Date(),
        updated: new Date(),
        type: 1,
        location: "Client's Office"
    },
    {
        id: "4",
        title: "Workshop: Effective Communication",
        description: "Interactive workshop on communication skills",
        start: new Date('2024-07-25T10:00:00'),
        end: new Date('2024-07-25T12:00:00'),
        created: new Date(),
        updated: new Date(),
        type: 3,
        location: "Company Conference Room"
    },
    {
        id: "5",
        title: "Summer Party",
        description: "Annual summer party for employees",
        start: new Date('2024-08-05T18:00:00'),
        end: new Date('2024-08-05T22:00:00'),
        created: new Date(),
        updated: new Date(),
        type: 2,
        location: "Beach Club"
    }
];
