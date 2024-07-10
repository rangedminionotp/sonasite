import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

// export const NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     AppleProvider({
//       clientId: process.env.APPLE_ID,
//       clientSecret: process.env.APPLE_SECRET
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET
//     }),
//     // Passwordless / email sign in
//     EmailProvider({
//       server: process.env.MAIL_SERVER,
//       from: 'NextAuth.js <no-reply@example.com>'
//     }),
//   ]
// })

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