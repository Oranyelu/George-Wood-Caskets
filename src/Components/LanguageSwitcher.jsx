import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ig', name: 'Igbo' },
        { code: 'ha', name: 'Hausa' },
        { code: 'yo', name: 'Yoruba' },
    ];

    return (
        <div className="flex gap-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${i18n.language === lang.code
                            ? 'bg-secondary text-white border-secondary'
                            : 'bg-transparent text-white border-white/30 hover:border-white'
                        }`}
                >
                    {lang.code.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
