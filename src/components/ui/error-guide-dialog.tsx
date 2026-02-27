import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { getText } from "@/lib/i18n";
import { APP_CONFIG } from "@/config";
import { extractSocialMediaLinks } from "@/utils";

interface ErrorGuideDialogProps {
  url: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorMessage?: string;
  telegramGroupUrl?: string;
}

export function ErrorGuideDialog({
  open,
  onOpenChange,
  url,
  errorMessage,
  telegramGroupUrl = "https://t.me/+YJsGEv_hJKhkZWY1", // 这里需要替换为实际的Telegram群链接
}: ErrorGuideDialogProps) {
  const handleJoinTelegram = () => {
    // 在新窗口中打开Telegram群链接
    window.open(telegramGroupUrl, "_blank", "noopener,noreferrer");
  };

  const extractUrl: string = extractSocialMediaLinks(url);

  const handleAuth = () => {
    // console.log("url", url);
    // return;
    // 处理账号授权逻辑
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);
    // form.setAttribute("target", "_blank");

    // Parameters to pass to OAuth 2.0 endpoint.
    var params: any = {
      client_id: APP_CONFIG.oauth2.clientId,
      redirect_uri:
        location.origin + "/" + location.pathname.split("/")[1] + "/callback",
      response_type: "token",
      scope: APP_CONFIG.oauth2.scopes,
      include_granted_scopes: "true",
      state: "pass-through value",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-left">
              {getText("error.dialog.title", { default: "下载失败" })}
            </DialogTitle>
          </div>
          <DialogDescription className="text-left">
            {errorMessage ||
              getText("error.dialog.description", {
                default:
                  "抱歉，视频下载失败了。这可能是由于链接无效、视频已被删除或服务器暂时无法访问。",
              })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {getText("error.dialog.help.title", {
                    default: "需要帮助？",
                  })}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {getText("error.dialog.help.description", {
                    default:
                      "加入我们的Telegram群组，获取实时帮助和技术支持。我们的团队会尽快为您解决问题。",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              {getText("error.dialog.suggestions.title", {
                default: "您也可以尝试：",
              })}
            </p>
            <ul className="list-inside list-disc space-y-1 text-xs">
              <li>
                {getText("error.dialog.suggestion.1", {
                  default: "检查链接是否正确",
                })}
              </li>
              <li>
                {getText("error.dialog.suggestion.2", {
                  default: "确认视频是否为公开状态",
                })}
              </li>
              <li>
                {getText("error.dialog.suggestion.3", { default: "稍后重试" })}
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleClose}
            className="order-2 w-full sm:order-1 sm:w-auto"
          >
            {getText("error.dialog.button.close", { default: "关闭" })}
          </Button>
          {/* {(extractUrl.includes("youtu.be") ||
            extractUrl.includes("youtube.com")) && (
            <Button
              variant="outline"
              onClick={handleAuth}
              className="order-2 w-full sm:order-1 sm:w-auto"
            >
              {getText("error.dialog.button.auth", { default: "账号授权" })}
            </Button>
          )} */}
          <Button
            variant="primary"
            onClick={handleJoinTelegram}
            className="order-1 w-full sm:order-2 sm:w-auto"
            icon={<MessageCircle />}
          >
            {getText("error.dialog.button.join.telegram", {
              default: "加入Telegram群",
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
