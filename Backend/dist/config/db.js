"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = 'mongodb+srv://binahovav:Gilad2022@cluster0.2e6czzb.mongodb.net/validate_db';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(url, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
exports.connectDB = connectDB;
