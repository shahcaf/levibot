export type PendingFeatureRequest = {
  webhookUrl: string;
  messageId: string;
  title: string;
  embed: Record<string, unknown>;
  requestId: string;
  category: string;
  priority: string;
  details: string;
  contact: string;
  createdAt: string;
  status: "pending" | "accepted" | "declined";
};

const pendingRequests = new Map<string, PendingFeatureRequest>();
const requestHistory = new Map<string, PendingFeatureRequest>();

export function savePendingRequest(token: string, request: PendingFeatureRequest) {
  pendingRequests.set(token, request);
  requestHistory.set(request.requestId, request);
}

export function takePendingRequest(token: string) {
  const request = pendingRequests.get(token);
  if (request) pendingRequests.delete(token);
  return request;
}

export function getPendingRequest(token: string) {
  return pendingRequests.get(token);
}

export function removePendingRequest(token: string) {
  pendingRequests.delete(token);
}

export function updateRequestStatus(requestId: string, status: "accepted" | "declined") {
  const request = requestHistory.get(requestId);
  if (request) request.status = status;
  return request;
}

export function listFeatureRequests() {
  return Array.from(requestHistory.values()).sort((first, second) =>
    second.createdAt.localeCompare(first.createdAt),
  );
}
