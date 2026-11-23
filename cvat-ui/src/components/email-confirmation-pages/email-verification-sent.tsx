// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import './styles.scss';
import { tt } from 'i18n';

const { Content } = Layout;

/**
 * Component for displaying message that email should be verified
 */

export default function EmailVerificationSentPage(): JSX.Element {
    return (
        <Layout>
            <Content>
                <Row justify='center' align='middle' id='email-verification-sent-page-container'>
                    <Col>
                        <h1>{tt("Please, confirm your email")}</h1>
                        <Button className='cvat-go-to-login-button' type='link' href='/auth/login'>
                            
                            {tt("Go to login page")}
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
