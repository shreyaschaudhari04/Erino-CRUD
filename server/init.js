const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://shreyasrchaudhari:mBqyG0sJwyt2Q2n1@cluster0.uxajh.mongodb.net/Erino?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: Number,
  company: String,
  jobTitle: String,
});


const User = mongoose.model('User', userSchema);


const usersData = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', mobileNumber: 9876543220, company: 'Google', jobTitle: 'Software Engineer' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', mobileNumber: 9988776651, company: 'Amazon', jobTitle: 'Product Manager' },
    { firstName: 'Mark', lastName: 'Johnson', email: 'mark.johnson@example.com', mobileNumber: 9123456781, company: 'Microsoft', jobTitle: 'UX Designer' },
    { firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@example.com', mobileNumber: 9081726355, company: 'Apple', jobTitle: 'Hardware Engineer' },
    { firstName: 'William', lastName: 'Davis', email: 'william.davis@example.com', mobileNumber: 9234567891, company: 'Tesla', jobTitle: 'Data Scientist' },
    { firstName: 'Olivia', lastName: 'Martinez', email: 'olivia.martinez@example.com', mobileNumber: 9058765433, company: 'Facebook', jobTitle: 'Marketing Specialist' },
    { firstName: 'David', lastName: 'Garcia', email: 'david.garcia@example.com', mobileNumber: 9345678902, company: 'Netflix', jobTitle: 'Content Strategist' },
    { firstName: 'Sophia', lastName: 'Miller', email: 'sophia.miller@example.com', mobileNumber: 9712345679, company: 'Twitter', jobTitle: 'Community Manager' },
    { firstName: 'James', lastName: 'Anderson', email: 'james.anderson@example.com', mobileNumber: 9456712346, company: 'Salesforce', jobTitle: 'Business Analyst' },
    { firstName: 'Mia', lastName: 'Thomas', email: 'mia.thomas@example.com', mobileNumber: 9876123457, company: 'Adobe', jobTitle: 'Graphic Designer' },
    { firstName: 'Ethan', lastName: 'Moore', email: 'ethan.moore@example.com', mobileNumber: 9922334456, company: 'Oracle', jobTitle: 'Database Administrator' },
    { firstName: 'Ava', lastName: 'Taylor', email: 'ava.taylor@example.com', mobileNumber: 9756123457, company: 'Spotify', jobTitle: 'Sound Engineer' },
    { firstName: 'Liam', lastName: 'Lee', email: 'liam.lee@example.com', mobileNumber: 9865234791, company: 'Snapchat', jobTitle: 'Software Architect' },
    { firstName: 'Charlotte', lastName: 'Wilson', email: 'charlotte.wilson@example.com', mobileNumber: 9085647384, company: 'Airbnb', jobTitle: 'Customer Success Manager' },
    { firstName: 'Henry', lastName: 'Perez', email: 'henry.perez@example.com', mobileNumber: 9398765433, company: 'LinkedIn', jobTitle: 'Network Engineer' },
    { firstName: 'Amelia', lastName: 'Harris', email: 'amelia.harris@example.com', mobileNumber: 9023467891, company: 'Zoom', jobTitle: 'Sales Representative' },
    { firstName: 'Benjamin', lastName: 'Clark', email: 'benjamin.clark@example.com', mobileNumber: 9123456791, company: 'Dropbox', jobTitle: 'Security Analyst' },
    { firstName: 'Harper', lastName: 'Lewis', email: 'harper.lewis@example.com', mobileNumber: 9308765433, company: 'Slack', jobTitle: 'Software Developer' },
    { firstName: 'Alexander', lastName: 'Young', email: 'alexander.young@example.com', mobileNumber: 9213456791, company: 'IBM', jobTitle: 'Cloud Consultant' },
    { firstName: 'Scarlett', lastName: 'King', email: 'scarlett.king@example.com', mobileNumber: 9056789124, company: 'Square', jobTitle: 'Product Designer' },
  ];
  


User.insertMany(usersData)
  .then(() => {
    console.log('Data inserted successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting data:', err);
    mongoose.connection.close();  
  });
