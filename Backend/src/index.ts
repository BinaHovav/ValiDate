import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { router as userRouter } from './routes/users';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.33.2:${PORT}`);
});
