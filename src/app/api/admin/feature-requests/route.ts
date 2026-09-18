import { NextResponse } from "next/server";
import { listFeatureRequests } from "@/lib/feature-request-store";

function isAuthorized(request: Request) {
  const configuredCode = process.env.ADMIN_REQUEST_CODE ?? "levibot1";
  return request.headers.get("x-admin-code") === configuredCode;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Invalid admin code." }, { status: 401 });
  }

  return NextResponse.json({ requests: listFeatureRequests() });
}
