import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatAiAgent from '@/components/templates/ChatAiAgent';

export default async function ChatPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
  }

  // Pass session data to the component if needed
  return <ChatAiAgent session={session} />;
}