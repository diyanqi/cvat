// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import _ from 'lodash';
import { Config } from '@react-awesome-query-builder/antd';
import { config as jobPageFilterConfig } from 'components/jobs-page/jobs-filter-configuration';
import { tt } from 'i18n';

export const config: Partial<Config> = {
    fields: {
        ..._.pick(
            jobPageFilterConfig.fields, ['state', 'stage', 'assignee', 'updatedDate', 'id', 'task_name', 'task_id'],
        ),
        type: {
            label: tt("Job Type"),
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'annotation', title: tt("Annotation") },
                    { value: 'replica', title: tt("Replica") },
                ],
            },
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedQualityJobsFilters';
