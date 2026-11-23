// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from '@react-awesome-query-builder/antd';
import asyncFetchUsers from 'components/resource-sorting-filtering/request-users';
import { tt } from 'i18n';

export const config: Partial<Config> = {
    fields: {
        state: {
            label: tt("State"),
            type: 'select',
            operators: ['select_any_in', 'select_equals'], // ['select_equals', 'select_not_equals', 'select_any_in', 'select_not_any_in']
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'new', title: tt("new") },
                    { value: tt("in progress"), title: tt("in progress") },
                    { value: 'rejected', title: tt("rejected") },
                    { value: 'completed', title: tt("completed") },
                ],
            },
        },
        stage: {
            label: tt("Stage"),
            type: 'select',
            operators: ['select_any_in', 'select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'annotation', title: tt("annotation") },
                    { value: 'validation', title: tt("validation") },
                    { value: 'acceptance', title: tt("acceptance") },
                ],
            },
        },
        dimension: {
            label: tt("Dimension"),
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: '1d', title: '1D' },
                    { value: '2d', title: '2D' },
                    { value: '3d', title: '3D' },
                ],
            },
        },
        assignee: {
            label: tt("Assignee"),
            type: 'select',
            valueSources: ['value'],
            operators: ['select_equals', 'is_empty', 'is_not_empty'],
            fieldSettings: {
                useAsyncSearch: true,
                forceAsyncSearch: true,
                asyncFetch: asyncFetchUsers,
            },
        },
        updatedDate: {
            label: tt("Last updated"),
            type: 'datetime',
            operators: ['between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
        },
        type: {
            label: tt("Type"),
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'annotation', title: tt("Annotation") },
                    { value: 'ground_truth', title: tt("Ground truth") },
                    { value: 'replica', title: tt("Replica") },
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
        parent_job_id: {
            label: tt("Parent ID"),
            type: 'number',
            operators: ['is_empty', 'is_not_empty', 'equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedJobsFilters';
export const predefinedFilterValues = {
    'Assigned to me': '{"and":[{"==":[{"var":"assignee"},"<username>"]}]}',
    'Not completed': '{"!":{"or":[{"==":[{"var":"state"},"completed"]},{"==":[{"var":"stage"},"acceptance"]}]}}',
    'Not a replica': '{"and":[{"!":{"var":"parent_job_id"}}]}',
};
