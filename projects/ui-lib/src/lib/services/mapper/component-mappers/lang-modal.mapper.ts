export const mapLangModal = (props: any[], currentLang: string = 'es') => {
    const safeProps = Array.isArray(props) ? props : [];
    const allTranslations = safeProps.flatMap((lang) =>
        Array.isArray(lang.lang_translations) ? lang.lang_translations : [],
    );
    return safeProps.map((lang: any) => {
        const found = allTranslations.find(
            (t: any) => t.lang_code === lang.code && t.target_lang_code === currentLang,
        );
        const label = found?.label || lang.code;
        return {
            id: lang.id,
            code: lang.code,
            label,
        };
    });
};
