import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/**
 * 获取用户的 Stripe Customer 信息
 * GET /api/stripe/customer
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ code: 4001, msg: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient();
    const { data: userData } = await supabase
      .from("snapvee_users")
      .select("stripe_customer_id, user_level, subscription_status")
      .eq("id", session.user.id)
      .single();

    if (!userData) {
      return NextResponse.json({ code: 4004, msg: "User not found" }, { status: 404 });
    }

    // 获取订阅信息
    let subscription = null;
    if (userData.stripe_customer_id) {
      const { data: subscriptionData } = await supabase
        .from("snapvee_subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      subscription = subscriptionData;
    }

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: {
        userLevel: userData.user_level,
        subscriptionStatus: userData.subscription_status,
        subscription,
      },
    });
  } catch (error: any) {
    console.error("Get customer error:", error);
    return NextResponse.json(
      { code: 5000, msg: "Internal server error" },
      { status: 500 }
    );
  }
}
