export interface ContactFormTextsI {
    title: string;
    intro: string;
    requiredHint: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    surnamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    privacyTitle: string;
    privacyResponsible: string;
    privacyPurpose: string;
    privacyLegalBasis: string;
    privacyRecipients: string;
    privacyRetention: string;
    privacyRights: string;
    privacyLinkLead: string;
    privacyLink: string;
    privacyLinkTail: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    deliveryNotConfigured: string;
    requiredError: string;
    emailError: string;
    lengthError: string;
    invalidError: string;
}

export interface ContactFormSubmissionI {
    name: string;
    surname: string;
    email: string;
    phone: string;
    message: string;
    website: string;
}
