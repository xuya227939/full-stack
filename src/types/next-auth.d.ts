import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      userLevel?: number;
      trialCount?: number;
      trialLimit?: number;
      subscriptionStatus?: string;
      isEarlyBird?: boolean;
      earlyBirdNumber?: number | null;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    userLevel?: number;
    trialCount?: number;
    trialLimit?: number;
    subscriptionStatus?: string;
    isEarlyBird?: boolean;
    earlyBirdNumber?: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userLevel?: number;
    trialCount?: number;
    trialLimit?: number;
    subscriptionStatus?: string;
    isEarlyBird?: boolean;
    earlyBirdNumber?: number | null;
  }
}
