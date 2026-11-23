// Copyright (C) 2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from '@react-awesome-query-builder/antd';
import asyncFetchUsers from 'components/resource-sorting-filtering/request-users';
import { tt } from 'i18n';

export const config: Partial<Config> = {
    fields: {
        id: {
            label: tt("ID"),
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        provider_type: {
            label: tt("Provider type"),
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'AWS_S3_BUCKET', title: tt("Amazon S3") },
                    { value: 'AZURE_CONTAINER', title: tt("Azure Blob Storage") },
                    { value: 'GOOGLE_CLOUD_STORAGE', title: tt("Google Cloud Storage") },
                ],
            },
        },
        credentials_type: {
            label: tt("Credentials type"),
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'KEY_SECRET_KEY_PAIR', title: tt("Key & secret key") },
                    { value: 'ACCOUNT_NAME_TOKEN_PAIR', title: tt("Account name & token") },
                    { value: 'ANONYMOUS_ACCESS', title: tt("Anonymous access") },
                    { value: 'KEY_FILE_PATH', title: tt("Key file") },
                ],
            },
        },
        resource: {
            label: tt("Resource name"),
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        name: {
            label: tt("Name"),
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        description: {
            label: tt("Description"),
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        owner: {
            label: tt("Owner"),
            type: 'select',
            valueSources: ['value'],
            operators: ['select_equals'],
            fieldSettings: {
                useAsyncSearch: true,
                forceAsyncSearch: true,
                asyncFetch: asyncFetchUsers,
            },
        },
        updated_date: {
            label: tt("Last updated"),
            type: 'datetime',
            operators: ['between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedCloudStoragesFilters';

export const predefinedFilterValues = {
    '我拥有的': '{"and":[{"==":[{"var":"owner"},"<username>"]}]}',
    'Amazon S3 存储': '{"and":[{"==":[{"var":"provider_type"},"AWS_S3_BUCKET"]}]}',
    'Azure Blob 存储': '{"and":[{"==":[{"var":"provider_type"},"AZURE_CONTAINER"]}]}',
    'Google Cloud 存储': '{"and":[{"==":[{"var":"provider_type"},"GOOGLE_CLOUD_STORAGE"]}]}',
};
