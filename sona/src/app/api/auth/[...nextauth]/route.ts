import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      session.userId = token.sub;
      session.user.email = token.email;  
      session.user.name = token.name;
      session.user.picture = token.picture;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;  // Store email in the token
        token.name = user.name;    // Store name in the token
        token.picture = user?.image;
        token.accessToken = account?.access_token;
        token.idToken = account?.id_token;
      }
      return token;
    },
    async signOut({ session, token }) {
      // Clear token and session data
      return { ...session, ...token, id: null, email: null, name: null };
    },
  },
});

export { handler as GET, handler as POST };