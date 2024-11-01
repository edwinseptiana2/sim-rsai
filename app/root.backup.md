import {
Links,
Meta,
Outlet,
Scripts,
ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"

import "./tailwind.css";

import { themeSessionResolver } from "./sessions.server"

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
const { getTheme } = await themeSessionResolver(request)
return {
theme: getTheme(),
}
}

export const links: LinksFunction = () => [
{ rel: "preconnect", href: "https://fonts.googleapis.com" },
{
rel: "preconnect",
href: "https://fonts.gstatic.com",
crossOrigin: "anonymous",
},
{
rel: "stylesheet",
href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
},
];

export default function AppWithProviders() {
const data = useLoaderData<typeof loader>()
return (
<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
<App />
</ThemeProvider>
)
}

export function Layout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<head>
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<Meta />
<Links />
</head>
<body>
{children}
<ScrollRestoration />
<Scripts />
</body>
</html>
);
}

export default function App() {
return <Outlet />;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
@apply bg-white dark:bg-gray-950;

@media (prefers-color-scheme: dark) {
color-scheme: dark;
}
}

@layer base {
:root {
--background: 0 0% 100%;
--foreground: 224 71.4% 4.1%;
--card: 0 0% 100%;
--card-foreground: 224 71.4% 4.1%;
--popover: 0 0% 100%;
--popover-foreground: 224 71.4% 4.1%;
--primary: 220.9 39.3% 11%;
--primary-foreground: 210 20% 98%;
--secondary: 220 14.3% 95.9%;
--secondary-foreground: 220.9 39.3% 11%;
--muted: 220 14.3% 95.9%;
--muted-foreground: 220 8.9% 46.1%;
--accent: 220 14.3% 95.9%;
--accent-foreground: 220.9 39.3% 11%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 20% 98%;
--border: 220 13% 91%;
--input: 220 13% 91%;
--ring: 224 71.4% 4.1%;
--chart-1: 12 76% 61%;
--chart-2: 173 58% 39%;
--chart-3: 197 37% 24%;
--chart-4: 43 74% 66%;
--chart-5: 27 87% 67%;
--radius: 0.5rem;
--sidebar-background: 0 0% 98%;
--sidebar-foreground: 240 5.3% 26.1%;
--sidebar-primary: 240 5.9% 10%;
--sidebar-primary-foreground: 0 0% 98%;
--sidebar-accent: 240 4.8% 95.9%;
--sidebar-accent-foreground: 240 5.9% 10%;
--sidebar-border: 220 13% 91%;
--sidebar-ring: 217.2 91.2% 59.8%;
}
.dark {
--background: 224 71.4% 4.1%;
--foreground: 210 20% 98%;
--card: 224 71.4% 4.1%;
--card-foreground: 210 20% 98%;
--popover: 224 71.4% 4.1%;
--popover-foreground: 210 20% 98%;
--primary: 210 20% 98%;
--primary-foreground: 220.9 39.3% 11%;
--secondary: 215 27.9% 16.9%;
--secondary-foreground: 210 20% 98%;
--muted: 215 27.9% 16.9%;
--muted-foreground: 217.9 10.6% 64.9%;
--accent: 215 27.9% 16.9%;
--accent-foreground: 210 20% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 20% 98%;
--border: 215 27.9% 16.9%;
--input: 215 27.9% 16.9%;
--ring: 216 12.2% 83.9%;
--chart-1: 220 70% 50%;
--chart-2: 160 60% 45%;
--chart-3: 30 80% 55%;
--chart-4: 280 65% 60%;
--chart-5: 340 75% 55%;
--sidebar-background: 240 5.9% 10%;
--sidebar-foreground: 240 4.8% 95.9%;
--sidebar-primary: 224.3 76.3% 48%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 240 3.7% 15.9%;
--sidebar-accent-foreground: 240 4.8% 95.9%;
--sidebar-border: 240 3.7% 15.9%;
--sidebar-ring: 217.2 91.2% 59.8%;
}
}

@layer base {

- {
  @apply border-border;
  }
  body {
  @apply bg-background text-foreground;
  }
  }