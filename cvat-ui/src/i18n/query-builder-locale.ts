// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { AntdConfig } from '@react-awesome-query-builder/antd';

import { getInitialLanguage } from '.';

// @react-awesome-query-builder has no built-in translations. Its labels live
// in the shared config object, so they are localized by patching it once on
// startup (the whole UI is reloaded when the language changes).
const SETTINGS_LABELS: Record<string, string> = {
    valueLabel: '值',
    valuePlaceholder: '值',
    fieldLabel: '字段',
    operatorLabel: '运算符',
    funcLabel: '函数',
    fieldPlaceholder: '选择字段',
    funcPlaceholder: '选择函数',
    operatorPlaceholder: '选择运算符',
    lockLabel: '锁定',
    lockedLabel: '已锁定',
    deleteLabel: '删除',
    addGroupLabel: '添加分组',
    addCaseLabel: '添加条件',
    addDefaultCaseLabel: '添加默认条件',
    defaultCaseLabel: '默认：',
    addRuleLabel: '添加规则',
    addSubRuleLabel: '添加子规则',
    delGroupLabel: '删除',
    notLabel: '非',
    fieldSourcesPopupTitle: '选择来源',
    valueSourcesPopupTitle: '选择值来源',
};

const OPERATOR_LABELS: Record<string, string> = {
    '==': '等于',
    '!=': '不等于',
    '<': '小于',
    '<=': '小于或等于',
    '>': '大于',
    '>=': '大于或等于',
    Contains: '包含',
    'Not contains': '不包含',
    'Starts with': '开头是',
    'Ends with': '结尾是',
    Between: '介于',
    'Not between': '不介于',
    'Is empty': '为空',
    'Is not empty': '不为空',
    'Is null': '为 null',
    'Is not null': '不为 null',
    'Any in': '任一属于',
    'Not in': '不属于',
    Equals: '等于',
    'Not equals': '不等于',
    'Proximity search': '邻近搜索',
    Some: '任一',
    All: '全部',
    None: '无',
    'Number from': '数字起始于',
    'Date from': '日期起始于',
    'Time from': '时间起始于',
    'Datetime from': '日期时间起始于',
};

if (getInitialLanguage() === 'zh-CN') {
    Object.assign(AntdConfig.settings, SETTINGS_LABELS);

    if (AntdConfig.conjunctions) {
        if (AntdConfig.conjunctions.AND) {
            AntdConfig.conjunctions.AND.label = '且';
        }
        if (AntdConfig.conjunctions.OR) {
            AntdConfig.conjunctions.OR.label = '或';
        }
    }

    if (AntdConfig.operators) {
        Object.values(AntdConfig.operators).forEach((operator: any) => {
            if (operator && OPERATOR_LABELS[operator.label]) {
                operator.label = OPERATOR_LABELS[operator.label];
            }
        });
    }
}
