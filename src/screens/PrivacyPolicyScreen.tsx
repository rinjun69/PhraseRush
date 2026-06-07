import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onClose: () => void
}

type Lang = 'ja' | 'en'

interface Section {
  title: string
  content: (string | { label: string; href: string })[][]
}

const LAST_UPDATED = { ja: '2026年6月7日', en: 'June 7, 2026' }

const SECTIONS: Record<Lang, Section[]> = {
  ja: [
    {
      title: '1. はじめに',
      content: [
        ['本サービス「Phrase Rush」は、英語の語順感覚を楽しみながら身につけるWebゲームです。本プライバシーポリシーは、本サービスの利用にあたって収集・利用する情報についてご説明します。'],
      ],
    },
    {
      title: '2. 収集する情報',
      content: [
        ['■ Google Analytics 4 を通じて自動収集される情報'],
        ['・アクセス日時・閲覧ページ履歴'],
        ['・使用デバイス・ブラウザ・OS の種類'],
        ['・IPアドレス（Googleにより匿名化処理）'],
        ['・ゲームプレイに関する行動データ（ゲーム開始・正解/不正解・スコア・レベルなど）'],
        ['■ ブラウザに保存される情報（localStorage）'],
        ['・各レベルの自己ベストスコア'],
        ['これらのデータはお客様のデバイス内にのみ保存され、外部サーバーには送信されません。'],
      ],
    },
    {
      title: '3. 情報の利用目的',
      content: [
        ['収集した情報は以下の目的で利用します。'],
        ['・サービスの品質改善および利用状況の分析'],
        ['・ユーザー体験の向上'],
        ['・将来的な広告配信のための利用統計分析'],
      ],
    },
    {
      title: '4. Google Analytics 4 について',
      content: [
        ['本サービスでは、Google LLC が提供するアクセス解析ツール「Google Analytics 4」を使用しています。Google Analytics は Cookie を使用して情報を収集します。収集されたデータは Google のプライバシーポリシーに基づいて管理されます。'],
        ['ブラウザアドオンをインストールすることで、データ収集を拒否できます。'],
        [
          { label: 'Google アナリティクス オプトアウト アドオン', href: 'https://tools.google.com/dlpage/gaoptout' },
        ],
        [
          { label: 'Google プライバシーポリシー', href: 'https://policies.google.com/privacy' },
        ],
      ],
    },
    {
      title: '5. Google AdSense について（将来導入予定）',
      content: [
        ['本サービスでは、将来的に Google LLC が提供する広告配信サービス「Google AdSense」の導入を予定しています。Google AdSense は Cookie を使用し、お客様の興味・関心に基づいたインタレストベース広告を表示することがあります。'],
        ['Cookie によるデータ収集を希望されない場合は、Google の広告設定ページよりオプトアウトが可能です。'],
        [
          { label: 'Google 広告設定', href: 'https://adssettings.google.com' },
        ],
      ],
    },
    {
      title: '6. Cookie について',
      content: [
        ['本サービスでは、Google Analytics および Google AdSense（将来導入予定）の機能提供のために Cookie を使用します。ブラウザの設定により Cookie を無効にすることができますが、一部の機能が正常に動作しない場合があります。'],
      ],
    },
    {
      title: '7. 第三者へのデータ提供',
      content: [
        ['本サービスは、法令に基づく場合を除き、収集した情報を第三者に提供しません。ただし、Google Analytics および Google AdSense（将来導入予定）との間では、上記に記載の範囲でデータが共有されます。'],
      ],
    },
    {
      title: '8. 本ポリシーの変更',
      content: [
        ['本ポリシーは必要に応じて改訂することがあります。重要な変更がある場合は本ページにてお知らせします。'],
      ],
    },
    {
      title: '9. お問い合わせ',
      content: [
        ['本プライバシーポリシーに関するお問い合わせは、以下のメールアドレスまでお願いいたします。'],
        [{ label: 'info.phraserush@gmail.com', href: 'mailto:info.phraserush@gmail.com' }],
      ],
    },
  ],
  en: [
    {
      title: '1. Introduction',
      content: [
        ['"Phrase Rush" is a web game designed to help users learn English word order in an enjoyable way. This Privacy Policy explains how we collect and use information when you use our service.'],
      ],
    },
    {
      title: '2. Information We Collect',
      content: [
        ['■ Automatically collected via Google Analytics 4'],
        ['· Date and time of access, page view history'],
        ['· Device type, browser, and operating system'],
        ['· IP address (anonymized by Google)'],
        ['· Behavioral data related to gameplay (game start, correct/incorrect answers, scores, levels, etc.)'],
        ['■ Stored in your browser (localStorage)'],
        ['· Best scores for each difficulty level'],
        ['This data is stored only on your device and is not transmitted to external servers.'],
      ],
    },
    {
      title: '3. How We Use Information',
      content: [
        ['We use collected information to:'],
        ['· Analyze usage and improve the quality of the service'],
        ['· Enhance the user experience'],
        ['· Analyze usage statistics for future advertising purposes'],
      ],
    },
    {
      title: '4. Google Analytics 4',
      content: [
        ['This service uses Google Analytics 4, a web analytics tool provided by Google LLC. Google Analytics uses cookies to collect information, which is managed in accordance with Google\'s Privacy Policy.'],
        ['You can opt out of data collection by installing the browser add-on below.'],
        [{ label: 'Google Analytics Opt-out Browser Add-on', href: 'https://tools.google.com/dlpage/gaoptout' }],
        [{ label: 'Google Privacy Policy', href: 'https://policies.google.com/privacy' }],
      ],
    },
    {
      title: '5. Google AdSense (Planned)',
      content: [
        ['We plan to introduce Google AdSense, an advertising service provided by Google LLC, in the future. Google AdSense uses cookies to display interest-based advertisements tailored to your browsing behavior.'],
        ['If you wish to opt out of cookie-based data collection for advertising purposes, you may do so via Google\'s Ad Settings page.'],
        [{ label: 'Google Ad Settings', href: 'https://adssettings.google.com' }],
      ],
    },
    {
      title: '6. Cookies',
      content: [
        ['This service uses cookies to provide functionality through Google Analytics and Google AdSense (planned). You may disable cookies through your browser settings, but some features may not function correctly as a result.'],
      ],
    },
    {
      title: '7. Sharing with Third Parties',
      content: [
        ['We do not share collected information with third parties except as required by law. Data is shared with Google Analytics and Google AdSense (planned) only as described above.'],
      ],
    },
    {
      title: '8. Changes to This Policy',
      content: [
        ['This policy may be revised as necessary. For significant changes, we will provide notice on this page.'],
      ],
    },
    {
      title: '9. Contact',
      content: [
        ['For inquiries regarding this Privacy Policy, please contact us at:'],
        [{ label: 'info.phraserush@gmail.com', href: 'mailto:info.phraserush@gmail.com' }],
      ],
    },
  ],
}

function isLink(item: string | { label: string; href: string }): item is { label: string; href: string } {
  return typeof item === 'object'
}

export function PrivacyPolicyScreen({ onClose }: Props) {
  const [lang, setLang] = useState<Lang>('ja')

  return (
    <motion.div
      className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">
              {lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              {lang === 'ja' ? '最終更新日：' : 'Last Updated: '}
              {LAST_UPDATED[lang]}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* 言語切替 */}
            <div className="flex rounded-lg overflow-hidden border border-slate-700 text-sm">
              <button
                onClick={() => setLang('ja')}
                className={`px-3 py-1.5 font-semibold transition-colors ${
                  lang === 'ja' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 font-semibold transition-colors ${
                  lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 本文 */}
        <div className="space-y-6">
          {SECTIONS[lang].map((section) => (
            <section key={section.title} className="bg-slate-800/60 rounded-xl p-5">
              <h2 className="text-white font-bold mb-3">{section.title}</h2>
              <div className="space-y-1.5">
                {section.content.map((line, li) => (
                  <p key={li} className="text-slate-300 text-sm leading-relaxed">
                    {line.map((item, ii) =>
                      isLink(item) ? (
                        <a
                          key={ii}
                          href={item.href}
                          target={item.href.startsWith('mailto') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className="text-blue-400 underline underline-offset-2 hover:text-blue-300 break-all"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span key={ii}>{item}</span>
                      )
                    )}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
          >
            {lang === 'ja' ? '← 戻る' : '← Back'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
