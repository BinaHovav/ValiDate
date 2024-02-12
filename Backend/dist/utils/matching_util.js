"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFromDatabase = exports.checkFor50PercentMatch = exports.checkMatch = void 0;
const natural_1 = __importDefault(require("natural"));
const user_1 = require("../models/user");
// Create a TF-IDF vectorizer
const tfidf = new natural_1.default.TfIdf();
// Function to fetch user bios from the database
const getUsersFromDatabase = async () => {
    const users = await user_1.User.find();
    return users.map((user) => ({ email: user.email, bio: user.bio }));
};
exports.getUsersFromDatabase = getUsersFromDatabase;
// Add documents to the TF-IDF vectorizer
const checkMatch = async (newUserBio) => {
    const databaseBios = await getUsersFromDatabase();
    databaseBios.forEach((user) => {
        if (user.bio !== newUserBio) {
            tfidf.addDocument(user.bio);
        }
    });
};
exports.checkMatch = checkMatch;
// Function to calculate cosine similarity
const calculateCosineSimilarity = (vector1, vector2) => {
    const dotProduct = vector1.reduce((acc, value, index) => acc + value * vector2[index], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((acc, value) => acc + value ** 2, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((acc, value) => acc + value ** 2, 0));
    return dotProduct / (magnitude1 * magnitude2);
};
// Function to check for a 50% match
const checkFor50PercentMatch = async (userBio) => {
    const userVector = [];
    // Calculate the TF-IDF vector for the user's bio
    tfidf.tfidfs(userBio, (index, measure) => {
        userVector[index] = measure;
    });
    // Calculate cosine similarity with each database bio
    const matchedEmails = [];
    const databaseBios = await getUsersFromDatabase();
    databaseBios.forEach((user, index) => {
        const databaseVector = [];
        tfidf.tfidfs(user.bio, (index, measure) => {
            databaseVector[index] = measure;
        });
        // Check for a 50% match
        const similarity = calculateCosineSimilarity(userVector, databaseVector);
        if (similarity >= 0.5) {
            matchedEmails.push(user.email);
        }
    });
    return matchedEmails;
};
exports.checkFor50PercentMatch = checkFor50PercentMatch;
