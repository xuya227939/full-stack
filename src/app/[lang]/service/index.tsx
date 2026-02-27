import type { Locale } from "@/lib/i18n";

export default function Service({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 mt-12">
        {(currentLocale === "zh" || currentLocale === "zh-TW") && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              服务条款
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">生效日期: 2025.06.27</p>
                <p className="text-gray-400">更新日期: 2026.01.21</p>
                <h2 className="text-white">摘要</h2>
                <p>
                  欢迎使用 <strong>SnapVee</strong>（以下简称
                  “本服务”）。以下条款适用于您使用本服务的所有行为。请在使用本服务前仔细阅读并确保理解和同意以下条款的全部内容。如果您不同意本条款的任何内容，请停止使用本服务。
                </p>
                <h2 className="text-white">接受条款</h2>
                <p>
                  当您访问、浏览或使用本服务时，即表示您已阅读、理解并同意受本条款的约束。
                </p>
                <p>
                  我们有权在必要时修改本条款，并会通过网站公告或其他合理方式通知您。若您在本条款更新后继续使用本服务，则视为您已接受修订后的条款。
                </p>
                <h2 className="text-white">账户注册与登录</h2>
                <h3 className="text-white">账户注册</h3>
                <p>
                  使用本服务需要注册账户。您可以通过邮箱注册，或使用 Google
                  账号进行第三方登录（OAuth）。注册时，您需要提供有效的邮箱地址，我们将自动为您生成用户名。
                </p>
                <h3 className="text-white">第三方登录</h3>
                <p>
                  当您选择使用 Google 账号登录时，您授权我们通过 OAuth 2.0
                  协议从 Google
                  获取您的基本账户信息（包括邮箱地址、姓名、头像等）。这些信息的使用受
                  Google 隐私政策约束，您可以在 Google 账户设置中管理相关权限。
                </p>
                <h3 className="text-white">账户安全</h3>
                <p>
                  您有责任维护账户信息的安全性和保密性。您不得与他人分享您的账户凭据，并对使用您账户进行的所有活动负责。如发现账户被盗用或存在安全风险，请立即联系我们。
                </p>
                <h2 className="text-white">服务说明</h2>
                <h3 className="text-white">主要功能</h3>
                <p>
                  本服务提供从各大社交媒体平台（包括但不限于抖音、B站、小红书、TikTok、YouTube、Instagram、新浪微博等）提取视频、图片等内容的功能，并支持去除水印、快速提取、跨平台使用等服务。
                </p>
                <h3 className="text-white">服务计划</h3>
                <p>
                  本服务提供免费计划和付费计划。免费计划用户享有每日 1
                  次免费下载，付费计划（Basic 和
                  Pro）提供无限下载和优先队列支持。所有付费计划为一次性付费，购买后即可获得永久访问权限。
                </p>
                <h3 className="text-white">服务限制</h3>
                <p>
                  本服务仅用于合法、正当的用途。您应确保对所下载内容的使用符合适用法律法规及平台的使用规则。我们保留根据您的使用情况限制或终止服务的权利。
                </p>
                <h2 className="text-white">用户行为规范</h2>
                <h3 className="text-white">合法使用</h3>
                <p>
                  您应确保使用本服务的行为不违反法律法规、社会公德以及本服务的相关规则。
                </p>
                <h3 className="text-white">尊重知识产权与使用限制</h3>
                <p>
                  您在使用本服务下载、保存或分享任何内容时，应确保已获得相关版权或许可，不得侵犯任何第三方的合法权益。下载的内容仅供个人学习、研究或合理使用，不得用于商业目的或公开传播。您需确保拥有下载内容的合法权限，并遵守当地法律法规。
                  <strong>SnapVee</strong>
                  不对用户的不当使用行为承担责任。
                </p>
                <h3 className="text-white">禁止行为</h3>
                <p>
                  您不得通过本服务上传、传播或存储任何违反法律法规或存在恶意代码、病毒等有害内容的信息，也不得利用本服务从事任何破坏、攻击、盗取他人数据的行为。
                </p>
                <h3 className="text-white">用户承诺</h3>
                <p>使用本服务即表示您承诺并保证：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>不下载任何违反法律法规的内容</li>
                  <li>
                    不下载任何色情、暴力、恐怖、血腥或涉及未成年人不当内容的视频或资料
                  </li>
                  <li>
                    不将下载的内容用于商业传播、销售、盈利或任何未经授权的公开分发
                  </li>
                  <li>仅将下载内容用于个人学习、研究或合理使用</li>
                  <li>尊重原创作者的知识产权和合法权益</li>
                </ul>
                <p className="mt-4">
                  若您违反上述承诺，由此产生的一切法律责任由您自行承担，与本平台无关。
                </p>
                <h2 className="text-white">平台性质声明</h2>
                <p>为明确本服务的性质和责任边界，特此声明：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>技术中立</strong>：SnapVee
                    仅提供视频链接解析和下载的技术服务，不对用户下载的具体内容进行审核、筛选或推荐
                  </li>
                  <li>
                    <strong>不存储视频</strong>：SnapVee
                    不存储任何用户下载的视频内容，所有视频数据直接来源于第三方平台，临时缓存文件会在
                    24 小时内自动删除
                  </li>
                  <li>
                    <strong>用户触发</strong>
                    ：所有下载行为均由用户自行输入链接并主动触发，平台仅被动响应用户的下载请求
                  </li>
                  <li>
                    <strong>不承担内容责任</strong>
                    ：对于用户下载内容的合法性、版权归属及后续使用方式，SnapVee
                    不承担任何审查义务或法律责任
                  </li>
                </ul>
                <h2 className="text-white">知识产权</h2>
                <h3 className="text-white">SnapVee 的知识产权</h3>
                <p>
                  本服务中的软件、技术、页面设计、LOGO、商标等所有相关知识产权均归
                  <strong>SnapVee</strong>
                  或其授权方所有。未经许可，任何人不得擅自复制、修改、传播或进行其他侵权行为。
                </p>
                <h3 className="text-white">用户内容</h3>
                <p>
                  您在使用本服务过程中所上传或分享的内容，其知识产权归您或原始权利人所有。您需保证拥有对该内容进行使用、再传播的合法权利。
                </p>
                <h2 className="text-white">免责声明</h2>
                <h3 className="text-white">内容来源</h3>
                <p>
                  本服务所下载的内容均来自第三方平台，公开访问资料，
                  <strong>SnapVee</strong>
                  不对该内容的合法性、准确性、完整性或及时性做任何保证。用户应自行判断并承担使用该内容的风险。
                </p>
                <h3 className="text-white">技术故障</h3>
                <p>
                  本服务可能因系统维护、设备故障、网络原因等导致暂时中断或无法使用，
                  <strong>SnapVee</strong>
                  不承担由此造成的任何损失或责任，但将尽力减少因此给您带来的影响。
                </p>
                <h3 className="text-white">用户责任</h3>
                <p>
                  由于用户违反本条款或相关法律法规，导致第三方投诉、诉讼或索赔的，用户应自行承担相应责任，并使
                  <strong>SnapVee</strong>免受损害。
                </p>
                <h2 className="text-white">支付与退款</h2>
                <h3 className="text-white">支付方式</h3>
                <p>
                  我们使用 Stripe
                  作为支付处理服务商，接受所有主要信用卡和借记卡。所有支付均采用加密传输，确保您的支付信息安全。我们不会直接收集或存储您的完整支付卡信息，支付信息由
                  Stripe 安全处理。
                </p>
                <h3 className="text-white">退款政策</h3>
                <p>
                  由于数字产品的特殊性，一旦开始使用服务，我们通常不提供退款。但如遇技术问题导致服务完全无法使用，请在购买后
                  7
                  天内联系客服处理。部分地区的消费者可能享有当地法律规定的额外权利。我们建议先使用免费版测试服务。
                </p>
                <h3 className="text-white">订阅状态</h3>
                <p>
                  付费计划为一次性付费，购买后您的账户将永久升级到相应级别。我们保留根据实际情况调整服务计划、价格或功能的权利，但不会影响您已购买的服务的访问权限。
                </p>
                <h2 className="text-white">责任限制</h2>
                <p>
                  在适用法律允许的范围内，对于因使用或无法使用本服务而造成的任何直接、间接、附带、特殊或衍生损害，
                  <strong>SnapVee</strong>
                  不承担任何责任。本服务按"现状"提供，不保证能满足您的全部需求或不出错。我们的总责任不超过您为使用本服务而支付的金额。
                </p>
                <h2 className="text-white">服务变更与终止</h2>
                <h3 className="text-white">服务变更</h3>
                <p>
                  <strong>SnapVee</strong>
                  有权根据实际情况对本服务的部分或全部功能进行修改、暂停或终止，并提前在网站或通过其他方式通知用户。
                </p>
                <h3 className="text-white">终止</h3>
                <p>
                  如您违反本条款或相关法律法规，<strong>SnapVee</strong>
                  有权立即终止向您提供服务，并保留追究法律责任的权利。
                </p>
                <h2 className="text-white">数据保护与隐私</h2>
                <p>
                  我们重视您的隐私保护。关于我们如何收集、使用、存储和保护您的个人信息，请参阅我们的
                  <a
                    href={`https://snapvee.com/${currentLocale}/privacy`}
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    隐私政策
                  </a>
                  。使用本服务即表示您同意我们的隐私政策。
                </p>
                <h2 className="text-white">适用法律与争议解决</h2>
                <h3 className="text-white">适用法律</h3>
                <p>
                  本条款的成立、效力、解释及争议解决，均适用本服务运营方所在地的法律。
                </p>
                <h3 className="text-white">争议解决</h3>
                <p>
                  若因本条款或本服务引起争议，双方应友好协商解决；协商不成的，可向运营方所在地有管辖权的人民法院提起诉讼。
                </p>
                <h2 className="text-white">联系我们</h2>
                <p>
                  如果您对本服务条款有任何疑问、意见或投诉，请通过以下方式联系我们：
                </p>
                <p>
                  邮箱：support@snapvee.com
                  <br />
                  我们将在合理期限内回复您的请求。
                </p>
              </div>
            </article>
          </div>
        )}
        {(currentLocale === "en" ||
          ["es", "pt", "ru", "fr", "de", "it"].includes(currentLocale)) && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              Terms of Service
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">Effective Date: 2025.02.19</p>
                <p className="text-gray-400">Updated Date: 2026.01.21</p>
                <h2 className="text-white">Summary</h2>
                <p>
                  Welcome to <strong>SnapVee</strong> (hereinafter referred to
                  as “the Service”). The following terms apply to all your
                  actions in using the Service. Please read these terms
                  carefully and ensure that you understand and agree to all of
                  them before using the Service. If you do not agree to any of
                  these terms, please stop using the Service.
                </p>
                <h2 className="text-white">Acceptance of Terms</h2>
                <p>
                  By accessing, browsing, or using the Service, you acknowledge
                  that you have read, understood, and agree to be bound by these
                  terms.
                </p>
                <p>
                  We reserve the right to modify these terms as necessary, and
                  we will notify you via website announcements or other
                  reasonable means. Your continued use of the Service after any
                  updates will be deemed as acceptance of the revised terms.
                </p>
                <h2 className="text-white">Account Registration and Login</h2>
                <h3 className="text-white">Account Registration</h3>
                <p>
                  Using the Service requires account registration. You can
                  register with an email address or use your Google account for
                  third-party login (OAuth). During registration, you need to
                  provide a valid email address, and we will automatically
                  generate a username for you.
                </p>
                <h3 className="text-white">Third-Party Login</h3>
                <p>
                  When you choose to sign in with Google, you authorize us to
                  obtain your basic account information (including email
                  address, name, profile picture, etc.) from Google through the
                  OAuth 2.0 protocol. The use of this information is subject to
                  Google's Privacy Policy, and you can manage related
                  permissions in your Google account settings.
                </p>
                <h3 className="text-white">Account Security</h3>
                <p>
                  You are responsible for maintaining the security and
                  confidentiality of your account information. You must not
                  share your account credentials with others and are responsible
                  for all activities conducted using your account. If you
                  discover that your account has been compromised or there is a
                  security risk, please contact us immediately.
                </p>
                <h2 className="text-white">Service Description</h2>
                <h3 className="text-white">Main Features</h3>
                <p>
                  The Service provides features for extracting videos, images,
                  and other content from major social media platforms (including
                  but not limited to Douyin, Bilibili, Xiaohongshu, TikTok,
                  YouTube, Instagram, Sina Weibo, etc.). It also supports
                  watermark removal, rapid extraction, and cross-platform usage.
                </p>
                <h3 className="text-white">Service Plans</h3>
                <p>
                  The Service offers free and paid plans. Free plan users have
                  limited download attempts (3 times), while paid plans (Basic
                  and Pro) provide unlimited downloads and priority queue
                  support. All paid plans are one-time payments that grant
                  permanent access upon purchase.
                </p>
                <h3 className="text-white">Service Limitations</h3>
                <p>
                  The Service is for legal and legitimate use only. You must
                  ensure that your use of the downloaded content complies with
                  applicable laws, regulations, and the usage rules of the
                  respective platforms. We reserve the right to limit or
                  terminate the Service based on your usage.
                </p>
                <h2 className="text-white">User Conduct Guidelines</h2>
                <h3 className="text-white">Lawful Use</h3>
                <p>
                  You must ensure that your use of the Service does not violate
                  any laws, regulations, social ethics, or the relevant rules of
                  the Service.
                </p>
                <h3 className="text-white">
                  Respect for Intellectual Property & Usage Restrictions
                </h3>
                <p>
                  When using the Service to download, save, or share any
                  content, you must ensure that you have obtained the relevant
                  copyrights or permissions and do not infringe on the
                  legitimate rights of any third party. Downloaded content is
                  for personal use, learning, research, or fair use only and may
                  not be used for commercial purposes or public distribution.
                  You must ensure you have legal rights to download the content
                  and comply with local laws. <strong>SnapVee</strong> is not
                  responsible for users' misuse of downloaded content.
                </p>
                <h3 className="text-white">Prohibited Activities</h3>
                <p>
                  You may not upload, distribute, or store any information
                  through the Service that violates laws or contains malicious
                  code, viruses, or other harmful content. You also may not use
                  the Service to engage in any activities that damage, attack,
                  or steal data from others.
                </p>
                <h3 className="text-white">User Commitments</h3>
                <p>By using this Service, you commit and warrant that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You will not download any content that violates applicable
                    laws and regulations
                  </li>
                  <li>
                    You will not download any pornographic, violent, terrorist,
                    gory content, or any content involving inappropriate
                    material related to minors
                  </li>
                  <li>
                    You will not use downloaded content for commercial
                    distribution, sale, profit, or any unauthorized public
                    dissemination
                  </li>
                  <li>
                    You will only use downloaded content for personal learning,
                    research, or fair use
                  </li>
                  <li>
                    You will respect the intellectual property rights and
                    legitimate interests of original creators
                  </li>
                </ul>
                <p className="mt-4">
                  If you violate the above commitments, you shall bear all
                  resulting legal responsibilities, which are unrelated to this
                  platform.
                </p>
                <h2 className="text-white">Platform Statement</h2>
                <p>
                  To clarify the nature and liability boundaries of this
                  Service, we hereby declare:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Technical Neutrality</strong>: SnapVee only provides
                    technical services for video link parsing and downloading.
                    We do not review, filter, or recommend the specific content
                    that users download
                  </li>
                  <li>
                    <strong>No Video Storage</strong>: SnapVee does not store
                    any video content downloaded by users. All video data comes
                    directly from third-party platforms, and temporary cache
                    files are automatically deleted within 24 hours
                  </li>
                  <li>
                    <strong>User-Initiated</strong>: All download actions are
                    initiated by users who enter links and actively trigger
                    downloads. The platform only passively responds to user
                    download requests
                  </li>
                  <li>
                    <strong>No Content Liability</strong>: SnapVee assumes no
                    review obligation or legal responsibility for the legality,
                    copyright ownership, or subsequent use of content downloaded
                    by users
                  </li>
                </ul>
                <h2 className="text-white">Intellectual Property</h2>
                <h3 className="text-white">SnapVee’s Intellectual Property</h3>
                <p>
                  All related intellectual property rights for the software,
                  technology, page designs, LOGO, trademarks, etc., in the
                  Service belong to <strong>SnapVee</strong> or its licensors.
                  No one is allowed to copy, modify, distribute, or otherwise
                  infringe upon these rights without permission.
                </p>
                <h3 className="text-white">User Content</h3>
                <p>
                  The intellectual property rights for the content you upload or
                  share during your use of the Service belong to you or the
                  original rights holder. You must ensure that you have the
                  legal right to use and redistribute such content.
                </p>
                <h2 className="text-white">Disclaimer</h2>
                <h3 className="text-white">Content Source</h3>
                <p>
                  All content downloaded via the Service is sourced from
                  third-party platforms and publicly available materials.{" "}
                  <strong>SnapVee</strong> does not guarantee the legality,
                  accuracy, completeness, or timeliness of such content. Users
                  are responsible for evaluating and assuming the risks
                  associated with using the content.
                </p>
                <h3 className="text-white">Technical Failures</h3>
                <p>
                  The Service may be temporarily interrupted or unavailable due
                  to system maintenance, equipment failure, network issues, etc.{" "}
                  <strong>SnapVee</strong> is not responsible for any losses or
                  liabilities resulting from such interruptions, but will make
                  every effort to minimize the impact on you.
                </p>
                <h3 className="text-white">User Responsibility</h3>
                <p>
                  If a user violates these terms or applicable laws and
                  regulations, resulting in complaints, litigation, or claims
                  from third parties, the user shall bear the corresponding
                  responsibilities and indemnify <strong>SnapVee</strong> from
                  any damage.
                </p>
                <h2 className="text-white">Payment and Refund</h2>
                <h3 className="text-white">Payment Methods</h3>
                <p>
                  We use Stripe as our payment processor and accept all major
                  credit and debit cards. All payments are transmitted with
                  encryption to ensure your payment information security. We do
                  not directly collect or store your complete payment card
                  information, which is securely processed by Stripe.
                </p>
                <h3 className="text-white">Refund Policy</h3>
                <p>
                  Due to the nature of digital products, we generally do not
                  offer refunds once the service has been used. However, if you
                  experience technical issues that completely prevent service
                  usage, please contact support within 7 days of purchase.
                  Consumers in certain regions may have additional rights under
                  local laws. We recommend trying the free plan first to test
                  the service.
                </p>
                <h3 className="text-white">Subscription Status</h3>
                <p>
                  Paid plans are one-time payments, and your account will be
                  permanently upgraded to the corresponding level upon purchase.
                  We reserve the right to adjust service plans, prices, or
                  features based on actual circumstances, but this will not
                  affect your access to services you have already purchased.
                </p>
                <h2 className="text-white">Limitation of Liability</h2>
                <p>
                  To the extent permitted by applicable law,{" "}
                  <strong>SnapVee</strong> shall not be liable for any direct,
                  indirect, incidental, special, or consequential damages
                  arising from or relating to your use or inability to use the
                  Service. The Service is provided on an "as is" basis, and we
                  do not guarantee that it will meet all of your needs or be
                  error-free. Our total liability shall not exceed the amount
                  you paid for using this Service.
                </p>
                <h2 className="text-white">
                  Changes and Termination of the Service
                </h2>
                <h3 className="text-white">Service Changes</h3>
                <p>
                  <strong>SnapVee</strong> reserves the right to modify,
                  suspend, or terminate part or all of the Service’s functions
                  as necessary, and will notify users in advance via the website
                  or other means.
                </p>
                <h3 className="text-white">Termination</h3>
                <p>
                  If you violate these terms or applicable laws and regulations,{" "}
                  <strong>SnapVee</strong> reserves the right to immediately
                  terminate the Service for you and to pursue any legal remedies
                  available.
                </p>
                <h2 className="text-white">Data Protection and Privacy</h2>
                <p>
                  We value your privacy protection. For information on how we
                  collect, use, store, and protect your personal information,
                  please refer to our{" "}
                  <a
                    href={`https://snapvee.com/${currentLocale}/privacy`}
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Privacy Policy
                  </a>
                  . By using the Service, you agree to our Privacy Policy.
                </p>
                <h2 className="text-white">
                  Governing Law and Dispute Resolution
                </h2>
                <h3 className="text-white">Governing Law</h3>
                <p>
                  These terms, their validity, interpretation, and any disputes
                  arising out of them shall be governed by the laws of the
                  jurisdiction in which the Service operator is located.
                </p>
                <h3 className="text-white">Dispute Resolution</h3>
                <p>
                  In the event of any disputes arising from these terms or the
                  Service, both parties shall attempt to resolve the dispute
                  amicably; if an amicable resolution cannot be reached, the
                  dispute may be submitted to the competent People's Court in
                  the jurisdiction where the Service operator is located.
                </p>
                <h2 className="text-white">Contact Us</h2>
                <p>
                  If you have any questions, comments, or complaints about these
                  Terms of Service, please contact us at:
                </p>
                <p>
                  Email: support@snapvee.com
                  <br />
                  We will respond to your request within a reasonable timeframe.
                </p>
              </div>
            </article>
          </div>
        )}
        {/* --- 한국어 (Korean) 서비스 약관 시작 --- */}
        {currentLocale === "ko" && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              서비스 약관
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">시행일: 2025.06.27</p>
                <p className="text-gray-400">업데이트일: 2025.06.27</p>
                <h2 className="text-white">요약</h2>
                <p>
                  <strong>SnapVee</strong>("본 서비스")를 이용해 주셔서
                  감사합니다. 아래 약관은 귀하의 본 서비스 이용과 관련된 모든
                  행위에 적용됩니다. 본 서비스를 사용하기 전에 아래 약관의 전체
                  내용을 주의 깊게 읽고 이해하며 동의했는지 확인하십시오. 본
                  약관의 내용에 동의하지 않는 경우, 본 서비스 사용을
                  중단하십시오.
                </p>
                <h2 className="text-white">약관 동의</h2>
                <p>
                  귀하가 본 서비스에 접속, 탐색 또는 사용할 때, 귀하는 본 약관을
                  읽고 이해했으며 이에 구속되는 것에 동의함을 의미합니다.
                </p>
                <p>
                  당사는 필요에 따라 본 약관을 수정할 권리를 가지며, 웹사이트
                  공지 또는 기타 합리적인 방법으로 귀하에게 통지할 것입니다.
                  귀하가 본 약관 업데이트 후에도 본 서비스를 계속 사용하는 경우,
                  수정된 약관에 동의한 것으로 간주됩니다.
                </p>
                <h2 className="text-white">서비스 설명</h2>
                <h3 className="text-white">주요 기능</h3>
                <p>
                  본 서비스는 주요 소셜 미디어 플랫폼(틱톡, 빌리빌리, 샤오홍슈,
                  TikTok, YouTube, Instagram, 시나 웨이보 등을 포함하되 이에
                  국한되지 않음)에서 비디오, 이미지 등의 콘텐츠를 추출하는
                  기능을 제공하며, 워터마크 제거, 빠른 추출, 크로스 플랫폼 사용
                  등의 서비스를 지원합니다.
                </p>
                <h3 className="text-white">서비스 제한</h3>
                <p>
                  본 서비스는 합법적이고 정당한 용도로만 사용되어야 합니다.
                  귀하는 다운로드한 콘텐츠의 사용이 관련 법규 및 플랫폼의 사용
                  규칙을 준수하는지 확인해야 합니다.
                </p>
                <h2 className="text-white">이용자 행위 규범</h2>
                <h3 className="text-white">합법적 사용</h3>
                <p>
                  귀하는 본 서비스 사용 행위가 법규, 사회 도덕 및 본 서비스의
                  관련 규칙을 위반하지 않도록 해야 합니다.
                </p>
                <h3 className="text-white">지적재산권 존중</h3>
                <p>
                  귀하는 본 서비스를 사용하여 콘텐츠를 다운로드, 저장 또는
                  공유할 때, 관련 저작권 또는 허가를 얻었는지 확인해야 하며,
                  제3자의 합법적인 권리를 침해해서는 안 됩니다.
                  <strong>SnapVee</strong>는 다운로드 및 워터마크 제거 기능을
                  개인의 합리적인 사용을 위해서만 제공하며, 침해 또는 불법적인
                  목적으로 사용되어서는 안 됩니다.
                </p>
                <h3 className="text-white">금지 행위</h3>
                <p>
                  귀하는 본 서비스를 통해 법규를 위반하거나 악성 코드, 바이러스
                  등 유해한 내용의 정보를 업로드, 전파 또는 저장해서는 안 되며,
                  본 서비스를 이용하여 타인의 데이터를 파괴, 공격, 도용하는
                  행위를 해서도 안 됩니다.
                </p>
                <h3 className="text-white">사용자 서약</h3>
                <p>
                  본 서비스를 사용함으로써 귀하는 다음 사항을 서약하고
                  보증합니다:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    법률 및 규정을 위반하는 콘텐츠를 다운로드하지 않습니다
                  </li>
                  <li>
                    음란물, 폭력, 테러, 잔인한 콘텐츠 또는 미성년자 관련
                    부적절한 콘텐츠를 다운로드하지 않습니다
                  </li>
                  <li>
                    다운로드한 콘텐츠를 상업적 배포, 판매, 영리 목적 또는 무단
                    공개 배포에 사용하지 않습니다
                  </li>
                  <li>
                    다운로드한 콘텐츠는 개인 학습, 연구 또는 공정 사용
                    목적으로만 사용합니다
                  </li>
                  <li>원저작자의 지적재산권과 합법적 권리를 존중합니다</li>
                </ul>
                <p className="mt-4">
                  위 서약을 위반할 경우, 이로 인한 모든 법적 책임은 귀하가
                  부담하며 본 플랫폼과 무관합니다.
                </p>
                <h2 className="text-white">플랫폼 성격 선언</h2>
                <p>
                  본 서비스의 성격과 책임 범위를 명확히 하기 위해 다음과 같이
                  선언합니다:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>기술 중립성</strong>: SnapVee는 비디오 링크 분석 및
                    다운로드 기술 서비스만 제공하며, 사용자가 다운로드하는
                    구체적인 콘텐츠에 대해 검토, 필터링 또는 추천하지 않습니다
                  </li>
                  <li>
                    <strong>비디오 미저장</strong>: SnapVee는 사용자가
                    다운로드한 비디오 콘텐츠를 저장하지 않습니다. 모든 비디오
                    데이터는 타사 플랫폼에서 직접 제공되며, 임시 캐시 파일은
                    24시간 이내에 자동 삭제됩니다
                  </li>
                  <li>
                    <strong>사용자 시작</strong>: 모든 다운로드 행위는 사용자가
                    직접 링크를 입력하고 능동적으로 시작합니다. 플랫폼은
                    사용자의 다운로드 요청에 수동적으로 응답할 뿐입니다
                  </li>
                  <li>
                    <strong>콘텐츠 책임 없음</strong>: 사용자가 다운로드한
                    콘텐츠의 합법성, 저작권 귀속 및 후속 사용 방법에 대해
                    SnapVee는 어떠한 검토 의무나 법적 책임도 부담하지 않습니다
                  </li>
                </ul>
                <h2 className="text-white">지적재산권</h2>
                <h3 className="text-white">SnapVee의 지적재산권</h3>
                <p>
                  본 서비스의 소프트웨어, 기술, 페이지 디자인, 로고, 상표 등
                  모든 관련 지적재산권은
                  <strong>SnapVee</strong> 또는 그 라이선스 제공자에게 있습니다.
                  허가 없이 복제, 수정, 전파 또는 기타 침해 행위를 해서는 안
                  됩니다.
                </p>
                <h3 className="text-white">이용자 콘텐츠</h3>
                <p>
                  귀하가 본 서비스 사용 과정에서 업로드하거나 공유한 콘텐츠의
                  지적재산권은 귀하 또는 원 권리자에게 있습니다. 귀하는 해당
                  콘텐츠를 사용하고 재배포할 수 있는 합법적인 권리를 보유하고
                  있음을 보증해야 합니다.
                </p>
                <h2 className="text-white">면책 조항</h2>
                <h3 className="text-white">콘텐츠 출처</h3>
                <p>
                  본 서비스에서 다운로드한 콘텐츠는 모두 제3자 플랫폼, 공개
                  액세스 자료에서 비롯되며,
                  <strong>SnapVee</strong>는 해당 콘텐츠의 합법성, 정확성,
                  완전성 또는 적시성에 대해 어떠한 보증도 하지 않습니다.
                  이용자는 해당 콘텐츠 사용의 위험을 스스로 판단하고 부담해야
                  합니다.
                </p>
                <h3 className="text-white">기술적 결함</h3>
                <p>
                  본 서비스는 시스템 유지보수, 장비 고장, 네트워크 문제 등으로
                  인해 일시적으로 중단되거나 사용할 수 없게 될 수 있으며,
                  <strong>SnapVee</strong>는 이로 인해 발생하는 어떠한 손실이나
                  책임도 부담하지 않지만, 귀하에게 미치는 영향을 최소화하기 위해
                  노력할 것입니다.
                </p>
                <h3 className="text-white">이용자 책임</h3>
                <p>
                  이용자가 본 약관 또는 관련 법규를 위반하여 제3자의 불만, 소송
                  또는 청구가 발생하는 경우, 이용자는 스스로 해당 책임을
                  부담해야 하며,
                  <strong>SnapVee</strong>가 손해를 입지 않도록 해야 합니다.
                </p>
                <h2 className="text-white">책임 제한</h2>
                <p>
                  적용 가능한 법률이 허용하는 범위 내에서, 본 서비스의 사용 또는
                  사용 불능으로 인해 발생하는 모든 직접적, 간접적, 부수적, 특별
                  또는 파생적 손해에 대해
                  <strong>SnapVee</strong>는 어떠한 책임도 지지 않습니다. 본
                  서비스는 "현 상태대로" 제공되며, 귀하의 모든 요구를
                  충족시키거나 오류가 없음을 보장하지 않습니다.
                </p>
                <h2 className="text-white">서비스 변경 및 종료</h2>
                <h3 className="text-white">서비스 변경</h3>
                <p>
                  <strong>SnapVee</strong>는 실제 상황에 따라 본 서비스의 일부
                  또는 전체 기능을 수정, 일시 중지 또는 종료할 권리를 가지며,
                  웹사이트 또는 기타 방법을 통해 사용자에게 사전에 통지합니다.
                </p>
                <h3 className="text-white">종료</h3>
                <p>
                  귀하가 본 약관 또는 관련 법규를 위반하는 경우,{" "}
                  <strong>SnapVee</strong>는 즉시 귀하에게 서비스 제공을 종료할
                  권리를 가지며, 법적 책임을 추궁할 권리를 보유합니다.
                </p>
                <h2 className="text-white">준거법 및 분쟁 해결</h2>
                <h3 className="text-white">준거법</h3>
                <p>
                  본 약관의 성립, 효력, 해석 및 분쟁 해결은 본 서비스 운영자
                  소재지의 법률을 준수합니다.
                </p>
                <h2 className="text-white">분쟁 해결</h2>
                <p>
                  본 약관 또는 본 서비스로 인해 분쟁이 발생하는 경우, 쌍방은
                  우호적으로 협상하여 해결해야 합니다. 협상이 이루어지지 않을
                  경우, 운영자 소재지의 관할 법원에 소송을 제기할 수 있습니다.
                </p>
              </div>
            </article>
          </div>
        )}
        {/* --- 한국어 (Korean) 서비스 약관 종료 --- */}
        {/* --- 日本語 (Japanese) 利用規約 開始 --- */}
        {currentLocale === "ja" && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              サービス利用規約
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">発効日: 2025.06.27</p>
                <p className="text-gray-400">更新日: 2025.06.27</p>
                <h2 className="text-white">概要</h2>
                <p>
                  <strong>SnapVee</strong>
                  （以下「本サービス」）をご利用いただきありがとうございます。以下の規約は、お客様による本サービスのすべての利用行為に適用されます。本サービスをご利用になる前に、以下の規約の全文を注意深く読み、理解し、同意したことを確認してください。本規約のいずれかの内容に同意されない場合は、本サービスの利用を中止してください。
                </p>
                <h2 className="text-white">規約への同意</h2>
                <p>
                  お客様が本サービスにアクセス、閲覧、または利用した時点で、本規約を読み、理解し、これに拘束されることに同意したものとみなされます。
                </p>
                <p>
                  当社は、必要に応じて本規約を修正する権利を有し、ウェブサイトでの告知またはその他の合理的な方法によりお客様に通知します。お客様が本規約の更新後も本サービスの利用を継続する場合、改訂後の規約に同意したものとみなされます。
                </p>
                <h2 className="text-white">サービスの説明</h2>
                <h3 className="text-white">主要機能</h3>
                <p>
                  本サービスは、主要なソーシャルメディアプラットフォーム（抖音、Bilibili、小紅書、TikTok、YouTube、Instagram、新浪微博などを含みますが、これらに限定されません）から動画、画像などのコンテンツを抽出する機能を提供し、透かし削除、高速抽出、クロスプラットフォーム利用などのサービスをサポートします。
                </p>
                <h3 className="text-white">サービス制限</h3>
                <p>
                  本サービスは、合法かつ正当な目的にのみ使用されるものとします。お客様は、ダウンロードしたコンテンツの使用が適用される法令およびプラットフォームの利用規則に準拠していることを確認する必要があります。
                </p>
                <h2 className="text-white">ユーザー行動規範</h2>
                <h3 className="text-white">合法的な利用</h3>
                <p>
                  お客様は、本サービスの利用行為が法令、社会の公序良俗、および本サービスの関連規則に違反しないことを確認する必要があります。
                </p>
                <h3 className="text-white">知的財産権の尊重</h3>
                <p>
                  お客様は、本サービスを利用してコンテンツをダウンロード、保存、または共有する際、関連する著作権または許可を得ていることを確認し、いかなる第三者の法的権利も侵害してはなりません。
                  <strong>SnapVee</strong>
                  が提供するダウンロードおよび透かし削除機能は、個人の合理的な使用にのみ使用されるべきであり、いかなる侵害行為または違法な目的にも使用されてはなりません。
                </p>
                <h3 className="text-white">禁止行為</h3>
                <p>
                  お客様は、本サービスを通じて法令に違反したり、悪意のあるコードやウイルスなどの有害なコンテンツを含む情報をアップロード、送信、または保存してはならず、また、本サービスを利用して他人のデータを破壊、攻撃、盗用する行為を行ってはなりません。
                </p>
                <h3 className="text-white">ユーザーの誓約</h3>
                <p>
                  本サービスを利用することにより、お客様は以下の事項を誓約し保証します：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>法令に違反するコンテンツをダウンロードしません</li>
                  <li>
                    ポルノ、暴力、テロ、残虐なコンテンツ、または未成年者に関する不適切なコンテンツをダウンロードしません
                  </li>
                  <li>
                    ダウンロードしたコンテンツを商業的配布、販売、営利目的、または無許可の公開配布に使用しません
                  </li>
                  <li>
                    ダウンロードしたコンテンツは個人の学習、研究、または公正な利用目的にのみ使用します
                  </li>
                  <li>原作者の知的財産権と正当な権利を尊重します</li>
                </ul>
                <p className="mt-4">
                  上記の誓約に違反した場合、それによって生じるすべての法的責任はお客様が負うものとし、本プラットフォームとは一切関係ありません。
                </p>
                <h2 className="text-white">
                  プラットフォームの性質に関する声明
                </h2>
                <p>
                  本サービスの性質と責任範囲を明確にするため、以下のとおり宣言します：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>技術的中立性</strong>
                    ：SnapVeeは動画リンクの解析およびダウンロードの技術サービスのみを提供し、ユーザーがダウンロードする具体的なコンテンツの審査、フィルタリング、または推奨は行いません
                  </li>
                  <li>
                    <strong>動画非保存</strong>
                    ：SnapVeeはユーザーがダウンロードした動画コンテンツを保存しません。すべての動画データはサードパーティプラットフォームから直接提供され、一時キャッシュファイルは24時間以内に自動削除されます
                  </li>
                  <li>
                    <strong>ユーザー起動</strong>
                    ：すべてのダウンロード行為はユーザーが自らリンクを入力し、能動的に開始します。プラットフォームはユーザーのダウンロードリクエストに受動的に応答するのみです
                  </li>
                  <li>
                    <strong>コンテンツ責任なし</strong>
                    ：ユーザーがダウンロードしたコンテンツの合法性、著作権の帰属、およびその後の使用方法について、SnapVeeはいかなる審査義務も法的責任も負いません
                  </li>
                </ul>
                <h2 className="text-white">知的財産権</h2>
                <h3 className="text-white">SnapVeeの知的財産権</h3>
                <p>
                  本サービスにおけるソフトウェア、技術、ページデザイン、ロゴ、商標などすべての関連する知的財産権は、
                  <strong>SnapVee</strong>
                  またはそのライセンサーに帰属します。許可なく複製、変更、送信、またはその他の侵害行為を行ってはなりません。
                </p>
                <h3 className="text-white">ユーザーコンテンツ</h3>
                <p>
                  お客様が本サービス利用中にアップロードまたは共有したコンテンツの知的財産権は、お客様または元の権利者に帰属します。お客様は、当該コンテンツを使用および再送信するための合法的な権利を保持していることを保証するものとします。
                </p>
                <h2 className="text-white">免責事項</h2>
                <h3 className="text-white">コンテンツの出所</h3>
                <p>
                  本サービスでダウンロードされるコンテンツはすべて第三者プラットフォームの公開アクセス資料から提供されており、
                  <strong>SnapVee</strong>
                  は、当該コンテンツの合法性、正確性、完全性、または適時性についていかなる保証も行いません。ユーザーは、当該コンテンツの使用に関するリスクを自ら判断し、負うものとします。
                </p>
                <h3 className="text-white">技術的障害</h3>
                <p>
                  本サービスは、システムメンテナンス、機器の故障、ネットワーク上の理由などにより一時的に中断または利用できなくなる場合がありますが、
                  <strong>SnapVee</strong>
                  は、これにより生じた損失または責任について一切負いません。ただし、お客様への影響を最小限に抑えるよう努めます。
                </p>
                <h3 className="text-white">ユーザーの責任</h3>
                <p>
                  お客様が本規約または関連法令に違反したことにより、第三者からの苦情、訴訟、または請求が発生した場合、お客様は自ら相応の責任を負うものとし、
                  <strong>SnapVee</strong>
                  が損害を受けないようにするものとします。
                </p>
                <h2 className="text-white">責任の制限</h2>
                <p>
                  適用される法律で許可される範囲において、本サービスの利用または利用不能により生じた直接的、間接的、付随的、特別または派生的な損害について、
                  <strong>SnapVee</strong>
                  はいかなる責任も負いません。本サービスは「現状のまま」提供され、お客様のすべての要求を満たすこと、またはエラーがないことを保証するものではありません。
                </p>
                <h2 className="text-white">サービス変更および終了</h2>
                <h3 className="text-white">サービス変更</h3>
                <p>
                  <strong>SnapVee</strong>
                  は、実際の状況に応じて本サービスの一部の機能または全体を修正、一時停止、または終了する権利を有し、事前にウェブサイトまたはその他の方法でユーザーに通知します。
                </p>
                <h3 className="text-white">終了</h3>
                <p>
                  お客様が本規約または関連法令に違反した場合、
                  <strong>SnapVee</strong>
                  は直ちにお客様へのサービス提供を終了する権利を有し、法的責任を追及する権利を留保します。
                </p>
                <h2 className="text-white">準拠法および紛争解決</h2>
                <h3 className="text-white">準拠法</h3>
                <p>
                  本規約の成立、効力、解釈、および紛争解決は、本サービス運営者の所在地を管轄する法律に準拠するものとします。
                </p>
                <h2 className="text-white">紛争解決</h2>
                <p>
                  本規約または本サービスに起因して紛争が生じた場合、当事者双方は友好的に協議して解決するものとします。協議が整わない場合、運営者の所在地を管轄する裁判所に訴訟を提起することができます。
                </p>
              </div>
            </article>
          </div>
        )}
        {/* --- 日本語 (Japanese) 利用規約 終了 --- */}
        {/* --- 힌दी (Hindi) सेवा की शर्तें शुरू --- */}
        {currentLocale === "hi" && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              सेवा की शर्तें
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">प्रभावी तिथि: 2025.06.27</p>
                <p className="text-gray-400">अद्यतन तिथि: 2025.06.27</p>
                <h2 className="text-white">सारांश</h2>
                <p>
                  <strong>SnapVee</strong> (इसके बाद "यह सेवा") का उपयोग करने के
                  लिए आपका स्वागत है। निम्नलिखित शर्तें इस सेवा के आपके सभी
                  उपयोगों पर लागू होती हैं। कृपया इस सेवा का उपयोग करने से पहले
                  निम्नलिखित शर्तों की पूरी सामग्री को ध्यान से पढ़ें और समझें
                  और सहमत हों। यदि आप इन शर्तों के किसी भी भाग से सहमत नहीं हैं,
                  तो कृपया इस सेवा का उपयोग बंद कर दें।
                </p>
                <h2 className="text-white">शर्तों की स्वीकृति</h2>
                <p>
                  जब आप इस सेवा का उपयोग, ब्राउज़ या एक्सेस करते हैं, तो इसका
                  मतलब है कि आपने इन शर्तों को पढ़ लिया है, समझ लिया है और इनसे
                  बंधे रहने के लिए सहमत हैं।
                </p>
                <p>
                  आवश्यक होने पर हमें इन शर्तों को संशोधित करने का अधिकार है, और
                  हम आपको वेबसाइट सूचना या अन्य उचित तरीकों से सूचित करेंगे। यदि
                  आप इन शर्तों के अद्यतन के बाद भी इस सेवा का उपयोग जारी रखते
                  हैं, तो यह माना जाएगा कि आपने संशोधित शर्तों को स्वीकार कर
                  लिया है।
                </p>
                <h2 className="text-white">सेवा विवरण</h2>
                <h3 className="text-white">मुख्य कार्य</h3>
                <p>
                  यह सेवा प्रमुख सोशल मीडिया प्लेटफार्मों (जिनमें Douyin,
                  Bilibili, Xiaohongshu, TikTok, YouTube, Instagram, Sina Weibo
                  आदि शामिल हैं, लेकिन इन्हीं तक सीमित नहीं हैं) से वीडियो,
                  चित्र आदि सामग्री निकालने का कार्य प्रदान करती है, और
                  वॉटरमार्क हटाने, तेजी से निकालने, क्रॉस-प्लेटफ़ॉर्म उपयोग जैसी
                  सेवाओं का समर्थन करती है।
                </p>
                <h3 className="text-white">सेवा सीमाएं</h3>
                <p>
                  यह सेवा केवल कानूनी और उचित उद्देश्यों के लिए उपयोग की जानी
                  चाहिए। आपको यह सुनिश्चित करना चाहिए कि डाउनलोड की गई सामग्री
                  का उपयोग लागू कानूनों और विनियमों और प्लेटफ़ॉर्म के उपयोग
                  नियमों के अनुरूप हो।
                </p>
                <h2 className="text-white">उपयोगकर्ता व्यवहार संहिता</h2>
                <h3 className="text-white">कानूनी उपयोग</h3>
                <p>
                  आपको यह सुनिश्चित करना चाहिए कि इस सेवा का उपयोग करने का आपका
                  व्यवहार कानूनों और विनियमों, सामाजिक नैतिकता और इस सेवा के
                  संबंधित नियमों का उल्लंघन नहीं करता है।
                </p>
                <h3 className="text-white">बौद्धिक संपदा का सम्मान</h3>
                <p>
                  जब आप इस सेवा का उपयोग करके किसी भी सामग्री को डाउनलोड, सहेजते
                  या साझा करते हैं, तो आपको यह सुनिश्चित करना चाहिए कि आपको
                  संबंधित कॉपीराइट या अनुमति प्राप्त हो, और किसी भी तीसरे पक्ष
                  के वैध अधिकारों का उल्लंघन नहीं करना चाहिए।
                  <strong>SnapVee</strong> डाउनलोड और वॉटरमार्क हटाने का कार्य
                  केवल व्यक्तिगत उचित उपयोग के लिए प्रदान करता है, और इसका उपयोग
                  किसी भी उल्लंघनकारी या अवैध उद्देश्य के लिए नहीं किया जाना
                  चाहिए।
                </p>
                <h3 className="text-white">निषिद्ध व्यवहार</h3>
                <p>
                  आपको इस सेवा के माध्यम से कानूनों और विनियमों का उल्लंघन करने
                  वाली या दुर्भावनापूर्ण कोड, वायरस आदि हानिकारक सामग्री वाली
                  किसी भी जानकारी को अपलोड, प्रसारित या संग्रहीत नहीं करना
                  चाहिए, और न ही इस सेवा का उपयोग दूसरों के डेटा को नष्ट करने,
                  हमला करने या चोरी करने के लिए करना चाहिए।
                </p>
                <h3 className="text-white">उपयोगकर्ता प्रतिबद्धता</h3>
                <p>
                  इस सेवा का उपयोग करके, आप निम्नलिखित प्रतिबद्धता और गारंटी
                  देते हैं:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    आप कानूनों और विनियमों का उल्लंघन करने वाली कोई भी सामग्री
                    डाउनलोड नहीं करेंगे
                  </li>
                  <li>
                    आप कोई भी अश्लील, हिंसक, आतंकवादी, खूनी सामग्री, या
                    नाबालिगों से संबंधित अनुचित सामग्री डाउनलोड नहीं करेंगे
                  </li>
                  <li>
                    आप डाउनलोड की गई सामग्री का उपयोग व्यावसायिक वितरण, बिक्री,
                    लाभ, या किसी भी अनधिकृत सार्वजनिक वितरण के लिए नहीं करेंगे
                  </li>
                  <li>
                    आप डाउनलोड की गई सामग्री का उपयोग केवल व्यक्तिगत सीखने,
                    अनुसंधान या उचित उपयोग के लिए करेंगे
                  </li>
                  <li>
                    आप मूल रचनाकारों के बौद्धिक संपदा अधिकारों और वैध हितों का
                    सम्मान करेंगे
                  </li>
                </ul>
                <p className="mt-4">
                  यदि आप उपरोक्त प्रतिबद्धताओं का उल्लंघन करते हैं, तो इससे
                  उत्पन्न होने वाली सभी कानूनी जिम्मेदारियां आपकी होंगी और इस
                  प्लेटफ़ॉर्म से असंबंधित होंगी।
                </p>
                <h2 className="text-white">प्लेटफ़ॉर्म स्वरूप विवरण</h2>
                <p>
                  इस सेवा की प्रकृति और जिम्मेदारी की सीमाओं को स्पष्ट करने के
                  लिए, हम घोषित करते हैं:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>तकनीकी तटस्थता</strong>: SnapVee केवल वीडियो लिंक
                    पार्सिंग और डाउनलोड की तकनीकी सेवाएं प्रदान करता है, और
                    उपयोगकर्ताओं द्वारा डाउनलोड की गई विशिष्ट सामग्री की
                    समीक्षा, फ़िल्टर या अनुशंसा नहीं करता है
                  </li>
                  <li>
                    <strong>वीडियो संग्रहीत नहीं</strong>: SnapVee उपयोगकर्ताओं
                    द्वारा डाउनलोड की गई किसी भी वीडियो सामग्री को संग्रहीत नहीं
                    करता है। सभी वीडियो डेटा सीधे तृतीय-पक्ष प्लेटफ़ॉर्म से आते
                    हैं, और अस्थायी कैश फ़ाइलें 24 घंटे के भीतर स्वचालित रूप से
                    हटा दी जाती हैं
                  </li>
                  <li>
                    <strong>उपयोगकर्ता द्वारा शुरू</strong>: सभी डाउनलोड
                    क्रियाएं उपयोगकर्ताओं द्वारा स्वयं लिंक दर्ज करके और सक्रिय
                    रूप से शुरू की जाती हैं। प्लेटफ़ॉर्म केवल उपयोगकर्ता के
                    डाउनलोड अनुरोधों का निष्क्रिय रूप से जवाब देता है
                  </li>
                  <li>
                    <strong>सामग्री जिम्मेदारी नहीं</strong>: उपयोगकर्ताओं
                    द्वारा डाउनलोड की गई सामग्री की वैधता, कॉपीराइट स्वामित्व और
                    बाद के उपयोग के लिए, SnapVee कोई समीक्षा दायित्व या कानूनी
                    जिम्मेदारी नहीं लेता है
                  </li>
                </ul>
                <h2 className="text-white">बौद्धिक संपदा</h2>
                <h3 className="text-white">SnapVee की बौद्धिक संपदा</h3>
                <p>
                  इस सेवा के सॉफ़्टवेयर, प्रौद्योगिकी, पेज डिज़ाइन, लोगो,
                  ट्रेडमार्क आदि सहित सभी संबंधित बौद्धिक संपदा अधिकार
                  <strong>SnapVee</strong> या उसके अधिकृत पक्षों के हैं। अनुमति
                  के बिना किसी को भी अनधिकृत रूप से प्रतिलिपि बनाने, संशोधित
                  करने, प्रसारित करने या अन्य उल्लंघनकारी कार्य करने की अनुमति
                  नहीं है।
                </p>
                <h3 className="text-white">उपयोगकर्ता सामग्री</h3>
                <p>
                  इस सेवा का उपयोग करते समय आपके द्वारा अपलोड या साझा की गई
                  सामग्री का बौद्धिक संपदा अधिकार आपके या मूल अधिकार धारक का है।
                  आपको यह गारंटी देनी होगी कि आपके पास उस सामग्री का उपयोग करने
                  और उसे पुन: वितरित करने का कानूनी अधिकार है।
                </p>
                <h2 className="text-white">अस्वीकरण</h2>
                <h3 className="text-white">सामग्री स्रोत</h3>
                <p>
                  इस सेवा से डाउनलोड की गई सभी सामग्री तृतीय-पक्ष प्लेटफार्मों,
                  सार्वजनिक रूप से सुलभ डेटा से आती है,
                  <strong>SnapVee</strong> उस सामग्री की वैधता, सटीकता, पूर्णता
                  या समयबद्धता के बारे में कोई गारंटी नहीं देता है। उपयोगकर्ताओं
                  को उस सामग्री का उपयोग करने के जोखिम को स्वयं आंकना और वहन
                  करना चाहिए।
                </p>
                <h3 className="text-white">तकनीकी खराबी</h3>
                <p>
                  सिस्टम रखरखाव, उपकरण विफलता, नेटवर्क कारणों आदि के कारण यह
                  सेवा अस्थायी रूप से बाधित या अनुपलब्ध हो सकती है,
                  <strong>SnapVee</strong> इससे होने वाले किसी भी नुकसान या
                  जिम्मेदारी को वहन नहीं करता है, लेकिन इससे आपको होने वाले
                  प्रभाव को कम करने की पूरी कोशिश करेगा।
                </p>
                <h3 className="text-white">उपयोगकर्ता जिम्मेदारी</h3>
                <p>
                  यदि उपयोगकर्ता इन शर्तों या संबंधित कानूनों और विनियमों का
                  उल्लंघन करता है, जिसके परिणामस्वरूप तीसरे पक्ष द्वारा शिकायत,
                  मुकदमा या दावा किया जाता है, तो उपयोगकर्ता को स्वयं संबंधित
                  जिम्मेदारी वहन करनी चाहिए, और
                  <strong>SnapVee</strong> को क्षति से बचाना चाहिए।
                </p>
                <h2 className="text-white">दायित्व की सीमा</h2>
                <p>
                  लागू कानूनों द्वारा अनुमत सीमा तक, इस सेवा के उपयोग या उपयोग
                  करने में असमर्थता के कारण होने वाले किसी भी प्रत्यक्ष,
                  अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी नुकसान के लिए,
                  <strong>SnapVee</strong> कोई जिम्मेदारी नहीं लेता है। यह सेवा
                  "जैसा है" के आधार पर प्रदान की जाती है और यह गारंटी नहीं देती
                  है कि यह आपकी सभी जरूरतों को पूरा करेगी या त्रुटि रहित होगी।
                </p>
                <h2 className="text-white">सेवा में बदलाव और समाप्ति</h2>
                <h3 className="text-white">सेवा में बदलाव</h3>
                <p>
                  <strong>SnapVee</strong> को वास्तविक परिस्थितियों के अनुसार इस
                  सेवा के कुछ या सभी कार्यों को संशोधित करने, निलंबित करने या
                  समाप्त करने का अधिकार है, और वेबसाइट या अन्य माध्यमों से
                  उपयोगकर्ताओं को पहले से सूचित करेगा।
                </p>
                <h3 className="text-white">समाप्ति</h3>
                <p>
                  यदि आप इन शर्तों या संबंधित कानूनों और विनियमों का उल्लंघन
                  करते हैं, तो <strong>SnapVee</strong> के पास आपको सेवा प्रदान
                  करना तुरंत समाप्त करने का अधिकार है, और कानूनी जिम्मेदारी का
                  पीछा करने का अधिकार सुरक्षित रखता है।
                </p>
                <h2 className="text-white">लागू कानून और विवाद समाधान</h2>
                <h3 className="text-white">लागू कानून</h3>
                <p>
                  इन शर्तों की स्थापना, वैधता, व्याख्या और विवाद समाधान इस सेवा
                  के संचालनकर्ता के स्थान के कानूनों पर लागू होंगे।
                </p>
                <h2 className="text-white">विवाद समाधान</h2>
                <p>
                  यदि इन शर्तों या इस सेवा के कारण कोई विवाद उत्पन्न होता है, तो
                  दोनों पक्षों को मैत्रीपूर्ण ढंग से बातचीत करके इसे हल करना
                  चाहिए; यदि बातचीत से कोई समाधान नहीं निकलता है, तो संचालनकर्ता
                  के स्थान पर अधिकार क्षेत्र वाले सक्षम न्यायालय में मुकदमा दायर
                  किया जा सकता है।
                </p>
              </div>
            </article>
          </div>
        )}
        {/* --- 힌दी (Hindi) सेवा की शर्तें समाप्त --- */}
    </section>
  );
}
