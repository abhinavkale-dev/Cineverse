import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string | null;
      email?: string | null;
      avatar?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    avatar?: string | null;
  }

  interface Profile {
    picture?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string | null;
    email?: string | null;
    avatar?: string | null;
  }
}
