const Message = require('../models/messageModel');

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err) {
    console.log(err); // Log the error for debugging
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


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
      console.log(err); // Log the error for debugging
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  };