import express from 'express';
import { User } from '../models/user';
import { generateIdealPartner } from '../utils/ai_util';
import { checkMatch, checkFor50PercentMatch } from '../utils/matching_util';

const router = express.Router();

router.post('/add-user', async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      bio: req.body.bio,
    });
    await newUser.save();

    const idealProfile = await generateIdealPartner(newUser.bio);

    await checkMatch(newUser.bio);
    const matchedPartners = await checkFor50PercentMatch(newUser.bio);

    res.status(201).json({ idealProfile, matchedPartners });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error });
  }
});

export { router };
