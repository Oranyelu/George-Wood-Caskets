import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("george-wood-cookie-consent");
    if (!consent) {
      // Small delay before showing banner for smoother visual entrance
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (level) => {
    localStorage.setItem("george-wood-cookie-consent", level);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-brand-cream/95 dark:bg-primary-dark/95 backdrop-blur-md border-t border-[#135B3A]/20 dark:border-white/10 shadow-2xl transition-all duration-500 animate-fade-in-up">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left max-w-3xl">
          <h3 className="text-lg font-serif font-bold text-[#135B3A] dark:text-green-500 mb-1">
            We value your comfort and privacy
          </h3>
          <p className="text-sm text-[#16221B]/80 dark:text-gray-300 leading-relaxed">
            At George Wood Casket, we use cookies to personalize your experience, analyze site usage, and support our legacy of compassionate care. You can choose to accept all cookies, only necessary ones, or deny them entirely. Learn more in our{" "}
            <Link to="/info/cookies" className="text-[#8C6A1C] dark:text-yellow-400 underline hover:text-[#C29E2E] transition-colors">
              Cookies Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => handleConsent("deny")}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            Deny
          </button>
          <button
            onClick={() => handleConsent("necessary")}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded border border-[#135B3A] text-[#135B3A] dark:border-green-500 dark:text-green-500 hover:bg-[#135B3A]/5 transition-colors"
          >
            Necessary Only
          </button>
          <button
            onClick={() => handleConsent("all")}
            className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded bg-[#135B3A] text-white hover:bg-green-800 transition-colors shadow-md"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
