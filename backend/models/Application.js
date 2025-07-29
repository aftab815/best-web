import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  cnic: String,
  country: String,
  state: String,
  city: String,
  division: String,
  education: String,
  course: String,
  secondCourse: String,
  address: String,
  phone: String,
  email: String,
  type: String,      // e.g. job, volunteer, etc.
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema); 