import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import messageService from "../../services/messageService";

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString();
}

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messageService.getAll();
      const items = response?.data?.messages || response?.messages || [];
      setMessages(items);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleReadToggle = async (message) => {
    try {
      setBusyId(message._id);
      if (message.isRead) {
        await messageService.markUnread(message._id);
      } else {
        await messageService.markRead(message._id);
      }

      await loadMessages();
    } catch (error) {
      toast.error("Failed to update message status");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      setBusyId(messageId);
      await messageService.delete(messageId);
      await loadMessages();
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm text-gray-600">Review visitor inquiries and manage the inbox.</p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message._id} className={`rounded-xl border p-4 ${message.isRead ? "border-gray-200 bg-gray-50" : "border-blue-200 bg-blue-50/50"}`}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-gray-900">{message.name}</h2>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${message.isRead ? "bg-gray-200 text-gray-700" : "bg-blue-600 text-white"}`}>
                        {message.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{message.email}</p>
                    <p className="text-sm font-medium text-gray-800">{message.subject}</p>
                    <p className="text-sm leading-6 text-gray-700">{message.message}</p>
                    <p className="text-xs text-gray-500">Received: {formatDate(message.createdAt)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button type="button" onClick={() => handleReadToggle(message)} disabled={busyId === message._id} className="bg-gray-700 hover:bg-gray-800">
                      {message.isRead ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                    <Button type="button" onClick={() => handleDelete(message._id)} disabled={busyId === message._id} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}