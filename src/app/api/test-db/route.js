import client from "@/lib/db";

export async function GET() {
  try {
    await client.connect();
    const db = client.db("mobarrez");
    await db.admin().ping();
    return Response.json({ status: "Database connected successfully" });
  } catch (error) {
    console.error("Database connection failed:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}