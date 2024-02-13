import natural from 'natural';
import { User } from '../models/user';

// Create a TF-IDF vectorizer
const tfidf = new natural.TfIdf();

// Function to fetch user bios from the database
const getUsersFromDatabase = async (): Promise<{ email: string; bio: string }[]> => {
  const users = await User.find();
  return users.map((user: { email: string; bio: string }) => ({ email: user.email, bio: user.bio }));
};

// Add documents to the TF-IDF vectorizer
const checkMatch = async (newUserBio: string): Promise<void> => {
  const databaseBios = await getUsersFromDatabase();
  databaseBios.forEach((user) => {
    if (user.bio !== newUserBio) {
      tfidf.addDocument(user.bio);
    }
  });
};

// Function to calculate cosine similarity
const calculateCosineSimilarity = (vector1: number[], vector2: number[]): number => {
  const dotProduct = vector1.reduce((acc, value, index) => acc + value * vector2[index], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((acc, value) => acc + value ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, value) => acc + value ** 2, 0));
  return dotProduct / (magnitude1 * magnitude2);
};

// Function to check for a 50% match
const checkFor50PercentMatch = async (userBio: string): Promise<string[]> => {
  const userVector: number[] = [];

  // Calculate the TF-IDF vector for the user's bio
  tfidf.tfidfs(userBio, (index, measure) => {
    userVector[index] = measure;
  });

  // Calculate cosine similarity with each database bio
  const matchedEmails: string[] = [];
  const databaseBios = await getUsersFromDatabase();
  databaseBios.forEach((user, index) => {
    const databaseVector: number[] = [];
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

export { checkMatch, checkFor50PercentMatch };
