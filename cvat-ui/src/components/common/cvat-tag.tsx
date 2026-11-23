// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Tag from 'antd/lib/tag';
import { tt } from 'i18n';

export enum TagType {
    GROUND_TRUTH = 'ground_truth',
    PARENT = 'parent',
    REPLICA = 'replica',
}

interface TagProps {
    type: TagType;
}

function CVATTag(props: TagProps): JSX.Element | null {
    const { type } = props;

    switch (type) {
        case TagType.GROUND_TRUTH:
            return <Tag className='cvat-tag-ground-truth' color='#ED9C00'>{tt("Ground truth")}</Tag>;
        case TagType.PARENT:
            return <Tag className='cvat-tag-parent' color='#1890FF'>{tt("Parent")}</Tag>;
        case TagType.REPLICA:
            return <Tag className='cvat-tag-replica' color='#13c2c2'>{tt("Replica")}</Tag>;
        default:
            return null;
    }
}

export default React.memo(CVATTag);
