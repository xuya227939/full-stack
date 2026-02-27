import type { Locale } from "@/lib/i18n";

export default function PrivacyClient({
  currentLocale,
}: {
  currentLocale: Locale;
}) {

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 mt-12">
        {(currentLocale === "zh" || currentLocale === "zh-TW") && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              隐私政策
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">生效日期: 2025.06.27</p>
                <p className="text-gray-400">更新日期: 2026.01.21</p>
                <h2 className="text-white">摘要</h2>
                <p>
                  欢迎使用 <strong>SnapVee</strong>（以下简称
                  “本服务”）。我们深知个人信息对您的重要性，并承诺尊重并保护所有使用本服务的用户（以下简称
                  “用户”）的隐私。本隐私政策（以下简称
                  “本政策”）将帮助您了解我们如何收集、使用、披露、处理和保护您的个人信息。请在使用本服务前，仔细阅读并充分理解本政策的全部内容。
                </p>
                <h2 className="text-white">我们收集的信息</h2>
                <h3 className="text-white">账户信息</h3>
                <p>
                  当您注册账户时，我们会收集您的邮箱地址，并自动生成用户名。如果您选择使用
                  Google 账号登录（OAuth），我们会从 Google
                  获取您的基本信息（包括邮箱地址、姓名、头像等），这些信息的使用受
                  Google 隐私政策约束。
                </p>
                <h3 className="text-white">支付信息</h3>
                <p>
                  当您购买付费服务时，我们使用 Stripe
                  作为支付处理服务商。我们不会直接收集或存储您的完整支付卡信息。支付信息（包括卡号、有效期、CVV
                  等）由 Stripe 安全处理，我们仅接收支付状态和交易记录。Stripe
                  遵循 PCI-DSS 安全标准，确保您的支付信息安全。
                </p>
                <h3 className="text-white">使用数据</h3>
                <p>
                  当您使用本服务下载视频、图片或其他内容时，我们可能会收集与您的操作相关的日志信息（如访问时间、下载链接、操作系统信息、浏览器类型、IP
                  地址等），用于统计分析、故障排查及服务优化。我们还会记录您的下载历史，以便您查看和管理。
                </p>
                <h3 className="text-white">Cookies 及类似技术</h3>
                <p>
                  我们可能使用 Cookies
                  或类似技术来收集访问量统计、偏好设置等信息，以便为您提供更个性化的用户体验。您可以在浏览器或设备设置中禁用或清除
                  Cookies，但可能会影响部分功能的正常使用。
                </p>
                <h3 className="text-white">第三方登录信息</h3>
                <p>
                  当您使用 Google 账号登录时，我们会通过 OAuth 2.0 协议从 Google
                  获取您的账户信息。我们仅获取必要的身份验证信息，不会访问您的其他
                  Google 数据。Google 的隐私政策适用于其提供的信息，您可以在
                  Google 账户设置中管理这些权限。
                </p>
                <h2 className="text-white">我们如何使用收集的信息</h2>
                <h3 className="text-white">提供及维护服务</h3>
                <p>
                  根据您提供的信息，我们将为您创建并维护账户，为您提供内容下载、去水印、跨平台支持等核心功能。
                </p>
                <h3 className="text-white">个性化与优化</h3>
                <p>
                  我们会根据您在使用过程中的偏好、行为记录，对产品功能和界面进行个性化推荐与优化。
                </p>
                <h3 className="text-white">安全保障</h3>
                <p>
                  我们使用收集的信息来监测、识别并防范安全风险及欺诈行为，保障账户安全和支付安全。
                </p>
                <h3 className="text-white">客户支持</h3>
                <p>
                  当您与我们联系以寻求技术支持或提交投诉/反馈时，我们可能需要使用相关信息来为您提供更快捷、准确的服务。
                </p>
                <h3 className="text-white">法律合规</h3>
                <p>
                  在法律法规要求或征得您同意的情况下，我们可能会使用或共享您的信息以履行相关义务，或处理与法律诉讼、纠纷等相关的事务。
                </p>
                <h2 className="text-white">信息共享与披露</h2>
                <h3 className="text-white">支付处理服务商（Stripe）</h3>
                <p>
                  我们使用 Stripe
                  处理所有支付交易。当您进行支付时，您的支付信息（包括卡号、账单地址等）会直接传输给
                  Stripe，我们不会存储这些敏感信息。Stripe
                  遵循严格的支付卡行业数据安全标准（PCI-DSS），确保您的支付信息安全。您可以在
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Stripe 隐私政策
                  </a>
                  中了解更多信息。
                </p>
                <h3 className="text-white">身份验证服务商（Google）</h3>
                <p>
                  当您使用 Google 账号登录时，我们会与 Google
                  共享必要的身份验证信息。Google
                  会处理您的登录请求，我们仅接收验证结果和基本账户信息。Google
                  的隐私政策适用于其服务，您可以在
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Google 隐私政策
                  </a>
                  中了解更多信息。
                </p>
                <h3 className="text-white">与第三方服务提供商共享</h3>
                <p>
                  我们可能会与为本服务提供技术支持、支付处理或数据分析的第三方服务提供商共享必要的信息，但这些第三方仅可基于本政策的目的使用相关信息。
                </p>
                <h3 className="text-white">法律要求</h3>
                <p>
                  在法律法规或政府主管部门要求的情况下，我们可能会披露您的个人信息，以履行相应的法律义务或保护我们的合法权益。
                </p>
                <h3 className="text-white">业务转让</h3>
                <p>
                  若本服务因合并、收购、重组等产生业务转让，我们会在转让前告知您相关情况，并确保您的个人信息受到与本政策同等或更高的保护。
                </p>
                <h2 className="text-white">我们如何保护您的信息</h2>
                <h3 className="text-white">安全措施</h3>
                <p>
                  我们采用合理的安全措施，包括数据加密、访问控制、匿名化等手段，防止信息丢失、不当使用、未经授权访问或披露。
                </p>
                <h3 className="text-white">信息存储</h3>
                <p>
                  我们会在达到收集目的所需的最短时间内保留您的个人信息，除非法律法规或监管要求另有规定。对于视频文件等临时缓存数据，我们通常会在 24 小时内自动删除。您可以随时联系我们请求删除您的个人数据。
                </p>
                <h2 className="text-white">您的权利</h2>
                <h3 className="text-white">访问、更正与删除</h3>
                <p>
                  您有权访问、更正或删除您的个人信息。如果您无法通过产品功能自行完成这些操作，可以通过联系方式与我们取得联系，我们会在合理期限内回复。
                </p>
                <h3 className="text-white">撤回同意</h3>
                <p>
                  如果您希望撤回对某些信息收集或使用的授权，请联系我们。请注意，撤回同意可能导致某些功能无法继续为您提供。
                </p>
                <h2 className="text-white">支付与退款政策</h2>
                <h3 className="text-white">支付方式</h3>
                <p>
                  我们接受通过 Stripe
                  处理的所有主要信用卡和借记卡支付。所有支付均采用加密传输，确保您的支付信息安全。
                </p>
                <h3 className="text-white">退款政策</h3>
                <p>
                  由于本服务为数字产品的特殊性，一旦开始使用服务，我们通常不提供退款。但如遇技术问题导致服务完全无法使用，请在购买后 7 天内联系客服处理。部分地区的消费者可能享有当地法律规定的额外权利。我们建议先使用免费版测试服务。
                </p>
                <h3 className="text-white">支付安全</h3>
                <p>
                  所有支付信息由 Stripe
                  安全处理，我们不会存储您的完整支付卡信息。Stripe 遵循 PCI-DSS
                  安全标准，采用行业领先的加密技术保护您的支付数据。
                </p>
                <h2 className="text-white">免责声明</h2>
                <h3 className="text-white">服务免责</h3>
                <p>
                  本服务按"现状"提供，不提供任何明示或暗示的保证。我们不对服务的可用性、准确性、完整性或及时性做出任何保证。我们不对因使用或无法使用本服务而造成的任何直接或间接损失承担责任。
                </p>
                <h3 className="text-white">内容免责</h3>
                <p>
                  本服务仅提供技术下载功能，不对下载内容的合法性、版权归属或使用方式负责。用户应确保其下载和使用的内容符合相关法律法规，并尊重内容创作者的知识产权。我们不对用户下载的内容承担任何责任。
                </p>
                <h3 className="text-white">知识产权与使用限制</h3>
                <p>
                  用户通过本服务下载的内容的知识产权归原始内容创作者所有。下载的内容仅供个人学习、研究或合理使用，不得用于商业目的或公开传播。您需确保拥有下载内容的合法权限，并遵守当地法律法规。SnapVee 不对用户的不当使用行为承担责任。
                </p>
                <h3 className="text-white">责任限制</h3>
                <p>
                  在法律允许的最大范围内，我们对因使用或无法使用本服务而产生的任何损害（包括但不限于直接、间接、偶然、特殊或后果性损害）不承担责任。我们的总责任不超过您为使用本服务而支付的金额。
                </p>
                <h2 className="text-white">隐私政策变更</h2>
                <p>
                  <strong>SnapVee</strong>
                  我们可能会不时更新本政策，以适应业务变动或法律法规的要求。更新后的版本将在本页面公布并注明生效日期。如更新涉及对您权益有重大影响的内容，我们会通过弹窗或其他显著方式向您提示。请您在更新后继续使用本服务前仔细阅读并理解更新内容。
                </p>
                <h2 className="text-white">联系我们</h2>
                <p>
                  如果您对本隐私政策有任何疑问、意见或投诉，或希望行使您的隐私权利（如访问、更正或删除您的个人信息），请通过以下方式联系我们：
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
              Privacy Policy
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">Effective Date: 2025.02.19</p>
                <p className="text-gray-400">Updated Date: 2026.01.21</p>
                <h2 className="text-white">Summary</h2>
                <p>
                  Welcome to <strong>SnapVee</strong> (hereinafter referred to
                  as “the Service”). We understand the importance of personal
                  information and are committed to respecting and protecting the
                  privacy of all users (hereinafter “Users”) who use the
                  Service. This Privacy Policy (hereinafter “this Policy”) is
                  designed to help you understand how we collect, use, disclose,
                  process, and safeguard your personal information. Please read
                  and fully understand this Policy before using the Service.
                </p>
                <h2 className="text-white">Information We Collect</h2>
                <h3 className="text-white">Account Information</h3>
                <p>
                  When you register an account, we collect your email address
                  and automatically generate a username. If you choose to sign
                  in with Google (OAuth), we will receive basic information from
                  Google (including email address, name, profile picture, etc.).
                  The use of this information is subject to Google's Privacy
                  Policy.
                </p>
                <h3 className="text-white">Payment Information</h3>
                <p>
                  When you purchase paid services, we use Stripe as our payment
                  processor. We do not directly collect or store your complete
                  payment card information. Payment information (including card
                  number, expiration date, CVV, etc.) is securely processed by
                  Stripe, and we only receive payment status and transaction
                  records. Stripe adheres to PCI-DSS security standards to
                  ensure your payment information security.
                </p>
                <h3 className="text-white">Usage Data</h3>
                <p>
                  When you use the Service to download videos, images, or other
                  content, we may collect log information related to your
                  activities (such as access times, download links, operating
                  system details, browser type, IP address, etc.) for the
                  purposes of statistical analysis, troubleshooting, and service
                  optimization. We also record your download history for your
                  review and management.
                </p>
                <h3 className="text-white">Cookies and Similar Technologies</h3>
                <p>
                  We may use Cookies or similar technologies to collect data on
                  website traffic, preferences, and other information to provide
                  you with a more personalized user experience. You can disable
                  or clear Cookies through your browser or device settings;
                  however, doing so may affect the proper functioning of certain
                  features.
                </p>
                <h3 className="text-white">Third-Party Login Information</h3>
                <p>
                  When you sign in with Google, we receive your account
                  information through the OAuth 2.0 protocol. We only obtain
                  necessary authentication information and do not access your
                  other Google data. Google's Privacy Policy applies to the
                  information it provides, and you can manage these permissions
                  in your Google account settings.
                </p>
                <h2 className="text-white">
                  How We Use the Collected Information
                </h2>
                <h3 className="text-white">
                  Provision and Maintenance of the Service
                </h3>
                <p>
                  Based on the information you provide, we will create and
                  maintain your account, and provide core features such as
                  content downloading, watermark removal, and cross-platform
                  support.
                </p>
                <h3 className="text-white">Personalization and Optimization</h3>
                <p>
                  We use your preferences and behavioral records to offer
                  personalized recommendations and optimize product features and
                  interfaces.
                </p>
                <h3 className="text-white">Security Assurance</h3>
                <p>
                  We use the collected information to monitor, identify, and
                  prevent security risks and fraudulent activities, ensuring the
                  security of your account and payments.
                </p>
                <h3 className="text-white">Customer Support</h3>
                <p>
                  When you contact us for technical support or to submit a
                  complaint/feedback, we may need to use your information to
                  provide you with more efficient and accurate service.
                </p>
                <h3 className="text-white">Legal Compliance</h3>
                <p>
                  We may use or share your information to fulfill legal
                  obligations or handle legal disputes, either as required by
                  law or with your consent.
                </p>
                <h2 className="text-white">
                  Information Sharing and Disclosure
                </h2>
                <h3 className="text-white">Payment Processor (Stripe)</h3>
                <p>
                  We use Stripe to process all payment transactions. When you
                  make a payment, your payment information (including card
                  number, billing address, etc.) is directly transmitted to
                  Stripe, and we do not store this sensitive information. Stripe
                  adheres to strict Payment Card Industry Data Security
                  Standards (PCI-DSS) to ensure your payment information
                  security. You can learn more in{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Stripe's Privacy Policy
                  </a>
                  .
                </p>
                <h3 className="text-white">Authentication Provider (Google)</h3>
                <p>
                  When you sign in with Google, we share necessary
                  authentication information with Google. Google processes your
                  login request, and we only receive verification results and
                  basic account information. Google's Privacy Policy applies to
                  its services. You can learn more in{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Google's Privacy Policy
                  </a>
                  .
                </p>
                <h3 className="text-white">
                  Sharing with Third-Party Service Providers
                </h3>
                <p>
                  We may share necessary information with third-party service
                  providers who assist in technical support, payment processing,
                  or data analysis, but these third parties are restricted to
                  using the information solely for the purposes outlined in this
                  Policy.
                </p>
                <h3 className="text-white">Legal Requirements</h3>
                <p>
                  In cases where required by law or requested by governmental
                  authorities, we may disclose your personal information to
                  fulfill legal obligations or protect our legal rights.
                </p>
                <h3 className="text-white">Business Transfers</h3>
                <p>
                  In the event of a merger, acquisition, or restructuring that
                  results in a transfer of business, we will notify you in
                  advance and ensure that your personal information is protected
                  in accordance with this Policy or with a higher standard.
                </p>
                <h2 className="text-white">How We Protect Your Information</h2>
                <h3 className="text-white">Security Measures</h3>
                <p>
                  We employ reasonable security measures, including data
                  encryption, access controls, and anonymization, to prevent the
                  loss, misuse, or unauthorized access or disclosure of your
                  information.
                </p>
                <h3 className="text-white">Data Storage</h3>
                <p>
                  We retain your personal information for the minimum period
                  necessary to achieve the purposes for which it was collected,
                  unless otherwise required by law or regulation. For temporary cached data such as video files, we typically auto-delete within 24 hours. You can contact us anytime to request deletion of your personal data.
                </p>
                <h2 className="text-white">Your Rights</h2>
                <h3 className="text-white">Access, Correction, and Deletion</h3>
                <p>
                  You have the right to access, correct, or delete your personal
                  information. If you are unable to perform these actions
                  through the Service, please contact us and we will respond
                  within a reasonable timeframe.
                </p>
                <h3 className="text-white">Withdrawal of Consent</h3>
                <p>
                  If you wish to withdraw your consent for the collection or use
                  of certain information, please contact us. Please note that
                  withdrawing consent may result in certain features no longer
                  being available to you.
                </p>
                <h2 className="text-white">Payment and Refund Policy</h2>
                <h3 className="text-white">Payment Methods</h3>
                <p>
                  We accept all major credit and debit cards processed through
                  Stripe. All payments are transmitted with encryption to ensure
                  your payment information security.
                </p>
                <h3 className="text-white">Refund Policy</h3>
                <p>
                  Due to the nature of digital products, we generally do not offer refunds once the service has been used. However, if you experience technical issues that completely prevent service usage, please contact support within 7 days of purchase. Consumers in certain regions may have additional rights under local laws. We recommend trying the free plan first to test the service.
                </p>
                <h3 className="text-white">Payment Security</h3>
                <p>
                  All payment information is securely processed by Stripe, and
                  we do not store your complete payment card information. Stripe
                  adheres to PCI-DSS security standards and uses
                  industry-leading encryption technology to protect your payment
                  data.
                </p>
                <h2 className="text-white">Disclaimer</h2>
                <h3 className="text-white">Service Disclaimer</h3>
                <p>
                  This Service is provided "as is" without any express or
                  implied warranties. We make no warranties regarding the
                  availability, accuracy, completeness, or timeliness of the
                  Service. We are not liable for any direct or indirect losses
                  arising from the use or inability to use this Service.
                </p>
                <h3 className="text-white">Content Disclaimer</h3>
                <p>
                  This Service only provides technical download functionality
                  and is not responsible for the legality, copyright ownership,
                  or usage of downloaded content. Users must ensure that the
                  content they download and use complies with relevant laws and
                  regulations and respects the intellectual property rights of
                  content creators. We are not liable for any content downloaded
                  by users.
                </p>
                <h3 className="text-white">Intellectual Property & Usage Restrictions</h3>
                <p>
                  The intellectual property rights of content downloaded through
                  this Service belong to the original content creators. Downloaded content is for personal use, learning, research, or fair use only and may not be used for commercial purposes or public distribution. You must ensure you have legal rights to download the content and comply with local laws. SnapVee is not responsible for users' misuse of downloaded content.
                </p>
                <h3 className="text-white">Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, we are not liable for
                  any damages (including but not limited to direct, indirect,
                  incidental, special, or consequential damages) arising from
                  the use or inability to use this Service. Our total liability
                  shall not exceed the amount you paid for using this Service.
                </p>
                <h2 className="text-white">Changes to the Privacy Policy</h2>
                <p>
                  <strong>SnapVee</strong> may update this Policy from time to
                  time to accommodate business changes or legal requirements.
                  The updated version will be posted on this page along with the
                  effective date. If the changes significantly affect your
                  rights, we will notify you via pop-up or other prominent
                  methods. Please review the updated Policy carefully before
                  continuing to use the Service.
                </p>
                <h2 className="text-white">Contact Us</h2>
                <p>
                  If you have any questions, comments, or complaints about this
                  Privacy Policy, or wish to exercise your privacy rights (such
                  as accessing, correcting, or deleting your personal
                  information), please contact us at:
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
        {/* --- 한국어 (Korean) 개인정보 보호정책 시작 --- */}
        {currentLocale === "ko" && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              개인정보 보호정책
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">시행일: 2025.06.27</p>
                <p className="text-gray-400">업데이트일: 2025.06.27</p>
                <h2 className="text-white">요약</h2>
                <p>
                  <strong>SnapVee</strong>("본 서비스")를 이용해 주셔서
                  감사합니다. 당사는 개인 정보의 중요성을 깊이 인식하고 있으며,
                  본 서비스를 이용하는 모든 사용자("사용자")의 개인 정보 보호를
                  존중하고 보호할 것을 약속합니다. 본 개인정보 보호정책("본
                  정책")은 당사가 귀하의 개인 정보를 수집, 사용, 공개, 처리 및
                  보호하는 방법을 이해하도록 돕기 위해 마련되었습니다. 본
                  서비스를 사용하기 전에 본 정책의 전체 내용을 주의 깊게 읽고
                  충분히 이해해 주시기 바랍니다.
                </p>
                <h2 className="text-white">당사가 수집하는 정보</h2>
                <h3 className="text-white">사용 데이터</h3>
                <p>
                  귀하가 본 서비스를 사용하여 비디오, 이미지 또는 기타 콘텐츠를
                  다운로드할 때, 당사는 통계 분석, 문제 해결 및 서비스 최적화를
                  위해 귀하의 작업과 관련된 로그 정보(예: 액세스 시간, 다운로드
                  링크, 운영 체제 정보, 브라우저 유형, IP 주소 등)를 수집할 수
                  있습니다.
                </p>
                <h3 className="text-white">쿠키 및 유사 기술</h3>
                <p>
                  당사는 쿠키 또는 유사 기술을 사용하여 방문 통계, 선호도 설정
                  등의 정보를 수집하여 귀하에게 더욱 개인화된 사용자 경험을
                  제공할 수 있습니다. 귀하는 브라우저 또는 장치 설정에서 쿠키를
                  비활성화하거나 삭제할 수 있지만, 이 경우 일부 기능의 정상적인
                  사용에 영향을 미칠 수 있습니다.
                </p>
                <h2 className="text-white">수집된 정보의 사용 방법</h2>
                <h3 className="text-white">서비스 제공 및 유지보수</h3>
                <p>
                  제공하신 정보를 바탕으로, 당사는 귀하의 계정을 생성 및
                  유지하고, 콘텐츠 다운로드, 워터마크 제거, 크로스 플랫폼 지원과
                  같은 핵심 기능을 제공합니다.
                </p>
                <h3 className="text-white">개인화 및 최적화</h3>
                <p>
                  당사는 귀하의 사용 과정에서의 선호도와 행동 기록에 따라 제품
                  기능 및 인터페이스에 대한 개인화된 추천 및 최적화를
                  수행합니다.
                </p>
                <h3 className="text-white">보안 보장</h3>
                <p>
                  당사는 수집된 정보를 사용하여 보안 위험 및 사기 행위를
                  모니터링, 식별 및 방지하고, 계정 및 결제 보안을 보장합니다.
                </p>
                <h3 className="text-white">고객 지원</h3>
                <p>
                  귀하가 기술 지원을 요청하거나 불만/피드백을 제출하기 위해
                  당사에 연락할 때, 당사는 귀하에게 더 빠르고 정확한 서비스를
                  제공하기 위해 관련 정보를 사용해야 할 수 있습니다.
                </p>
                <h3 className="text-white">법적 준수</h3>
                <p>
                  법률 및 규정의 요구 사항이 있거나 귀하의 동의를 얻은 경우,
                  당사는 관련 의무를 이행하거나 법적 소송, 분쟁 등과 관련된
                  사안을 처리하기 위해 귀하의 정보를 사용하거나 공유할 수
                  있습니다.
                </p>
                <h2 className="text-white">정보 공유 및 공개</h2>
                <h3 className="text-white">제3자 서비스 제공업체와의 공유</h3>
                <p>
                  당사는 본 서비스에 기술 지원, 결제 처리 또는 데이터 분석을
                  제공하는 제3자 서비스 제공업체와 필요한 정보를 공유할 수
                  있지만, 이러한 제3자는 본 정책의 목적에만 근거하여 관련 정보를
                  사용할 수 있습니다.
                </p>
                <h3 className="text-white">법적 요구</h3>
                <p>
                  법률 및 규정 또는 정부 기관의 요구 사항이 있는 경우, 당사는
                  해당 법적 의무를 이행하거나 당사의 합법적인 권익을 보호하기
                  위해 귀하의 개인 정보를 공개할 수 있습니다.
                </p>
                <h3 className="text-white">사업 양도</h3>
                <p>
                  본 서비스가 합병, 인수, 구조 조정 등으로 인해 사업 양도가
                  발생하는 경우, 당사는 양도 전에 귀하에게 관련 상황을 알리고
                  귀하의 개인 정보가 본 정책과 동등하거나 더 높은 수준으로
                  보호되도록 보장할 것입니다.
                </p>
                <h2 className="text-white">귀하의 정보 보호 방법</h2>
                <h3 className="text-white">보안 조치</h3>
                <p>
                  당사는 데이터 암호화, 접근 통제, 익명화 등의 합리적인 보안
                  조치를 채택하여 정보 손실, 부적절한 사용, 무단 접근 또는
                  공개를 방지합니다.
                </p>
                <h3 className="text-white">정보 저장</h3>
                <p>
                  당사는 법률, 규정 또는 규제 요구 사항에서 달리 규정하지 않는
                  한, 수집 목적을 달성하는 데 필요한 최소한의 기간 동안 귀하의
                  개인 정보를 보관합니다. 비디오 파일과 같은 임시 캐시 데이터는 일반적으로 24시간 이내에 자동 삭제됩니다. 언제든지 당사에 연락하여 개인 데이터 삭제를 요청하실 수 있습니다.
                </p>
                <h2 className="text-white">귀하의 권리</h2>
                <h3 className="text-white">접근, 정정 및 삭제</h3>
                <p>
                  귀하는 귀하의 개인 정보에 접근, 정정 또는 삭제할 권리가
                  있습니다. 제품 기능을 통해 직접 이러한 작업을 완료할 수 없는
                  경우, 연락처를 통해 당사에 연락하시면 합리적인 기간 내에
                  회신해 드리겠습니다.
                </p>
                <h3 className="text-white">동의 철회</h3>
                <p>
                  특정 정보 수집 또는 사용에 대한 승인을 철회하고자 하는 경우,
                  당사에 연락해 주십시오. 동의를 철회하면 일부 기능을 더 이상
                  제공할 수 없게 될 수 있음을 유의하십시오.
                </p>
                <h2 className="text-white">개인정보 보호정책 변경</h2>
                <p>
                  <strong>SnapVee</strong>는 사업 변동이나 법률 및 규정 요구
                  사항에 적응하기 위해 본 정책을 수시로 업데이트할 수 있습니다.
                  업데이트된 버전은 본 페이지에 게시되며 시행일이 명시됩니다.
                  업데이트가 귀하의 권익에 중대한 영향을 미치는 내용을 포함하는
                  경우, 팝업 또는 기타 눈에 띄는 방식으로 귀하에게 알릴
                  것입니다. 업데이트 후 본 서비스를 계속 사용하기 전에
                  업데이트된 내용을 주의 깊게 읽고 이해해 주시기 바랍니다.
                </p>
              </div>
            </article>
          </div>
        )}
        {/* --- 日本語 (Japanese) プライバシーポリシー 開始 --- */}
        {currentLocale === "ja" && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              プライバシーポリシー
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">発効日: 2025.06.27</p>
                <p className="text-gray-400">更新日: 2025.06.27</p>
                <h2 className="text-white">概要</h2>
                <p>
                  <strong>SnapVee</strong>
                  （以下「本サービス」）をご利用いただきありがとうございます。当社は個人情報の重要性を深く認識しており、本サービスを利用するすべてのユーザー（以下「ユーザー」）のプライバシーを尊重し、保護することを約束します。本プライバシーポリシー（以下「本ポリシー」）は、当社がお客様の個人情報をどのように収集、使用、開示、処理、および保護するかを理解していただくためのものです。本サービスをご利用になる前に、本ポリシーの全文を注意深く読み、十分にご理解ください。
                </p>
                <h2 className="text-white">当社が収集する情報</h2>
                <h3 className="text-white">利用データ</h3>
                <p>
                  お客様が本サービスを使用してビデオ、画像、またはその他のコンテンツをダウンロードする際、当社は、統計分析、障害特定、およびサービス最適化のために、お客様の操作に関連するログ情報（アクセス時間、ダウンロードリンク、オペレーティングシステム情報、ブラウザの種類、IPアドレスなど）を収集する場合があります。
                </p>
                <h3 className="text-white">Cookieおよび類似技術</h3>
                <p>
                  当社は、Cookieまたは類似技術を使用して、アクセス統計、設定などの情報を収集し、よりパーソナライズされたユーザーエクスペリエンスを提供するために使用する場合があります。お客様は、ブラウザまたはデバイスの設定でCookieを無効化または削除できますが、その結果、一部の機能の正常な使用に影響が出る可能性があります。
                </p>
                <h2 className="text-white">収集した情報の使用方法</h2>
                <h3 className="text-white">サービスの提供および維持</h3>
                <p>
                  お客様から提供された情報に基づき、当社はお客様のアカウントを作成・維持し、コンテンツのダウンロード、透かし削除、クロスプラットフォームサポートなどのコア機能を提供します。
                </p>
                <h3 className="text-white">パーソナライズと最適化</h3>
                <p>
                  当社は、お客様の利用過程における好みや行動記録に基づき、製品の機能とインターフェースについてパーソナライズされた推奨と最適化を行います。
                </p>
                <h3 className="text-white">セキュリティの確保</h3>
                <p>
                  当社は、収集した情報を使用して、セキュリティリスクや不正行為を監視、特定、防止し、アカウントセキュリティと支払いセキュリティを確保します。
                </p>
                <h3 className="text-white">カスタマーサポート</h3>
                <p>
                  お客様が技術サポートを求めるため、または苦情/フィードバックを提出するために当社に連絡する場合、当社はより迅速かつ正確なサービスを提供するために、関連情報を使用する必要がある場合があります。
                </p>
                <h3 className="text-white">法令遵守</h3>
                <p>
                  法令または規制の要件がある場合、またはお客様の同意を得た場合、当社は、関連する義務を履行するため、または法的な訴訟、紛争などに関連する事項を処理するために、お客様の情報を使用または共有する場合があります。
                </p>
                <h2 className="text-white">情報の共有と開示</h2>
                <h3 className="text-white">
                  第三者サービスプロバイダーとの共有
                </h3>
                <p>
                  当社は、本サービスに技術サポート、決済処理、またはデータ分析を提供する第三者サービスプロバイダーと必要な情報を共有する場合がありますが、これらの第三者は、本ポリシーの目的に基づいてのみ関連情報を使用することができます。
                </p>
                <h3 className="text-white">法的な要求</h3>
                <p>
                  法令または政府当局の要求がある場合、当社は、該当する法的義務を履行するため、または当社の正当な利益を保護するために、お客様の個人情報を開示する場合があります。
                </p>
                <h3 className="text-white">事業譲渡</h3>
                <p>
                  本サービスが合併、買収、再編などにより事業譲渡が生じる場合、当社は譲渡前にお客様に状況を通知し、お客様の個人情報が本ポリシーと同等またはそれ以上の保護を受けることを保証します。
                </p>
                <h2 className="text-white">お客様の情報の保護方法</h2>
                <h3 className="text-white">セキュリティ対策</h3>
                <p>
                  当社は、データ暗号化、アクセス制御、匿名化などの合理的なセキュリティ対策を採用し、情報の紛失、不適切な使用、不正なアクセスまたは開示を防止します。
                </p>
                <h3 className="text-white">情報保管</h3>
                <p>
                  当社は、法令または規制上の要件で別途規定されていない限り、収集目的を達成するために必要な最短期間、お客様の個人情報を保持します。動画ファイルなどの一時キャッシュデータは、通常24時間以内に自動削除されます。いつでも当社に連絡して個人データの削除をご依頼いただけます。
                </p>
                <h2 className="text-white">お客様の権利</h2>
                <h3 className="text-white">アクセス、訂正および削除</h3>
                <p>
                  お客様には、ご自身の個人情報にアクセスし、訂正または削除する権利があります。製品機能を通じてご自身でこれらの操作を完了できない場合は、連絡先を通じて当社にご連絡ください。合理的な期間内に返信いたします。
                </p>
                <h3 className="text-white">同意の撤回</h3>
                <p>
                  特定の情報収集または使用に対する許可を撤回したい場合は、当社にご連絡ください。同意を撤回すると、一部の機能がお客様に提供できなくなる可能性があることにご注意ください。
                </p>
                <h2 className="text-white">プライバシーポリシーの変更</h2>
                <p>
                  <strong>SnapVee</strong>
                  は、事業の変更や法令および規制の要件に適応するために、本ポリシーを随時更新することがあります。更新されたバージョンは本ページに公開され、発効日が明記されます。更新がお客様の権利に重大な影響を及ぼす内容を含む場合、当社はポップアップまたはその他の目立つ方法でお客様に通知します。更新後も本サービスを引き続きご利用になる前に、更新内容を注意深く読み、ご理解ください。
                </p>
              </div>
            </article>
          </div>
        )}
        {/* --- 힌दी (Hindi) गोपनीयता नीति शुरू --- */}
        {currentLocale === "hi" && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white mb-8">
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <article className="prose prose-invert prose-lg max-w-none text-base prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
              <div className="text-gray-300">
                <p className="text-gray-400">प्रभावी तिथि: 2025.06.27</p>
                <p className="text-gray-400">अद्यतन तिथि: 2025.06.27</p>
                <h2 className="text-white">सारांश</h2>
                <p>
                  <strong>SnapVee</strong> (इसके बाद "यह सेवा") का उपयोग करने के
                  लिए आपका स्वागत है। हम व्यक्तिगत जानकारी के महत्व को गहराई से
                  समझते हैं, और इस सेवा का उपयोग करने वाले सभी उपयोगकर्ताओं
                  (इसके बाद "उपयोगकर्ता") की गोपनीयता का सम्मान और सुरक्षा करने
                  के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति (इसके बाद "यह नीति")
                  आपको यह समझने में मदद करेगी कि हम आपकी व्यक्तिगत जानकारी को
                  कैसे एकत्र, उपयोग, खुलासा, संसाधित और संरक्षित करते हैं। कृपया
                  इस सेवा का उपयोग करने से पहले इस नीति की पूरी सामग्री को ध्यान
                  से पढ़ें और पूरी तरह से समझें।
                </p>
                <h2 className="text-white">हम जो जानकारी एकत्र करते हैं</h2>
                <h3 className="text-white">उपयोग डेटा</h3>
                <p>
                  जब आप वीडियो, चित्र या अन्य सामग्री डाउनलोड करने के लिए इस
                  सेवा का उपयोग करते हैं, तो हम सांख्यिकीय विश्लेषण, समस्या
                  निवारण और सेवा अनुकूलन के लिए आपके ऑपरेशन से संबंधित लॉग
                  जानकारी (जैसे एक्सेस समय, डाउनलोड लिंक, ऑपरेटिंग सिस्टम
                  जानकारी, ब्राउज़र प्रकार, आईपी पता, आदि) एकत्र कर सकते हैं।
                </p>
                <h3 className="text-white">कुकीज़ और इसी तरह की तकनीकें</h3>
                <p>
                  हम आपको अधिक व्यक्तिगत उपयोगकर्ता अनुभव प्रदान करने के लिए
                  विज़िट आँकड़े, वरीयता सेटिंग्स आदि जानकारी एकत्र करने के लिए
                  कुकीज़ या इसी तरह की तकनीकों का उपयोग कर सकते हैं। आप ब्राउज़र
                  या डिवाइस सेटिंग्स में कुकीज़ को अक्षम या साफ़ कर सकते हैं,
                  लेकिन यह कुछ कार्यों के सामान्य उपयोग को प्रभावित कर सकता है।
                </p>
                <h2 className="text-white">
                  हम एकत्रित जानकारी का उपयोग कैसे करते हैं
                </h2>
                <h3 className="text-white">सेवा प्रदान करना और बनाए रखना</h3>
                <p>
                  आपके द्वारा प्रदान की गई जानकारी के आधार पर, हम आपके लिए खाता
                  बनाएंगे और बनाए रखेंगे, और आपको सामग्री डाउनलोड, वॉटरमार्क
                  हटाना, क्रॉस-प्लेटफ़ॉर्म समर्थन जैसे मुख्य कार्य प्रदान
                  करेंगे।
                </p>
                <h3 className="text-white">वैयक्तिकरण और अनुकूलन</h3>
                <p>
                  हम आपके उपयोग की प्रक्रिया में आपकी प्राथमिकताओं और व्यवहार
                  रिकॉर्ड के अनुसार उत्पाद कार्यों और इंटरफ़ेस के लिए वैयक्तिकृत
                  अनुशंसा और अनुकूलन करेंगे।
                </p>
                <h3 className="text-white">सुरक्षा आश्वासन</h3>
                <p>
                  हम सुरक्षा जोखिमों और धोखाधड़ी वाले व्यवहारों की निगरानी,
                  पहचान और रोकथाम के लिए एकत्रित जानकारी का उपयोग करते हैं, और
                  खाता सुरक्षा और भुगतान सुरक्षा सुनिश्चित करते हैं।
                </p>
                <h3 className="text-white">ग्राहक सहायता</h3>
                <p>
                  जब आप तकनीकी सहायता के लिए हमसे संपर्क करते हैं या
                  शिकायत/प्रतिक्रिया प्रस्तुत करते हैं, तो हमें आपको त्वरित और
                  सटीक सेवा प्रदान करने के लिए संबंधित जानकारी का उपयोग करने की
                  आवश्यकता हो सकती है।
                </p>
                <h3 className="text-white">कानूनी अनुपालन</h3>
                <p>
                  कानूनों और विनियमों की आवश्यकताओं के तहत या आपकी सहमति से, हम
                  संबंधित दायित्वों को पूरा करने, या कानूनी मुकदमे, विवादों आदि
                  से संबंधित मामलों को संसाधित करने के लिए आपकी जानकारी का उपयोग
                  या साझा कर सकते हैं।
                </p>
                <h2 className="text-white">सूचना साझाकरण और प्रकटीकरण</h2>
                <h3 className="text-white">
                  तृतीय-पक्ष सेवा प्रदाताओं के साथ साझा करना
                </h3>
                <p>
                  हम आवश्यक जानकारी को तृतीय-पक्ष सेवा प्रदाताओं के साथ साझा कर
                  सकते हैं जो इस सेवा के लिए तकनीकी सहायता, भुगतान प्रसंस्करण या
                  डेटा विश्लेषण प्रदान करते हैं, लेकिन ये तृतीय-पक्ष केवल इस
                  नीति के उद्देश्यों के आधार पर संबंधित जानकारी का उपयोग कर सकते
                  हैं।
                </p>
                <h3 className="text-white">कानूनी आवश्यकताएं</h3>
                <p>
                  कानूनों, विनियमों या सरकारी अधिकारियों की आवश्यकताओं के तहत,
                  हम संबंधित कानूनी दायित्वों को पूरा करने या हमारे वैध अधिकारों
                  और हितों की रक्षा के लिए आपकी व्यक्तिगत जानकारी का खुलासा कर
                  सकते हैं।
                </p>
                <h3 className="text-white">व्यावसायिक हस्तांतरण</h3>
                <p>
                  यदि विलय, अधिग्रहण, पुनर्गठन आदि के कारण इस सेवा का व्यावसायिक
                  हस्तांतरण होता है, तो हम हस्तांतरण से पहले आपको संबंधित स्थिति
                  के बारे में सूचित करेंगे, और यह सुनिश्चित करेंगे कि आपकी
                  व्यक्तिगत जानकारी को इस नीति के समान या उससे अधिक सुरक्षा
                  प्राप्त हो।
                </p>
                <h2 className="text-white">
                  हम आपकी जानकारी की सुरक्षा कैसे करते हैं
                </h2>
                <h3 className="text-white">सुरक्षा उपाय</h3>
                <p>
                  हम जानकारी के नुकसान, अनुचित उपयोग, अनधिकृत पहुंच या प्रकटीकरण
                  को रोकने के लिए डेटा एन्क्रिप्शन, एक्सेस नियंत्रण, गुमनामीकरण
                  (anonymization) जैसे उचित सुरक्षा उपायों को अपनाते हैं।
                </p>
                <h3 className="text-white">सूचना भंडारण</h3>
                <p>
                  हम आपकी व्यक्तिगत जानकारी को तब तक रखेंगे जब तक कि संग्रह के
                  उद्देश्य को प्राप्त करने के लिए आवश्यक न्यूनतम समय हो, जब तक
                  कि कानूनों, विनियमों या नियामक आवश्यकताओं द्वारा अन्यथा
                  निर्धारित न किया गया हो। वीडियो फाइलों जैसे अस्थायी कैश डेटा को आमतौर पर 24 घंटे के भीतर स्वचालित रूप से हटा दिया जाता है। आप अपने व्यक्तिगत डेटा को हटाने का अनुरोध करने के लिए किसी भी समय हमसे संपर्क कर सकते हैं।
                </p>
                <h2 className="text-white">आपके अधिकार</h2>
                <h3 className="text-white">पहुँच, सुधार और विलोपन</h3>
                <p>
                  आपको अपनी व्यक्तिगत जानकारी तक पहुँचने, सुधारने या हटाने का
                  अधिकार है। यदि आप उत्पाद कार्यों के माध्यम से स्वयं इन कार्यों
                  को पूरा नहीं कर सकते हैं, तो आप संपर्क जानकारी के माध्यम से
                  हमसे संपर्क कर सकते हैं, और हम उचित समय सीमा के भीतर जवाब
                  देंगे।
                </p>
                <h3 className="text-white">सहमति वापस लेना</h3>
                <p>
                  यदि आप कुछ जानकारी के संग्रह या उपयोग के लिए प्राधिकरण वापस
                  लेना चाहते हैं, तो कृपया हमसे संपर्क करें। कृपया ध्यान दें कि
                  सहमति वापस लेने से कुछ कार्य आपको प्रदान नहीं किए जा सकते हैं।
                </p>
                <h2 className="text-white">गोपनीयता नीति में परिवर्तन</h2>
                <p>
                  <strong>SnapVee</strong> व्यावसायिक परिवर्तनों या कानूनों और
                  विनियमों की आवश्यकताओं को अनुकूलित करने के लिए समय-समय पर इस
                  नीति को अद्यतन कर सकता है। अद्यतन संस्करण इस पृष्ठ पर प्रकाशित
                  किया जाएगा और प्रभावी तिथि इंगित की जाएगी। यदि अद्यतन में ऐसे
                  विषय शामिल हैं जो आपके अधिकारों पर महत्वपूर्ण प्रभाव डालते
                  हैं, तो हम आपको पॉप-अप या अन्य विशिष्ट तरीकों से संकेत देंगे।
                  कृपया अद्यतन के बाद इस सेवा का उपयोग जारी रखने से पहले अद्यतन
                  सामग्री को ध्यान से पढ़ें और समझें।
                </p>
              </div>
            </article>
          </div>
        )}
      </section>
  );
}

// export const privacyRoute = createLazyRoute("/privacy")({
//   component: Privacy,
// });
