// Copyright (C) 2021-2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import {
    SerializedLabel, SerializedAttribute, getCore, LabelType,
} from 'cvat-core-wrapper';
import { tt } from 'i18n';

export interface SkeletonConfiguration {
    type: 'skeleton';
    svg: string;
    sublabels: SerializedLabel[];
}

export type LabelOptColor = SerializedLabel;

const core = getCore();
let id = 0;

// Number attributes store a [minimum, maximum, step] triple in "values"
// instead of a list of options.
export function validateNumberAttributeValues(values: string[]): void {
    if (values.length !== 3) {
        throw new Error(tt("three numbers are expected"));
    }

    const trimmed = values.map((value: string) => value.trim());
    const numbers = trimmed.map((value: string): number => (value.length ? Number(value) : NaN));
    const invalidIndex = numbers.findIndex((number: number) => !Number.isFinite(number));
    if (invalidIndex !== -1) {
        throw new Error(`“${trimmed[invalidIndex]}”不是数字`);
    }

    const [min, max, step] = numbers;

    if (min >= max) {
        throw new Error(tt("minimum must be less than maximum"));
    }

    if (max - min < step) {
        throw new Error(tt("step must be less than minmax difference"));
    }

    if (step <= 0) {
        throw new Error(tt("step must be a positive number"));
    }
}

function validateParsedAttribute(attr: SerializedAttribute): void {
    if (typeof attr !== 'object' || attr === null) {
        throw new Error(tt("Attribute must be a JSON object"));
    }

    if (typeof attr.name !== 'string') {
        throw new Error(tt("Attribute name must be a string"));
    }

    if (attr.name.trim().length === 0) {
        throw new Error(tt("Attribute name must not be empty"));
    }

    if (typeof attr.id !== 'undefined' && !Number.isInteger(attr.id)) {
        throw new Error(`属性“${attr.name}”：id 必须是整数或留空`);
    }

    if (!['checkbox', 'number', 'text', 'radio', 'select'].includes((attr.input_type ?? '').toLowerCase())) {
        throw new Error(`属性“${attr.name}”：未知输入类型：${attr.input_type}`);
    }

    if (typeof attr.mutable !== 'boolean') {
        throw new Error(`属性“${attr.name}”：mutable 必须为布尔值`);
    }

    if (!Array.isArray(attr.values) || !attr.values.length) {
        throw new Error(`属性“${attr.name}”：属性值必须是非空数组`);
    }

    for (const value of attr.values) {
        if (typeof value !== 'string') {
            throw new Error(`属性“${attr.name}”：每个属性值必须是字符串`);
        }
    }

    const attrValues = attr.values.map((value: string) => value.trim());
    if (attr.input_type.toLowerCase() === 'number') {
        try {
            validateNumberAttributeValues(attrValues);
        } catch (error: any) {
            throw new Error(`属性“${attr.name}”：${error.message}`);
        }
    } else if (new Set(attrValues).size !== attrValues.length) {
        throw new Error(`属性“${attr.name}”：属性值必须唯一`);
    }

    if (attr.default_value) {
        if (!core.utils.validateAttributeValue(attr.default_value, new core.classes.Attribute(attr))) {
            throw new Error(
                `属性“${attr.name}”：无效的默认值“${attr.default_value}”`,
            );
        }
    }
}

export function validateParsedLabel(label: SerializedLabel): void {
    if (typeof label !== 'object' || label === null) {
        throw new Error(tt("Label must be a JSON object"));
    }

    if (typeof label.name !== 'string') {
        throw new Error(tt("Label name must be a string"));
    }

    if (label.name.trim().length === 0) {
        throw new Error(tt("Label name must not be empty"));
    }

    if (typeof label.id !== 'undefined' && !Number.isInteger(label.id)) {
        throw new Error(`标签“${label.name}”：id 必须是整数或留空`);
    }

    if (label.color && typeof label.color !== 'string') {
        throw new Error(`标签“${label.name}”：颜色必须是字符串`);
    }

    if (label.color && !label.color.match(/^#[0-9a-fA-F]{6}$|^$/)) {
        throw new Error(`标签“${label.name}”：颜色值无效`);
    }

    if (!Array.isArray(label.attributes)) {
        throw new Error(`标签“${label.name}”：属性必须是数组`);
    }

    for (const attr of label.attributes) {
        validateParsedAttribute(attr);
    }

    const attrNames = label.attributes.map((attr: SerializedAttribute) => attr.name.trim());
    if (new Set(attrNames).size !== attrNames.length) {
        throw new Error(`标签“${label.name}”：属性名必须唯一`);
    }

    if (!Object.values(LabelType).includes(label.type)) {
        throw new Error(`标签“${label.name}”：未知标签类型“${label.type}”`);
    }

    if (label.type === LabelType.SKELETON) {
        if (!Array.isArray(label.sublabels) || label.sublabels.length === 0) {
            throw new Error(`标签“${label.name}”：骨架必须提供非空的子标签数组`);
        }

        for (const sublabel of label.sublabels) {
            validateParsedLabel(sublabel);
        }

        const sublabelsNames = label.sublabels.map((sublabel: SerializedLabel) => sublabel.name.trim());
        if (new Set(sublabelsNames).size !== sublabelsNames.length) {
            throw new Error(`标签“${label.name}”：子标签名必须唯一`);
        }

        if (typeof label.svg !== 'string') {
            throw new Error(`标签“${label.name}”：骨架必须提供正确的 SVG 模板`);
        }

        const sublabelIds = label.sublabels
            .map((sublabel: SerializedLabel) => sublabel.id)
            .filter((sublabelId: number | undefined) => sublabelId !== undefined);
        const matches = label.svg.matchAll(/data-label-id="([\d]+)"/g);
        for (const match of matches) {
            const refersToId = +match[1];
            if (!sublabelIds.includes(refersToId)) {
                throw new Error(
                    `标签“${label.name}”：骨架 SVG 引用了不存在的子标签 id ${refersToId}，` +
                    tt("which is not present in the sublabels array"),
                );
            }
        }
    }
}

export function idGenerator(): number {
    return --id;
}

export function equalArrayHead(arr1: string[], arr2: string[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

export function toSVGCoord(svg: SVGSVGElement, coord: number[], raiseError = false): number[] {
    const result = [];
    const ctm = svg.getScreenCTM();

    if (!ctm) {
        if (raiseError) throw new Error('屏幕 CTM 为空');
        return coord;
    }

    const inversed = ctm.inverse();
    if (!inversed) {
        if (raiseError) throw new Error('逆屏幕 CTM 为空');
        return coord;
    }

    for (let i = 0; i < coord.length; i += 2) {
        let point = svg.createSVGPoint();
        point.x = coord[i];
        point.y = coord[i + 1];
        point = point.matrixTransform(inversed);
        result.push(point.x, point.y);
    }

    return result;
}

export function fromSVGCoord(svg: SVGSVGElement, coord: number[], raiseError = false): number[] {
    const result = [];
    const ctm = svg.getScreenCTM();
    if (!ctm) {
        if (raiseError) throw new Error('逆屏幕 CTM 为空');
        return coord;
    }

    for (let i = 0; i < coord.length; i += 2) {
        let point = svg.createSVGPoint();
        point.x = coord[i];
        point.y = coord[i + 1];
        point = point.matrixTransform(ctm);
        result.push(point.x, point.y);
    }

    return result;
}
