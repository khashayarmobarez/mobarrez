import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db(); // your db name if needed
  const user = await db.collection("users").findOne({ email });

  return user;
}
