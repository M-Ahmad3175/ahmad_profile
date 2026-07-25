const messageService = require("../services/messageService");

// Get all messages.
async function getMessages(req, res, next) {
  try {
    const messages = await messageService.getMessages();

    res.status(200).json({
      success: true,
      data: {
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get one message by ID.
async function getMessage(req, res, next) {
  try {
    const message = await messageService.getMessageById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create a new message.
async function createMessage(req, res, next) {
  try {
    const message = await messageService.createMessage(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Mark a message as read.
async function markMessageAsRead(req, res, next) {
  try {
    const message = await messageService.markMessageAsRead(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Delete a message by ID.
async function deleteMessage(req, res, next) {
  try {
    const result = await messageService.deleteMessage(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  markMessageAsRead,
  deleteMessage,
};
