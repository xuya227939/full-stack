import {
  FacebookIcon,
  Instagram,
  TikTok,
  Twitter,
  Youtube,
  Threads,
} from "@/components/icon";
import Link from "next/link";
import { Image } from "@unpic/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
interface BlogItemData {
  id: string;
  imageUrl: string | React.ReactNode;
  title: {
    zh: string;
    en: string;
    ja: string;
    ko: string;
    hi: string;
  };
  description: {
    zh: string;
    en: string;
    ja: string;
    ko: string;
    hi: string;
  };
  date: string;
  dateTime: string;
  readTime?: string;
  category?: string;
}

export const blogItems: BlogItemData[] = [
  // NEW SEO-optimized blog posts (featured at top)
  {
    id: "snapvee-vs-4k-video-downloader",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "SnapVee vs 4K Video Downloader：2026 年更好的 YouTube 下载选择",
      en: "SnapVee vs 4K Video Downloader – Best Alternative for YouTube Downloads (2026)",
      ja: "SnapVee vs 4K Video Downloader – 2026年YouTubeダウンロードに最適な代替",
      ko: "SnapVee vs 4K Video Downloader – 2026년 YouTube 다운로드 최적 대안",
      hi: "SnapVee vs 4K Video Downloader – YouTube डाउनलोड के लिए बेस्ट अल्टरनेटिव (2026)",
    },
    description: {
      zh: "对比 SnapVee 与 4K Video Downloader。了解差异、4K 支持与平台兼容，2026 年谁更适合 YouTube 与社交媒体下载。",
      en: "Compare SnapVee vs 4K Video Downloader. Discover key differences, 4K support, and which works better for YouTube and social media in 2026.",
      ja: "SnapVeeと4K Video Downloaderを比較。主な違い、4K対応、2026年にYouTube・ソーシャルでどちらが使いやすいか。",
      ko: "SnapVee와 4K Video Downloader 비교. 차이점, 4K 지원, 2026년 YouTube·소셜에 더 적합한 도구를 알아보세요.",
      hi: "SnapVee और 4K Video Downloader की तुलना करें। मुख्य अंतर, 4K सपोर्ट, 2026 में YouTube व सोशल के लिए कौन बेहतर।",
    },
    date: "2026年2月16日",
    dateTime: "2026-02-16T00:00:00.000Z",
    readTime: "8 min read",
    category: "YouTube",
  },
  {
    id: "idm-not-downloading-youtube",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "SnapVee vs IDM：2026 年更好的 YouTube 下载选择",
      en: "SnapVee vs IDM – Best IDM Alternative for YouTube Downloads (2026)",
      ja: "SnapVee vs IDM – 2026年YouTubeダウンロードに最適なIDM代替",
      ko: "SnapVee vs IDM – 2026년 YouTube 다운로드를 위한 최고의 IDM 대안",
      hi: "SnapVee vs IDM – YouTube डाउनलोड के लिए बेस्ट IDM अल्टरनेटिव (2026)",
    },
    description: {
      zh: "对比 SnapVee 与 IDM。了解为何 IDM 难以下载 YouTube，以及 4K 与社交媒体视频的最佳替代方案。",
      en: "Compare SnapVee vs IDM. Discover why IDM struggles with YouTube downloads and find the best alternative for 4K and social media videos.",
      ja: "SnapVeeとIDMを比較。IDMがYouTubeで苦戦する理由と、4K・ソーシャル動画の最適な代替を見つけましょう。",
      ko: "SnapVee와 IDM 비교. IDM이 YouTube 다운로드에 어려움을 겪는 이유와 4K·소셜 동영상용 최적의 대안을 알아보세요.",
      hi: "SnapVee और IDM की तुलना करें। IDM YouTube डाउनलोड में क्यों फेल होता है और 4K व सोशल वीडियो के लिए बेस्ट अल्टरनेटिव पाएं।",
    },
    date: "2026年2月16日",
    dateTime: "2026-02-16T00:00:00.000Z",
    readTime: "8 min read",
    category: "YouTube",
  },
  {
    id: "snapvee-vs-ytdown",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "SnapVee vs YTDown：2026 年哪个在线 YouTube 下载器更好？",
      en: "SnapVee vs YTDown – Which Online YouTube Downloader Is Better in 2026?",
      ja: "SnapVee vs YTDown – 2026年どちらのオンラインYouTubeダウンローダーが良い？",
      ko: "SnapVee vs YTDown – 2026년 어떤 온라인 YouTube 다운로더가 더 나을까?",
      hi: "SnapVee vs YTDown – 2026 में कौन सा ऑनलाइन YouTube डाउनलोडर बेहतर?",
    },
    description: {
      zh: "对比 SnapVee 与 YTDown。了解 4K 支持、稳定性、音频提取差异，2026 年谁更适合在线下载 YouTube。",
      en: "Compare SnapVee vs YTDown. Discover key differences in 4K support, reliability, and which online YouTube downloader works best in 2026.",
      ja: "SnapVeeとYTDownを比較。4K対応、安定性の違いと、2026年に最適なオンラインYouTubeダウンローダーを解説。",
      ko: "SnapVee와 YTDown 비교. 4K 지원, 안정성 차이와 2026년 가장 적합한 온라인 YouTube 다운로더를 알아보세요.",
      hi: "SnapVee और YTDown की तुलना करें। 4K सपोर्ट, रिलायबिलिटी में अंतर और 2026 में कौन सा ऑनलाइन YouTube डाउनलोडर सबसे अच्छा।",
    },
    date: "2026年2月16日",
    dateTime: "2026-02-16T00:00:00.000Z",
    readTime: "7 min read",
    category: "YouTube",
  },
  {
    id: "snapvee-vs-clipgrab",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "SnapVee vs ClipGrab：2026 年哪款 YouTube 下载器更好？",
      en: "SnapVee vs ClipGrab – Which YouTube Downloader Is Better in 2026?",
      ja: "SnapVee vs ClipGrab – 2026年どちらのYouTubeダウンローダーが良い？",
      ko: "SnapVee vs ClipGrab – 2026년 어떤 YouTube 다운로더가 더 나을까?",
      hi: "SnapVee vs ClipGrab – 2026 में कौन सा YouTube डाउनलोडर बेहतर?",
    },
    description: {
      zh: "对比 SnapVee 与 ClipGrab。了解 4K 支持、平台兼容性、稳定性差异，2026 年谁更适合下载 YouTube。",
      en: "Compare SnapVee vs ClipGrab. Discover key differences in 4K support, platform compatibility, reliability, and which works better in 2026.",
      ja: "SnapVeeとClipGrabを比較。4K対応、プラットフォーム互換性、安定性の違いと、2026年に最適なYouTubeダウンローダーを解説。",
      ko: "SnapVee와 ClipGrab 비교. 4K 지원, 플랫폼 호환성, 안정성 차이와 2026년 더 적합한 YouTube 다운로더를 알아보세요.",
      hi: "SnapVee और ClipGrab की तुलना करें। 4K सपोर्ट, प्लेटफॉर्म कॉम्पैटिबिलिटी, रिलायबिलिटी में अंतर और 2026 में कौन बेहतर।",
    },
    date: "2026年2月16日",
    dateTime: "2026-02-16T00:00:00.000Z",
    readTime: "7 min read",
    category: "YouTube",
  },
  {
    id: "snapvee-vs-jdownloader",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "SnapVee vs JDownloader：2026 年哪款视频下载器更好？",
      en: "SnapVee vs JDownloader – Which Video Downloader Is Better in 2026?",
      ja: "SnapVee vs JDownloader – 2026年どちらの動画ダウンローダーが良い？",
      ko: "SnapVee vs JDownloader – 2026년 어떤 동영상 다운로더가 더 나을까?",
      hi: "SnapVee vs JDownloader – 2026 में कौन सा वीडियो डाउनलोडर बेहतर?",
    },
    description: {
      zh: "对比 SnapVee 与 JDownloader。了解 4K 支持、易用性、安装差异，2026 年谁更适合 YouTube 与社交媒体下载。",
      en: "Compare SnapVee vs JDownloader. Discover differences in 4K support, usability, installation, and which works better for YouTube and social media in 2026.",
      ja: "SnapVeeとJDownloaderを比較。4K対応、使いやすさ、インストールの違いと、2026年にYouTube・ソーシャルでどちらが使いやすいか。",
      ko: "SnapVee와 JDownloader 비교. 4K 지원, 사용 편의성, 설치 차이와 2026년 YouTube·소셜에 더 적합한 도구를 알아보세요.",
      hi: "SnapVee और JDownloader की तुलना करें। 4K सपोर्ट, यूजबिलिटी, इंस्टॉल में अंतर और 2026 में YouTube व सोशल के लिए कौन बेहतर।",
    },
    date: "2026年2月16日",
    dateTime: "2026-02-16T00:00:00.000Z",
    readTime: "8 min read",
    category: "YouTube",
  },
  {
    id: "snapany-not-working-youtube-403",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "SnapAny 无法使用？解决 YouTube 403 错误与下载问题（2026）",
      en: "SnapAny Not Working? Fix YouTube 403 Errors and Download Issues (2026)",
      ja: "SnapAnyが動かない？YouTube 403エラーとダウンロード問題の対処法（2026）",
      ko: "SnapAny 안 됨? YouTube 403 오류 및 다운로드 문제 해결 (2026)",
      hi: "SnapAny काम नहीं कर रहा? YouTube 403 एरर और डाउनलोड ठीक करें (2026)",
    },
    description: {
      zh: "SnapAny 用不了？了解 YouTube 403 原因、常见下载失败与解决办法，发现 2026 年更稳定的替代。",
      en: "Is SnapAny not working? Learn why YouTube 403 errors happen, common download failures, and how to fix them. Discover a more stable alternative in 2026.",
      ja: "SnapAnyが使えない？YouTube 403の原因、よくある失敗と対処法。2026年により安定した代替を見つけましょう。",
      ko: "SnapAny가 안 되나요? YouTube 403 원인, 자주 나는 다운로드 실패와 해결법. 2026년 더 안정적인 대안을 알아보세요.",
      hi: "SnapAny काम नहीं कर रहा? YouTube 403 क्यों आते हैं, कॉमन फेल और ठीक करने का तरीका। 2026 में ज्यादा स्टेबल अल्टरनेटिव पाएं।",
    },
    date: "2026年2月16日",
    dateTime: "2026-02-16T00:00:00.000Z",
    readTime: "7 min read",
    category: "YouTube",
  },
  {
    id: "how-to-download-youtube-videos-4k-free",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "如何免费下载YouTube视频 - 4K高清画质教程",
      en: "How to Download YouTube Videos Free in 4K HD Quality",
      ja: "YouTube動画を4K HDで無料ダウンロードする方法",
      ko: "YouTube 비디오를 4K HD로 무료 다운로드하는 방법",
      hi: "YouTube वीडियो 4K HD में मुफ्त कैसे डाउनलोड करें",
    },
    description: {
      zh: "学习如何免费下载YouTube视频，支持4K、1080p高清画质。详细步骤指南教你将YouTube视频保存到手机相册或电脑。",
      en: "Learn how to download YouTube videos for free in 4K, 1080p HD quality. Step-by-step guide to save YouTube videos to your phone gallery or computer.",
      ja: "4K、1080p HD品質でYouTube動画を無料でダウンロードする方法を学びましょう。スマホやパソコンに保存するステップバイステップガイド。",
      ko: "4K, 1080p HD 화질로 YouTube 비디오를 무료로 다운로드하는 방법을 배우세요. 휴대폰이나 컴퓨터에 저장하는 단계별 가이드.",
      hi: "4K, 1080p HD गुणवत्ता में YouTube वीडियो मुफ्त डाउनलोड करना सीखें। फोन या कंप्यूटर में सहेजने की स्टेप-बाई-स्टेप गाइड।",
    },
    date: "2025年6月25日",
    dateTime: "2025-06-25T00:00:00.000Z",
    readTime: "8 min read",
    category: "YouTube",
  },
  {
    id: "tiktok-video-download-no-watermark-guide",
    imageUrl: <TikTok className="h-12 w-12" />,
    title: {
      zh: "TikTok视频下载器 - 无水印高清下载教程",
      en: "TikTok Video Downloader - Download TikTok Without Watermark HD",
      ja: "TikTok動画ダウンローダー - 透かしなしHDでダウンロード",
      ko: "TikTok 비디오 다운로더 - 워터마크 없이 HD 다운로드",
      hi: "TikTok वीडियो डाउनलोडर - वॉटरमार्क रहित HD डाउनलोड",
    },
    description: {
      zh: "学习如何无水印下载TikTok视频，支持高清画质。免费TikTok视频保存器，适用于iPhone、Android和电脑。",
      en: "Learn how to download TikTok videos without watermark in HD quality. Free TikTok video saver that works on iPhone, Android and PC.",
      ja: "HD品質で透かしなしでTikTok動画をダウンロードする方法を学びましょう。iPhone、Android、PCで動作する無料TikTokセーバー。",
      ko: "HD 화질로 워터마크 없이 TikTok 비디오를 다운로드하는 방법을 배우세요. iPhone, Android, PC에서 작동하는 무료 TikTok 저장.",
      hi: "HD गुणवत्ता में वॉटरमार्क के बिना TikTok वीडियो डाउनलोड करना सीखें। iPhone, Android और PC पर काम करने वाला मुफ्त TikTok सेवर।",
    },
    date: "2025年6月25日",
    dateTime: "2025-06-25T00:00:00.000Z",
    readTime: "7 min read",
    category: "TikTok",
  },
  {
    id: "instagram-reels-downloader-4k-hd-tutorial",
    imageUrl: <Instagram className="h-12 w-12" />,
    title: {
      zh: "Instagram Reels下载器4K - 无水印下载IG视频教程",
      en: "Instagram Reels Downloader 4K - Download IG Videos Without Watermark",
      ja: "Instagram Reelsダウンローダー4K - 透かしなしでIG動画をダウンロード",
      ko: "Instagram Reels 다운로더 4K - 워터마크 없이 IG 비디오 다운로드",
      hi: "Instagram Reels डाउनलोडर 4K - वॉटरमार्क रहित IG वीडियो डाउनलोड",
    },
    description: {
      zh: "以4K高清画质无水印下载Instagram Reels、Stories和IGTV视频。免费在线Instagram视频下载器。",
      en: "Download Instagram Reels, Stories and IGTV videos in 4K HD quality without watermark. Free online Instagram video downloader.",
      ja: "4K HD品質で透かしなしでInstagramリール、ストーリー、IGTV動画をダウンロード。無料オンラインInstagram動画ダウンローダー。",
      ko: "4K HD 화질로 워터마크 없이 Instagram 릴스, 스토리, IGTV 비디오 다운로드. 무료 온라인 Instagram 비디오 다운로더.",
      hi: "4K HD गुणवत्ता में वॉटरमार्क रहित Instagram Reels, Stories और IGTV वीडियो डाउनलोड करें। मुफ्त ऑनलाइन Instagram वीडियो डाउनलोडर।",
    },
    date: "2025年6月25日",
    dateTime: "2025-06-25T00:00:00.000Z",
    readTime: "8 min read",
    category: "Instagram",
  },
  {
    id: "twitter-video-downloader-hd-guide",
    imageUrl: <Twitter className="h-12 w-12" />,
    title: {
      zh: "Twitter视频下载器HD - 免费下载X视频教程",
      en: "Twitter Video Downloader HD - Download X Videos Free Online",
      ja: "Twitter動画ダウンローダーHD - X動画を無料でダウンロード",
      ko: "Twitter 비디오 다운로더 HD - X 비디오 무료 온라인 다운로드",
      hi: "Twitter वीडियो डाउनलोडर HD - X वीडियो मुफ्त ऑनलाइन डाउनलोड",
    },
    description: {
      zh: "以高清画质免费下载Twitter/X视频。学习如何保存Twitter视频、GIF到手机或电脑。",
      en: "Download Twitter/X videos in HD quality for free. Learn how to save Twitter videos, GIFs to your phone or computer.",
      ja: "HD品質でTwitter/X動画を無料でダウンロード。Twitter動画やGIFをスマホやパソコンに保存する方法を学びましょう。",
      ko: "HD 화질로 Twitter/X 비디오를 무료로 다운로드. Twitter 비디오와 GIF를 휴대폰이나 컴퓨터에 저장하는 방법을 배우세요.",
      hi: "HD गुणवत्ता में Twitter/X वीडियो मुफ्त डाउनलोड करें। Twitter वीडियो और GIF को फोन या कंप्यूटर में सहेजना सीखें।",
    },
    date: "2025年6月25日",
    dateTime: "2025-06-25T00:00:00.000Z",
    readTime: "5 min read",
    category: "Twitter",
  },
  {
    id: "facebook-video-downloader-story-download",
    imageUrl: <FacebookIcon className="h-12 w-12" />,
    title: {
      zh: "Facebook视频下载器 - 下载FB故事和视频HD",
      en: "Facebook Video Downloader - Download FB Stories & Videos HD",
      ja: "Facebook動画ダウンローダー - FBストーリーと動画をHDでダウンロード",
      ko: "Facebook 비디오 다운로더 - FB 스토리와 비디오 HD 다운로드",
      hi: "Facebook वीडियो डाउनलोडर - FB स्टोरी और वीडियो HD डाउनलोड",
    },
    description: {
      zh: "以高清画质下载Facebook视频和故事。免费在线Facebook视频下载器，支持所有设备。",
      en: "Download Facebook videos and Stories in HD quality. Free online Facebook video downloader that works on all devices.",
      ja: "HD品質でFacebook動画とストーリーをダウンロード。すべてのデバイスで動作する無料オンラインFacebook動画ダウンローダー。",
      ko: "HD 화질로 Facebook 비디오와 스토리 다운로드. 모든 기기에서 작동하는 무료 온라인 Facebook 비디오 다운로더.",
      hi: "HD गुणवत्ता में Facebook वीडियो और स्टोरी डाउनलोड करें। सभी डिवाइस पर काम करने वाला मुफ्त ऑनलाइन Facebook वीडियो डाउनलोडर।",
    },
    date: "2025年6月25日",
    dateTime: "2025-06-25T00:00:00.000Z",
    readTime: "5 min read",
    category: "Facebook",
  },
  {
    id: "threads-video-downloader-save-posts-guide",
    imageUrl: <Threads className="h-12 w-12" />,
    title: {
      zh: "Threads视频下载器 - 如何保存Threads帖子和视频",
      en: "Threads Video Downloader - How to Save Threads Posts & Videos",
      ja: "Threads動画ダウンローダー - Threads投稿と動画を保存する方法",
      ko: "Threads 비디오 다운로더 - Threads 게시물과 비디오 저장 방법",
      hi: "Threads वीडियो डाउनलोडर - Threads पोस्ट और वीडियो कैसे सहेजें",
    },
    description: {
      zh: "学习如何无水印下载Threads视频和帖子。免费Threads视频保存器，适用于iPhone、Android和电脑。",
      en: "Learn how to download Threads videos and posts without watermark. Free Threads video saver that works on iPhone, Android and desktop.",
      ja: "透かしなしでThreads動画と投稿をダウンロードする方法を学びましょう。iPhone、Android、デスクトップで動作する無料Threadsセーバー。",
      ko: "워터마크 없이 Threads 비디오와 게시물을 다운로드하는 방법을 배우세요. iPhone, Android, 데스크톱에서 작동하는 무료 Threads 저장.",
      hi: "वॉटरमार्क के बिना Threads वीडियो और पोस्ट डाउनलोड करना सीखें। iPhone, Android और डेस्कटॉप पर काम करने वाला मुफ्त Threads सेवर।",
    },
    date: "2025年6月25日",
    dateTime: "2025-06-25T00:00:00.000Z",
    readTime: "8 min read",
    category: "Threads",
  },
  {
    id: "youtube-tutorial",
    imageUrl: <Youtube className="h-12 w-12" />,
    title: {
      zh: "如何下载YouTube视频或者图片？",
      en: "How to download YouTube videos or pictures?",
      ja: "YouTubeのビデオまたは画像をダウンロードする方法",
      ko: "YouTube 비디오 또는 이미지를 다운로드하는 방법",
      hi: "YouTube वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "详细教程教你如何快速下载YouTube平台的视频和图片内容，支持高清无水印下载",
      en: "Detailed tutorial on how to quickly download videos and images from YouTube platform with HD watermark-free support",
      ja: "YouTubeプラットフォームからHDウォーターマークなしのビデオと画像を迅速にダウンロードするための詳細なチュートリアル",
      ko: "YouTube 플랫폼에서 HD 워터마ーク 없이 빠르게 비디오와 이미지를 다운로드하는 방법에 대한 자세한 자습서",
      hi: "YouTube प्लेटफॉर्म से हाई-डिफ़िज़ वाईटवर्क फ्री सपोर्ट के साथ वीडियो और छवियों को जल्दी डाउनलोड करने के लिए विस्तृत ट्यूटोरियल",
    },
    date: "2025年6月27日",
    dateTime: "2025-06-27T00:00:00.000Z",
    readTime: "5 min read",
    category: "YouTube",
  },
  {
    id: "twitter-tutorial",
    imageUrl: <Twitter className="h-12 w-12" />,
    title: {
      zh: "如何下载X(Twitter)视频或者图片？",
      en: "How to download X(Twitter) videos or pictures?",
      ja: "X(Twitter)のビデオまたは画像をダウンロードする方法",
      ko: "X(Twitter) 비디오 또는 이미지를 다운로드하는 방법",
      hi: "X(Twitter) वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "详细教程教你如何快速下载X平台的视频和图片内容，轻松保存精彩瞬间",
      en: "Detailed tutorial on how to quickly download videos and images from X platform, easily save amazing moments",
      ja: "XプラットフォームからHDウォーターマークなしのビデオと画像を迅速にダウンロードするための詳細なチュートリアル",
      ko: "X 플랫폼에서 HD 워터마ーク 없이 빠르게 비디오와 이미지를 다운로드하는 방법에 대한 자세한 자습서",
      hi: "X प्लेटफॉर्म से हाई-डिफ़िज़ वाईटवर्क फ्री सपोर्ट के साथ वीडियो और छवियों को जल्दी डाउनलोड करने के लिए विस्तृत ट्यूटोरियल",
    },
    date: "2025年6月27日",
    dateTime: "2025-06-27T00:00:00.000Z",
    readTime: "4 min read",
    category: "Twitter",
  },
  {
    id: "tiktok-tutorial",
    imageUrl: <TikTok className="h-12 w-12" />,
    title: {
      zh: "如何下载TikTok视频或者图片？",
      en: "How to download TikTok videos or pictures?",
      ja: "TikTokのビデオまたは画像をダウンロードする方法",
      ko: "TikTok 비디오 또는 이미지를 다운로드하는 방법",
      hi: "TikTok वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "轻松获取TikTok热门视频和图片，支持无水印下载，保存你的创意灵感",
      en: "Easily get TikTok trending videos and images with watermark-free download support, save your creative inspiration",
      ja: "TikTokプラットフォームからHDウォーターマークなしのビデオと画像を迅速にダウンロードするための詳細なチュートリアル",
      ko: "TikTok 플랫폼에서 HD 워터마ーク 없이 빠르게 비디오와 이미지를 다운로드하는 방법에 대한 자세한 자습서",
      hi: "TikTok प्लेटफॉर्म से हाई-डिफ़िज़ वाईटवर्क फ्री सपोर्ट के साथ वीडियो और छवियों को जल्दी डाउनलोड करने के लिए विस्तृत ट्यूटोरियल",
    },
    date: "2025年6月27日",
    dateTime: "2025-06-27T00:00:00.000Z",
    readTime: "6 min read",
    category: "TikTok",
  },
  {
    id: "instagram-tutorial",
    imageUrl: <Instagram className="h-12 w-12" />,
    title: {
      zh: "如何下载Instagram视频或者图片？",
      en: "How to download Instagram videos or pictures?",
      ja: "Instagramのビデオまたは画像をダウンロードする方法",
      ko: "Instagram 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Instagram वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "下载Instagram帖子、故事和Reels视频内容，保存精彩视觉体验",
      en: "Download Instagram posts, stories and Reels video content, save amazing visual experiences",
      ja: "Instagramのビデオまたは画像をダウンロードする方法",
      ko: "Instagram 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Instagram वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    date: "2025年6月27日",
    dateTime: "2025-06-27T00:00:00.000Z",
    readTime: "7 min read",
    category: "Instagram",
  },
  {
    id: "facebook-tutorial",
    imageUrl: <FacebookIcon className="h-12 w-12" />,
    title: {
      zh: "如何下载Facebook视频或者图片？",
      en: "How to download Facebook videos or pictures?",
      ja: "Facebookのビデオまたは画像をダウンロードする方法",
      ko: "Facebook 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Facebook वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "获取Facebook公开视频和图片，支持高清下载，保存珍贵回忆",
      en: "Get Facebook public videos and images with HD download support, save precious memories",
      ja: "Facebookのビデオまたは画像をダウンロードする方法",
      ko: "Facebook 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Facebook वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    date: "2025年6月27日",
    dateTime: "2025-06-27T00:00:00.000Z",
    readTime: "4 min read",
    category: "Facebook",
  },
  {
    id: "douyin-tutorial",
    imageUrl: <TikTok className="h-12 w-12" />,
    title: {
      zh: "如何下载抖音视频或者图片？",
      en: "How to download Douyin videos or pictures?",
      ja: "Douyinのビデオまたは画像をダウンロードする方法",
      ko: "Douyin 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Douyin वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "下载抖音短视频和图集，去除水印保持原画质，收藏精彩内容",
      en: "Download Douyin short videos and image sets, remove watermarks while maintaining original quality, collect amazing content",
      ja: "Douyinのビデオまたは画像をダウンロードする方法",
      ko: "Douyin 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Douyin वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    date: "2025年6月27日",
    dateTime: "2025-06-27T00:00:00.000Z",
    readTime: "6 min read",
    category: "Douyin",
  },
  {
    id: "threads-tutorial",
    imageUrl: <Threads className="h-12 w-12" />,
    title: {
      zh: "如何下载Threads视频或者图片？",
      en: "How to download Threads videos or pictures?",
      ja: "Threadsのビデオまたは画像をダウンロードする方法",
      ko: "Threads 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Threads वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    description: {
      zh: "轻松获取Threads热门视频和图片，支持无水印下载，保存你的创意灵感",
      en: "Easily get Threads trending videos and images with watermark-free download support, save your creative inspiration",
      ja: "Threadsのビデオまたは画像をダウンロードする方法",
      ko: "Threads 비디오 또는 이미지를 다운로드하는 방법",
      hi: "Threads वीडियो या छवियों को कैसे डाउनलोड करें?",
    },
    date: "2025年8月10日",
    dateTime: "2025-08-10T00:00:00.000Z",
    readTime: "6 min read",
    category: "Threads",
  },
];

interface BlogItemProps {
  item: BlogItemData;
  currentLocale: string;
}

const BLOG_DISPLAY_LOCALES = ["zh", "en", "ja", "ko", "hi"] as const;
function getBlogDisplayLang(locale: string): (typeof BLOG_DISPLAY_LOCALES)[number] {
  return BLOG_DISPLAY_LOCALES.includes(locale as any) ? (locale as any) : "en";
}

function BlogItem({ item, currentLocale }: BlogItemProps) {
  const isTargetLang = getBlogDisplayLang(currentLocale);

  return (
    <article className="group relative gap-6 rounded-md border border-gray-800 bg-gray-900/50 p-6 px-4 py-12 shadow-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* 图标/图片区域 */}
        <div className="flex-shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-800 p-3 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-900/30">
            {typeof item.imageUrl === "string" ? (
              <Image
                alt={item.title[isTargetLang]}
                width={64}
                height={64}
                priority
                className="h-full w-full rounded object-cover object-center"
                src={item.imageUrl}
              />
            ) : (
              item.imageUrl
            )}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="min-w-0 flex-1">
          {/* 分类标签 */}
          {item.category && (
            <div className="mb-2">
              <span className="inline-flex items-center rounded-full bg-purple-900/30 border border-purple-500/30 px-2.5 py-0.5 text-xs font-medium text-purple-300">
                {item.category}
              </span>
            </div>
          )}

          {/* 标题 */}
          <h3 className="mb-2 text-lg leading-tight font-bold text-white transition-colors duration-200 group-hover:text-purple-400">
            {item.title[isTargetLang]}
          </h3>

          {/* 描述 */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-400">
            {item.description[isTargetLang]}
          </p>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            {/* 日期 */}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={item.dateTime}>{item.date}</time>
            </div>

            {/* 阅读时间 */}
            {item.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{item.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* 箭头指示器 */}
        <div className="flex-shrink-0 self-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* 悬停效果 - 底部边框 */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
    </article>
  );
}

export function ListItem({ currentLocale }: { currentLocale: Locale }) {
  const isTargetLang = getBlogDisplayLang(currentLocale);
  return (
    <div className="space-y-6 mt-12  min-h-screen py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <div className="mb-8 p-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-white">
          {getText("meta.title.blog", isTargetLang)}
        </h1>
        <p className="mx-auto max-w-2xl text-gray-400">
          {getText("meta.description.blog", isTargetLang)}
        </p>
      </div>

      {/* 博客列表 - H2 for SEO content hierarchy */}
      <h2 className="mb-6 text-xl font-semibold text-white">
        {getText("meta.section.blog.articles", isTargetLang)}
      </h2>
      <div className="grid cursor-pointer gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {blogItems.map((item, index) => (
          <Link
            className="block"
            target="_self"
            href={`/${isTargetLang}/blogs/${item.id}`}
            key={index}
          >
            <BlogItem key={item.id} item={item} currentLocale={isTargetLang} />
          </Link>
        ))}
      </div>
    </div>
  );
}
