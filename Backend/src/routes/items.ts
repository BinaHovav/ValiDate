import express from 'express';
import { Item } from '../models/item'

const router = express.Router();


// router.post('/addItem', async (req, res) => {
//   try {
//     const newItem = new Item({
//       name: req.body.name,
//     });

//     await newItem.save();

//     res.status(201).json({ success: true, item: newItem });
//   } catch (error) {
//     console.error('Error adding item:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

export { router };
