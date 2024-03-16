import { NextResponse } from "next/server";

export async function middleware(req) {
  const { nextURL: url, geo } = req;
  const city = geo.city || "New York";
  url.searchParams.set("city", city);

  return NextResponse.rewrite(url);
}
