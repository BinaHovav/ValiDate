import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
  name: string;
}

const itemSchema = new Schema({
  name: String,
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export { Item };
