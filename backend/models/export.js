const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const {  User } = require('../models/users');
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   address: String,
//   email: String,
//   qualification: String,
//   mobile_no: Number,
//   password: String
// });

// const User = mongoose.model('User', userSchema);

// Fetch data from the users collection

const fetchUsers = async (filter) => {
  try {
    const { email, age } = filter;
    const query = {};

    if (email) {
      query.email = email;
    }
    if (age) {
      query.age = age;
    }

    const users = await User.find(query).lean();
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// Export users as an Excel file
const exportUsers = async (res, filter) => {
  try {
    // Fetch users based on the filter
    const users = await fetchUsers(filter);

    // Create an Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Define the column headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Age', key: 'age', width: 10 },
    ];

    // Add data to the worksheet
    users.forEach(user => {
      worksheet.addRow(user);
    });

    // Set the response headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

    // Stream the Excel workbook to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Failed to export file:', error);
    res.status(500).json({ error: 'Failed to export file' });
  }
};

module.exports = {
  User,
  fetchUsers,
  exportUsers
};
