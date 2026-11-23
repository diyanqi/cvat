// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import Modal from 'antd/lib/modal';

import { Organization, Project, Task } from 'cvat-core-wrapper';
import { tf, tt } from 'i18n';

export function confirmTransferModal(
    instances: Project[] | Task[],
    activeWorkspace: Organization | null,
    dstWorkspace: Organization | null,
    onOk: () => void,
): void {
    const first = instances[0];
    if (!first) {
        return;
    }

    const instanceType = first instanceof Task ? tt('task') : tt('project');
    const movingItems = instances.length > 1 ?
        `${instances.length} ${instanceType}` : `${instanceType} #${first.id}`;
    const target = dstWorkspace ? tf(tt("organization {{slug}}"), { slug: dstWorkspace.slug }) : tt('personal workspace');
    let details = tf(tt("You are going to move {{items}} to the {{target}}. Would you like to proceed?"), {
        items: movingItems,
        target,
    });
    if (activeWorkspace) {
        details += tf(tt("Organization members will lose access to {{resources}}."), {
            resources: instances.length > 1 ? tt('these resources') : tt('this resource'),
        });
    }

    Modal.confirm({
        title: tt("Data transfer between workspaces"),
        content: details,
        className: 'cvat-modal-confirm-project-transfer-between-workspaces',
        onOk,
        okButtonProps: {
            type: 'primary',
            danger: true,
        },
        okText: tt("Continue"),
    });
}
