// Copyright (C) 2024 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { RuleObject } from 'antd/lib/form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

import { tf, tt } from 'i18n';

export const isInteger = ({ min, max, filter }: {
    min?: number;
    max?: number;
    filter?: (intValue: number) => boolean;
}) => (
    _: RuleObject,
    value?: number | string,
): Promise<void> => {
    if (typeof value === 'undefined' || value === '') {
        return Promise.resolve();
    }

    const intValue = +value;
    if (Number.isNaN(intValue) || !Number.isInteger(intValue)) {
        return Promise.reject(new Error(tt('Value must be a positive integer')));
    }

    if (typeof min !== 'undefined' && intValue < min) {
        return Promise.reject(new Error(tf(tt("Value must be more than {{min}}"), { min })));
    }

    if (typeof max !== 'undefined' && intValue > max) {
        return Promise.reject(new Error(tf(tt("Value must be less than {{max}}"), { max })));
    }

    if (filter && !filter(intValue)) {
        return Promise.reject(new Error(tf(tt("Value can not be equal to {{value}}"), { value: intValue })));
    }

    return Promise.resolve();
};

export function formFieldsError(error: any): string[] {
    return (error as ValidateErrorEntity).errorFields ?
        (error as ValidateErrorEntity).errorFields
            .map((field) => `${field.name} : ${field.errors.join(';')}`) :
        [error.toString()];
}
