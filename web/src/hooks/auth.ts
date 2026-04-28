import { createAuthClient } from 'better-auth/vue';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const authClient = createAuthClient({
  baseURL
});

export const { signIn, signOut, useSession } = authClient;
