import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import { themeSessionResolver } from "./sessions.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import { useRouteLoaderData } from "@remix-run/react/dist/components";

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");

  const theme = data?.theme ?? null; // explicitly set the default value to null
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
      <HTML lang="en">
        <head>
          <Meta />
          <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </HTML>
    </ThemeProvider>
  );
}

function HTML({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [theme] = useTheme();

  return (
    <html lang={props.lang} className={clsx(theme, className)} {...props}>
      {children}
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
