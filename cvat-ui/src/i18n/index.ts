// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zhAll from './locales/zh-all.json';

export type AppLanguage = 'en' | 'zh-CN';

export const LANGUAGE_STORAGE_KEY = 'cvat.language';

export function normalizeLanguage(language?: string): AppLanguage {
    return language && language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
}

export function getInitialLanguage(): AppLanguage {
    try {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved === 'en' || saved === 'zh-CN') {
            return saved;
        }
    } catch (error) {
        // localStorage can be unavailable (private mode, disabled storage)
    }

    return normalizeLanguage(navigator.language || 'en');
}

i18n.use(initReactI18next).init({
    resources: {
        'zh-CN': { translation: zhAll },
    },
    lng: getInitialLanguage(),
    fallbackLng: false,
    // English source strings are used as translation keys. They contain dots,
    // colons and braces, so key/namespace separators must be disabled.
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
        escapeValue: false,
    },
    returnEmptyString: false,
});

// Translation helper that does not require a React hook. It is used by the
// bulk-localized components; the language switch reloads the page so every
// string is rendered again with the new language.
export function tt(key: string): string {
    const value = i18n.t(key);
    return typeof value === 'string' ? value : key;
}

// Interpolation-aware helper: tf('Value must be less than {{max}}', { max })
export function tf(key: string, vars: Record<string, string | number>): string {
    const value = i18n.t(key, vars);
    return typeof value === 'string' ? value : key;
}

export function changeLanguage(language: AppLanguage): void {
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
        // ignore storage errors
    }
    document.documentElement.setAttribute('lang', language);
    if (normalizeLanguage(i18n.language) === language) {
        i18n.changeLanguage(language);
        return;
    }
    // Full reload guarantees that every statically translated string is
    // re-evaluated in the newly selected language.
    window.location.reload();
}

export function currentLanguage(): AppLanguage {
    return normalizeLanguage(i18n.language);
}

export default i18n;
