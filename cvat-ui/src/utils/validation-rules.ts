// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { RuleObject } from 'antd/lib/form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RuleType } from 'rc-field-form/lib/interface';

import patterns from './validation-patterns';
import { tt } from 'i18n';

export function validateUsername(_: RuleObject, value: string): Promise<void> {
    if (!value) {
        return Promise.resolve();
    }

    if (!patterns.validateUsernameLength.pattern.test(value)) {
        return Promise.reject(new Error(patterns.validateUsernameLength.message));
    }

    if (!patterns.validateUsernameCharacters.pattern.test(value)) {
        return Promise.reject(new Error(patterns.validateUsernameCharacters.message));
    }

    return Promise.resolve();
}

const validationRules = {
    firstName: [
        {
            required: true,
            message: tt("Please specify a first name"),
            pattern: patterns.validateName.pattern,
        },
    ],

    lastName: [
        {
            required: true,
            message: tt("Please specify a last name"),
            pattern: patterns.validateName.pattern,
        },
    ],

    email: [
        {
            type: 'email' as RuleType,
            message: tt("The input is not valid E-mail!"),
        },
        {
            required: true,
            message: tt("Please specify an email address"),
        },
    ],

    userName: [
        {
            required: true,
            message: tt("Please specify a username"),
        },
        {
            validator: validateUsername,
        },
    ],
};

export default validationRules;
