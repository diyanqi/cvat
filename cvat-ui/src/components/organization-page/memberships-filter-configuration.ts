// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from '@react-awesome-query-builder/antd';
import asyncFetchUsers from 'components/resource-sorting-filtering/request-users';
import { tt } from 'i18n';

export const config: Partial<Config> = {
    fields: {
        user: {
            label: tt("User"),
            type: 'select',
            valueSources: ['value'],
            operators: ['select_equals'],
            fieldSettings: {
                useAsyncSearch: true,
                forceAsyncSearch: true,
                asyncFetch: asyncFetchUsers,
            },
        },
        role: {
            label: tt("Role"),
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'worker', title: tt("Worker") },
                    { value: 'supervisor', title: tt("Supervisor") },
                    { value: 'maintainer', title: tt("Maintainer") },
                    { value: 'owner', title: tt("Owner") },
                ],
            },
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedMembershipsFilters';
export const predefinedFilterValues = {
    Workers: '{"and":[{"==":[{"var":"role"},"worker"]}]}',
    Supervisors: '{"and":[{"==":[{"var":"role"},"supervisor"]}]}',
    Maintainers: '{"and":[{"==":[{"var":"role"},"maintainer"]}]}',
};
