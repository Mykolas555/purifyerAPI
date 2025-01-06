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

exports.createMessage = async (req, res) => {
    try {
      // Create a new message with the data from the request body
      const { name, email, company, message } = req.body;
  
      // Create a new message document in MongoDB
      const newMessage = new Message({
        name,
        email,
        company,
        message,
      });
  
      // Save the message to the database
      const savedMessage = await newMessage.save();
  
      // Send a success response
      return res.status(201).json({
        success: true,
        data: savedMessage,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create message',
        error: error.message,
      });
    }
  };