// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import { GlobalOutlined } from '@ant-design/icons';

import { changeLanguage, normalizeLanguage, AppLanguage } from '.';

const LABELS: Record<AppLanguage, string> = {
    'zh-CN': '中文',
    en: 'English',
};

export default function LanguageSwitcher(): JSX.Element {
    const { t, i18n } = useTranslation();
    const current = normalizeLanguage(i18n.language);

    return (
        <Dropdown
            trigger={['click']}
            menu={{
                selectable: true,
                selectedKeys: [current],
                items: [
                    { key: 'zh-CN', label: LABELS['zh-CN'] },
                    { key: 'en', label: LABELS.en },
                ],
                onClick: ({ key }) => changeLanguage(key as AppLanguage),
            }}
        >
            <Button
                type='link'
                size='large'
                className='cvat-header-language-button cvat-header-button'
                icon={<GlobalOutlined />}
                title={t('header.language')}
            >
                {LABELS[current]}
            </Button>
        </Dropdown>
    );
}
