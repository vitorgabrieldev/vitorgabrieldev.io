import { NextResponse } from "next/server";

// Proxies to Web3Forms so the access key lives server-side (env var) instead
// of being hardcoded in client-shipped HTML, as it was on the legacy site.
export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ success: false, message: "Form is not configured." }, { status: 500 });
  }

  const body = await request.json();
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, access_key: accessKey }),
  });
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
