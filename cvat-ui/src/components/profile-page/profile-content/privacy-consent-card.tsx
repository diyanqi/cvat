// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Switch from 'antd/lib/switch';

import { updateGrowthDataAsync } from 'actions/growth-actions';
import { CombinedState } from 'reducers';
import { tt } from 'i18n';

function PrivacyConsentCard(): JSX.Element {
    const dispatch = useDispatch();
    const { data, fetching } = useSelector((state: CombinedState) => state.growth);
    const [promotionNotificationsAllowed, setPromotionNotificationsAllowed] = useState(false);

    useEffect(() => {
        setPromotionNotificationsAllowed(data?.promotionNotificationsAllowed ?? false);
    }, [data?.promotionNotificationsAllowed]);

    const isChanged = !!data && promotionNotificationsAllowed !== data.promotionNotificationsAllowed;

    return (
        <Card title={tt("Privacy & consent")} className='cvat-profile-privacy-consent-card'>
            <div className='cvat-profile-privacy-consent-item'>
                <Switch
                    checked={promotionNotificationsAllowed}
                    loading={fetching}
                    disabled={!data}
                    onChange={setPromotionNotificationsAllowed}
                />
                <div className='cvat-profile-privacy-consent-item-copy'>
                    <div className='cvat-profile-privacy-consent-item-title'>{tt("Allow promotional notifications")}</div>
                    <div className='cvat-profile-privacy-consent-item-description'>
                        
                        {tt("Occasional product and community updates from CVAT.")}
                    </div>
                </div>
            </div>
            <div className='cvat-profile-privacy-consent-actions'>
                <Button
                    type='primary'
                    disabled={!isChanged}
                    loading={fetching}
                    onClick={() => dispatch(updateGrowthDataAsync({ promotionNotificationsAllowed }))}
                >
                    
                    {tt("Save changes")}
                </Button>
            </div>
        </Card>
    );
}

export default React.memo(PrivacyConsentCard);
