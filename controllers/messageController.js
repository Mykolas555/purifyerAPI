const Message = require('../models/messageModel');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

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

// Get message by ID
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

// Export all messages to excel file and download it
  exports.exportMessagesToExcel = async (req, res) => {
    try {
      // Fetch all messages from the database
      const messages = await Message.find();
  
      // Convert the data to a format compatible with xlsx
      const messageData = messages.map((message) => ({
        Name: message.name,
        Email: message.email,
        Company: message.company || 'N/A',
        Message: message.message,
        CreatedAt: message.createdAt.toISOString(),
      }));
  
      // Create a new workbook and add a worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(messageData);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Messages');
  
      // Define the file path for the Excel file
      const filePath = path.join(__dirname, 'exports', 'messages.xlsx');
  
      // Ensure the directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
      // Write the workbook to a file
      XLSX.writeFile(workbook, filePath);
  
      // Send the file as a download response
      res.download(filePath, 'messages.xlsx', (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).json({ message: 'Could not download the file' });
        }
  
        // Optional: Delete the file after sending it
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.error('Error exporting messages:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  