"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const ai_util_1 = require("../utils/ai_util");
const matching_util_1 = require("../utils/matching_util");
const router = express_1.default.Router();
exports.router = router;
router.post('/add-user', async (req, res) => {
    try {
        const newUser = new user_1.User({
            email: req.body.email,
            bio: req.body.bio,
        });
        await newUser.save();
        const idealProfile = await (0, ai_util_1.generateIdealPartner)(newUser.bio);
        await (0, matching_util_1.checkMatch)(newUser.bio);
        const matchedPartners = await (0, matching_util_1.checkFor50PercentMatch)(newUser.bio);
        res.status(201).json({ idealProfile, matchedPartners });
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error });
    }
});
