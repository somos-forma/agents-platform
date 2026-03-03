import {
  workspaceAdapter,
  workspaceDetailsAdapter,
} from "@/features/workspaces/adapter";

export async function createNewChat(
  userId: string,
  agentId: string,
  workspaceId: string
) {
  try {
    const response = await fetch(`/api/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, agentId, workspaceId }),
    });

    if (!response.ok) throw new Error("Failed to create chat");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

export async function sendMessage(
  chatId: string,
  message: string,
  attachments: File[] | undefined,
  path: string
) {
  try {
    const formdata = new FormData();
    formdata.append("chat_id", chatId);
    formdata.append("message", message);
    if (attachments && attachments.length > 0) {
      attachments.forEach((file) => {
        formdata.append("attachments", file);
      });
    }
    const response = await fetch(`/api/chats/webhook/${path}`, {
      method: "POST",
      body: formdata,
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function getChatConversations(
  userId: string,
  agentId: string,
  workspaceId: string
) {
  const response = await fetch(
    `/api/chats/conversations?userId=${userId}&agentId=${agentId}&workspaceId=${workspaceId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch chat conversations");
  const data = await response.json();

  const filteredData = data.filter((item: any) => item.status === true);

  const sortedMessages = [...filteredData].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return sortedMessages;
}

export async function deleteChat(chatId: string) {
  const response = await fetch(`/api/chats/${chatId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete chat");
  const data = await response.json();

  return true;
}

// client
export async function getWorkspaces() {
  const response = await fetch("/api/client/workspaces", { method: "GET" });
  if (!response.ok) throw new Error("Failed to fetch workspaces");
  const json = await response.json();
  const workspaces = json.workspaces.map(workspaceAdapter);
  return workspaces;
}

export async function getAgentsByWorkspaceId(workspaceId: string) {
  const response = await fetch(`/api/client/workspaces/${workspaceId}/agents`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch agents");
  const json = await response.json();
  return workspaceDetailsAdapter(json).agents;
}
