// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ConfigProvider from 'antd/lib/config-provider';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { normalizeLanguage } from '.';

export default function LocaleProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const { i18n } = useTranslation();
    const language = normalizeLanguage(i18n.language);

    useEffect(() => {
        dayjs.locale(language === 'zh-CN' ? 'zh-cn' : 'en');
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    return (
        <ConfigProvider locale={language === 'zh-CN' ? zhCN : enUS} autoInsertSpaceInButton={false}>
            {children}
        </ConfigProvider>
    );
}
