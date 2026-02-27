// 环境类型定义
type Environment = "development" | "test" | "production";

// 获取当前环境
const getEnvironment = (): Environment => {
  // Next.js 使用 NODE_ENV 或自定义环境变量
  const env = process.env.NODE_ENV || process.env.APP_ENV;

  if (env === "development" || env === "test" || env === "production") {
    return env;
  }

  // 默认开发环境
  return "development";
};

// 环境配置
const config = {
  development: {
    apiUrl: "",
    domainUrl: "",
    debug: true,
  },
  test: {
    apiUrl: "",
    domainUrl: "",
    debug: true,
  },
  production: {
    apiUrl: "",
    domainUrl: "",
    debug: false,
  },
};

// 当前环境
const currentEnv = getEnvironment();

// 导出配置
export const BASE_API = config[currentEnv].apiUrl;
export const DOMAIN_URL = config[currentEnv].domainUrl;
export const IS_DEVELOPMENT = currentEnv === "development";
export const IS_PRODUCTION = currentEnv === "production";
export const IS_TEST = currentEnv === "test";

// OAuth2 配置
export const OAUTH2_CLIENT_ID =
  "847529405370-4tbcnfl2nlsj7j07027thkht7rb95fli.apps.googleusercontent.com";
export const OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];

// 环境信息
export const ENVIRONMENT = currentEnv;

// 调试工具
export const DEBUG_CONFIG = {
  logApiCalls: IS_DEVELOPMENT || IS_TEST,
  logErrors: true,
  showDevTools: IS_DEVELOPMENT,
};

// 导出完整配置对象（可选）
export const APP_CONFIG = {
  environment: currentEnv,
  apiUrl: BASE_API,
  domainUrl: DOMAIN_URL,
  oauth2: {
    clientId: OAUTH2_CLIENT_ID,
    scopes: OAUTH2_SCOPES,
  },
  debug: config[currentEnv].debug,
};
