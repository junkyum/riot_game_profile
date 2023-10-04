import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const name = searchParams.get("code");

  return NextResponse.json({ res: "코드가 있어야해" });
}
