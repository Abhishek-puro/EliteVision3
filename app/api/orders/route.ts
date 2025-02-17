import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 101, status: "Shipped" },
    { id: 102, status: "Delivered" },
    { id: 103, status: "Processing" },
  ]);
}
