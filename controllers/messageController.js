const Message = require('../models/messageModel');

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// get message by ID
exports.getMessageById = async (req, res) => {
    try {
      const message = await Message.findById(req.params.ID);
      if (!message) {
        return res.status(404).json({
          status: 'error',
          message: 'Message not found',
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          message,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  };

// Create message
exports.createMessage = async (req, res) => {
    try {
      const { name, email, company, message } = req.body;
      const newMessage = new Message({
        name,
        email,
        company,
        message,
      });
      const savedMessage = await newMessage.save();
      return res.status(201).json({
        success: true,
        data: savedMessage,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create message',
        error: error.message,
      });
    }
  };

// Delete message
  exports.deleteMessage = async (req, res) => {
    try {
      const { ID } = req.params;
      const deletedMessage = await Message.findByIdAndDelete(ID);
      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };