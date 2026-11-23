// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';

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
        en: { translation: en },
        'zh-CN': { translation: zhCN },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    returnEmptyString: false,
});

export function changeLanguage(language: AppLanguage): void {
    i18n.changeLanguage(language);
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
        // ignore storage errors
    }
    document.documentElement.setAttribute('lang', language);
}

export function currentLanguage(): AppLanguage {
    return normalizeLanguage(i18n.language);
}

export default i18n;
