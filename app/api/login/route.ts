// app/api/login/route.ts

export async function POST(req: Request) {
    const data = await req.json();
    // Handle the login logic
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  