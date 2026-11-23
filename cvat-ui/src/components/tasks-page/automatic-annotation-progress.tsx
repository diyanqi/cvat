// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Progress from 'antd/lib/progress';
import Modal from 'antd/lib/modal';

import CVATTooltip from 'components/common/cvat-tooltip';
import { RQStatus } from 'cvat-core-wrapper';
import { ActiveInference } from 'reducers';
import { tt } from 'i18n';

interface Props {
    activeInference: ActiveInference | null;
    cancelAutoAnnotation(): void;
}

function AutomaticAnnotationProgress(props: Props): JSX.Element | null {
    const { activeInference, cancelAutoAnnotation } = props;
    if (!activeInference) {
        return null;
    }

    let textType: 'success' | 'danger' = 'success';
    if ([RQStatus.FAILED, RQStatus.UNKNOWN].includes(activeInference.status)) {
        textType = 'danger';
    }

    return (
        <Row justify='space-between' align='bottom'>
            <Col span={22} className='cvat-task-item-progress-wrapper'>
                <div>
                    <Text
                        type={activeInference.status === RQStatus.QUEUED ? undefined : textType}
                        strong
                    >
                        {((): JSX.Element => {
                            if (activeInference.status === RQStatus.QUEUED) {
                                return (
                                    <>
                                        
                                        {tt("Automatic annotation request queued")}
                                        <LoadingOutlined />
                                    </>
                                );
                            }

                            if (activeInference.status === RQStatus.STARTED) {
                                return (
                                    <>
                                        
                                        {tt("Automatic annotation is in progress")}
                                        <LoadingOutlined />
                                    </>
                                );
                            }

                            if (activeInference.status === RQStatus.FAILED) {
                                return (<>{tt("Automatic annotation failed")}</>);
                            }

                            if (activeInference.status === RQStatus.UNKNOWN) {
                                return (<>{tt("Unknown status received")}</>);
                            }

                            return <>{tt("Automatic annotation accomplished")}</>;
                        })()}
                    </Text>
                </div>
                <Progress
                    percent={Math.floor(activeInference.progress)}
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    showInfo={false}
                    size='small'
                />
            </Col>
            <Col span={1} className='close-auto-annotation-icon'>
                { activeInference.status !== RQStatus.FAILED && (
                    <CVATTooltip title={tt("Cancel automatic annotation")}>
                        <CloseOutlined
                            onClick={() => {
                                Modal.confirm({
                                    title: tt("You are going to cancel automatic annotation?"),
                                    content: tt("Reached progress will be lost. Continue?"),
                                    okButtonProps: {
                                        type: 'primary',
                                        danger: true,
                                    },
                                    onOk() {
                                        cancelAutoAnnotation();
                                    },
                                });
                            }}
                        />
                    </CVATTooltip>
                )}
            </Col>
        </Row>
    );
}

export default React.memo(AutomaticAnnotationProgress);
