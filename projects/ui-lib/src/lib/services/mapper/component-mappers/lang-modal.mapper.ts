import { UiLibLangItemI } from '@lluc_llull/ui-lib/interfaces';

export const mapLangModal = (langs: any[], currentLang: string = 'es'): UiLibLangItemI[] => {
    if (!Array.isArray(langs)) return [];

    return langs.map((lang, index) => {
        const label = lang.labels?.[currentLang] || lang.labels?.[lang.code] || lang.code;

        return {
            id: lang.id ?? index,
            code: lang.code,
            label,
        };
    });
};
