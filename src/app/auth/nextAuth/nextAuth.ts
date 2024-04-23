import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Retrieve environment variables and assert their types
const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    // Add more providers here if needed
  ],
};

export default NextAuth(authOptions);
