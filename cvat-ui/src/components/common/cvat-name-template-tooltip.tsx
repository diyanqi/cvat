// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { tt } from 'i18n';

interface NameTemplateTooltipProps {
    example: string;
}

function NameTemplateTooltip({ example }: NameTemplateTooltipProps) {
    return (
        <>
            
            {tt("You can use the template:")}
            <ul style={{ marginBottom: 0 }}>
                <li>
                    <code>{'{{id}}'}</code>
                    <br />
                    
                    {tt("- resource id")}
                </li>
                <li>
                    <code>{'{{name}}'}</code>
                    <br />
                    
                    {tt("- resource name")}
                </li>
                <li>
                    <code>{'{{index}}'}</code>
                    <br />
                    
                    {tt("- index in selection")}
                </li>
            </ul>
            <div>
                
                {tt("Example:")}
                <br />
                <i>{example}</i>
            </div>
        </>
    );
}

export default React.memo(NameTemplateTooltip);
