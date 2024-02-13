import mongoose from 'mongoose';

const url = 'mongodb+srv://binahovav:Gilad2022@cluster0.2e6czzb.mongodb.net/validate_db';

const connectDB = async () => {
  try {
    await mongoose.connect(url, {});

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export { connectDB };
