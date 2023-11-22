import { cssBundleHref } from "@remix-run/css-bundle";
import tailwindcss from "./tailwind.css";
import { json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getContacts } from "./utils/contacts";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindcss },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader() {
  const data = await getContacts();

  return json({ data });
}

export default function App() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-screen flex">
        <div className=" w-80 h-full bg-zinc-100 shrink-0">
          <div className="p-4 border-b-2 border-b-zinc-200">
            <form className="space-x-2">
              <input
                type="text"
                className="p-2 ring-1 ring-zinc-200 shadow-sm border-zinc-400 rounded-md"
                placeholder="Search"
              />
              <button className="p-2 bg-white ring-1 ring-zinc-200 text-blue-400 rounded-md">
                New
              </button>
            </form>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {data.length
                ? data?.map((contact, index) => (
                    <li key={index}>
                      <Link to={`contacts/${contact?.id}`}>
                        {contact.firstName} {contact.lastName}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="w-full h-screen p-4 ">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
