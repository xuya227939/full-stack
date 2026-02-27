import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 检查邮箱是否已注册
 * @param email 邮箱地址
 * @returns true 如果邮箱已注册，false 如果未注册
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const supabase = createClient();

    // 查询 Supabase Auth 中的用户
    const { data: authData, error: authError } =
      await supabase.auth.admin.listUsers();

    // 如果 admin API 不可用，使用查询 snapvee_users 表的方式
    if (authError) {
      // 尝试从 snapvee_users 表查询
      const { data: userData, error: userError } = await supabase
        .from("snapvee_users")
        .select("email")
        .eq("email", email)
        .limit(1)
        .single();

      if (userError && userError.code !== "PGRST116") {
        // PGRST116 表示没有找到记录，这是正常的
        console.error("Error checking email:", userError);
      }

      return !!userData;
    }

    // 使用 admin API 检查
    const userExists = authData?.users?.some((user) => user.email === email);
    return !!userExists;
  } catch (error) {
    console.error("Error checking email existence:", error);
    // 出错时返回 false，允许继续注册流程（由 Supabase 的约束来处理）
    return false;
  }
}

/**
 * 检查邮箱是否已注册（通过查询数据库表）
 * 使用 Admin 客户端绕过 RLS，否则未登录时（如忘记密码）无法查询到 snapvee_users
 */
export async function checkEmailExistsInDatabase(
  email: string,
): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const trimmed = email.trim();

    const { data: userData, error: userError } = await supabase
      .from("snapvee_users")
      .select("id")
      .eq("email", trimmed)
      .limit(1)
      .maybeSingle();

    if (userData) {
      return true;
    }

    if (userError && userError.code !== "PGRST116") {
      console.error("Error checking email in snapvee_users:", userError);
    }

    return false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
}
