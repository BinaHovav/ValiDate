import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
