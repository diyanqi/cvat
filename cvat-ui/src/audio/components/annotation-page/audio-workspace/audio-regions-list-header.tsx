// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col, Row } from 'antd/lib/grid';
import Text from 'antd/lib/typography/Text';
import Select from 'antd/lib/select';
import {
    EyeInvisibleFilled, EyeOutlined, LockFilled, UnlockOutlined,
    PushpinFilled, PushpinOutlined,
} from '@ant-design/icons';

import CVATTooltip from 'components/common/cvat-tooltip';

import { AudioRegionsOrdering } from './utils/audio-interval';
import { tt } from 'i18n';

interface Props {
    count: number;
    ordering: AudioRegionsOrdering;
    allLocked: boolean;
    allPinned: boolean;
    allHidden: boolean;
    switchLockAllShortcut: string;
    switchPinAllShortcut: string;
    switchHiddenAllShortcut: string;
    onChangeOrdering(value: AudioRegionsOrdering): void;
    onLockAll(): void;
    onUnlockAll(): void;
    onPinAll(): void;
    onUnpinAll(): void;
    onHideAll(): void;
    onShowAll(): void;
}

function AudioRegionsListHeader(props: Props): JSX.Element {
    const {
        count,
        ordering,
        allLocked,
        allPinned,
        allHidden,
        switchLockAllShortcut,
        switchPinAllShortcut,
        switchHiddenAllShortcut,
        onChangeOrdering,
        onLockAll,
        onUnlockAll,
        onPinAll,
        onUnpinAll,
        onHideAll,
        onShowAll,
    } = props;

    return (
        <div className='cvat-audio-regions-list-header'>
            <Row justify='space-between' align='middle'>
                <Col>
                    <Text>{`条目：${count}`}</Text>
                </Col>
                <Col className='cvat-audio-regions-list-header-actions'>
                    <CVATTooltip title={`切换全部锁定 ${switchLockAllShortcut}`}>
                        {allLocked ? (
                            <LockFilled onClick={onUnlockAll} />
                        ) : (
                            <UnlockOutlined onClick={onLockAll} />
                        )}
                    </CVATTooltip>
                    <CVATTooltip title={`切换全部固定 ${switchPinAllShortcut}`}>
                        {allPinned ? (
                            <PushpinFilled onClick={onUnpinAll} />
                        ) : (
                            <PushpinOutlined onClick={onPinAll} />
                        )}
                    </CVATTooltip>
                    <CVATTooltip title={`切换全部隐藏 ${switchHiddenAllShortcut}`}>
                        {allHidden ? (
                            <EyeInvisibleFilled onClick={onShowAll} />
                        ) : (
                            <EyeOutlined onClick={onHideAll} />
                        )}
                    </CVATTooltip>
                </Col>
            </Row>
            <Row className='cvat-audio-regions-list-ordering' align='middle'>
                <Text>{tt("Sort by")}</Text>
                <Select
                    size='small'
                    className='cvat-audio-regions-list-ordering-selector'
                    value={ordering}
                    onChange={onChangeOrdering}
                >
                    {Object.values(AudioRegionsOrdering).map((value) => (
                        <Select.Option key={value} value={value}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            </Row>
        </div>
    );
}

export default React.memo(AudioRegionsListHeader);
