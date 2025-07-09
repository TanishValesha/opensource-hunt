// types/next-auth.d.ts

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
