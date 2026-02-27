import { useMemo } from "react";
import { getLandingPageData as getLandingPageDataUtil } from "@/constants/landingPages";
import { useLocale } from "./useLocale";

/**
 * Hook to get landing page data for a platform, automatically updates when language changes
 */
export function useLandingPageData(platformId: string | undefined) {
  const { currentLocale } = useLocale();

  const landingData = useMemo(() => {
    if (!platformId) return null;
    return getLandingPageDataUtil(platformId);
  }, [platformId, currentLocale]); // 依赖 currentLocale 确保语言变化时重新计算

  return landingData;
}
