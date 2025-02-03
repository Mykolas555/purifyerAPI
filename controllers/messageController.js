const Message = require('../models/messageModel');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const transporter = require("../utils/transporter")

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

  exports.createMessage = async (req, res) => {
    try {
        const { name, email, company, message } = req.body;

        // Save message to database
        const newMessage = new Message({ name, email, company, message });
        const savedMessage = await newMessage.save();

        // Email content
        const mailOptions = {
            from: email, // Sender's email from req.body
            to: process.env.ADMIN_EMAIL, // Your email from environment variables
            subject: 'New Contact Form Message',
            text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            success: true,
            data: savedMessage,
            message: 'Message saved and email sent successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create message or send email',
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
    const messages = await Message.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Messages');
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 40 },
      { header: 'Company', key: 'company', width: 35 },
      { header: 'Message', key: 'message', width: 70 },
      { header: 'Created At', key: 'createdAt', width: 35 },
    ];
    worksheet.getRow(1).font = { bold: true };
    messages.forEach((message) => {
      worksheet.addRow({
        name: message.name,
        email: message.email,
        company: message.company || 'N/A',
        message: message.message,
        createdAt: message.createdAt.toISOString(),
      });
    });
    // Define the file path for the Excel file
    const filePath = path.join(__dirname, 'messages.xlsx');
    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    // Write the workbook to a file
    await workbook.xlsx.writeFile(filePath);
    // Send the file as a download response
    res.download(filePath, 'messages.xlsx', (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        res.status(500).json({ message: 'Could not download the file' });
      }
      // Delete the file after sending it
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error exporting messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};