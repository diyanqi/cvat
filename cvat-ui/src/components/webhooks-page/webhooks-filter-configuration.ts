// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from '@react-awesome-query-builder/antd';
import asyncFetchUsers from 'components/resource-sorting-filtering/request-users';
import { tt } from 'i18n';

export const config: Partial<Config> = {
    fields: {
        description: {
            label: tt("Description"),
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        target_url: {
            label: tt("Target URL"),
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
        type: {
            label: tt("Type"),
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'organization', title: tt("Organization") },
                    { value: 'project', title: tt("Project") },
                ],
            },
        },
        id: {
            label: tt("ID"),
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedWebhooksFilters';
export const predefinedFilterValues = {};
