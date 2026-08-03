const Message = require("../models/messageModel");
const { sendEmail } = require("./emailService");

// Helper to clean the incoming message data before saving.
function normalizeMessageData(payload) {
  return {
    name: payload.name?.trim(),
    email: payload.email?.trim(),
    subject: payload.subject?.trim(),
    message: payload.message?.trim(),
  };
}

// Get all messages sorted with unread first and newest first.
async function getMessages() {
  try {
    return await Message.find().sort({ isRead: 1, createdAt: -1 });
  } catch (error) {
    const err = new Error("Failed to fetch messages");
    err.statusCode = 500;
    throw err;
  }
}

// Get one message by its ID.
async function getMessageById(messageId) {
  try {
    const message = await Message.findById(messageId);

    if (!message) {
      const error = new Error("Message not found");
      error.statusCode = 404;
      throw error;
    }

    return message;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to fetch message");
    err.statusCode = 500;
    throw err;
  }
}

// Create a new message.
async function createMessage(payload) {
  try {
    const normalizedData = normalizeMessageData(payload);
    const message = new Message(normalizedData);
    const savedMessage = await message.save();

    const adminEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;

    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: "New Portfolio Contact Message",
          html: `
            <h3>New portfolio contact message</h3>
            <p><strong>Name:</strong> ${savedMessage.name}</p>
            <p><strong>Email:</strong> ${savedMessage.email}</p>
            <p><strong>Subject:</strong> ${savedMessage.subject}</p>
            <p><strong>Date:</strong> ${new Date(savedMessage.createdAt).toLocaleString()}</p>
            <p><strong>Message:</strong><br />${savedMessage.message}</p>
          `,
          text: `Name: ${savedMessage.name}\nEmail: ${savedMessage.email}\nSubject: ${savedMessage.subject}\nDate: ${new Date(savedMessage.createdAt).toLocaleString()}\nMessage: ${savedMessage.message}`,
        });
      } catch (emailError) {
        console.error("Failed to send message email:", emailError);
      }
    }

    return savedMessage;
  } catch (error) {
    const err = new Error("Failed to create message");
    err.statusCode = 500;
    throw err;
  }
}

// Mark a message as read.
async function markMessageAsRead(messageId) {
  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true, runValidators: true }
    );

    if (!message) {
      const error = new Error("Message not found");
      error.statusCode = 404;
      throw error;
    }

    return message;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to update message");
    err.statusCode = 500;
    throw err;
  }
}

// Mark a message as unread.
async function markMessageAsUnread(messageId) {
  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: false },
      { new: true, runValidators: true }
    );

    if (!message) {
      const error = new Error("Message not found");
      error.statusCode = 404;
      throw error;
    }

    return message;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to update message");
    err.statusCode = 500;
    throw err;
  }
}

// Delete a message by ID.
async function deleteMessage(messageId) {
  try {
    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
      const error = new Error("Message not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: "Message deleted successfully",
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to delete message");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeMessageData,
  getMessages,
  getMessageById,
  createMessage,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
};
