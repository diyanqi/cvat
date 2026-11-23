// Copyright (C) 2022 Intel Corporation
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
            operators: ['select_any_in', 'select_equals'],
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
        updated_date: {
            label: tt("Last updated"),
            type: 'datetime',
            operators: ['between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
        },
        id: {
            label: tt("ID"),
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        task_id: {
            label: tt("Task ID"),
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        project_id: {
            label: tt("Project ID"),
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        task_name: {
            label: tt("Task name"),
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        project_name: {
            label: tt("Project name"),
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        type: {
            label: tt("Job Type"),
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
    '分配给我的': '{"and":[{"==":[{"var":"assignee"},"<username>"]}]}',
    '未完成': '{"!":{"or":[{"==":[{"var":"state"},"completed"]},{"==":[{"var":"stage"},"acceptance"]}]}}',
};
