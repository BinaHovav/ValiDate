"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const item_1 = require("../models/user");
const router = express_1.default.Router();
exports.router = router;
router.post('/addItem', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = new item_1.Item({
            name: req.body.name,
        });
        yield newItem.save();
        res.status(201).json({ success: true, item: newItem });
    }
    catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}));
