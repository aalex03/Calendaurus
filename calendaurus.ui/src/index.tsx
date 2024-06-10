// Import React and ReactDOM for rendering React components into the DOM
import React from "react";
import ReactDOM from "react-dom/client";

// Import CSS styles for the application
import "./index.css";

// Import the root component of the application
import App from "./App";

// Import the function to report web vitals
import reportWebVitals from "./reportWebVitals";

// Import BrowserRouter to enable routing in the application
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";

// Import LocalizationProvider and AdapterDayjs for date and time localization
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Api/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { QueryClient, QueryClientProvider } from "react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// Create a root for ReactDOM to render the application
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const msalInstance = new PublicClientApplication(msalConfig)
export const queryClient = new QueryClient();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Istanbul");
// Render the application inside React.StrictMode to enable additional checks and warnings
root.render(
	<React.StrictMode>
		{/* Wrap the application with Router for enabling routing */}
		<QueryClientProvider client={queryClient}>
		<MsalProvider instance={msalInstance}>
			<BrowserRouter>
				{/* Provide localization capabilities to the application */}
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					{/* Render the main App component */}
					<App />
				</LocalizationProvider>
			</BrowserRouter>
		</MsalProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

// Measure and report web vitals to improve performance
reportWebVitals();