// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { tt } from '.';
import dict from './locales/zh-all.json';

type Rule = [RegExp, string | ((...args: string[]) => string)];

// Notifications and errors are built in reducers, actions and on the server
// side, where per-string tt() wrapping is not possible. This module localizes
// them centrally, keeping markdown links intact.
const RULES: Rule[] = [
    // ------------------------------------------------------------------
    // messages from notifications-reducer
    // ------------------------------------------------------------------
    [/^To use your account, you need to confirm the email address\. We have sent an email with a confirmation link to (.+)\.$/,
        '要使用您的账号，需要先确认邮箱地址。我们已向 $1 发送了一封包含确认链接的邮件。'],
    [/^Export (.+) for (.+) (.+) is finished\.$/, '$2 $3 的 $1 导出已完成。'],
    [/^Export (.+) for (.+) (.+) has been uploaded to cloud storage\.$/, '$2 $3 的 $1 导出已上传到云存储。'],
    [/^Could not export the (.+) №(.+)$/, '无法导出$1 №$2'],
    [/^Backup for the (.+) (.+) is finished\.$/, '$1 $2 的备份已完成。'],
    [/^Backup for the (.+) (.+) has been uploaded to cloud storage\.$/, '$1 $2 的备份已上传到云存储。'],
    [/^Could not import dataset to the \[project #(.+)\]\((.+)\)$/, '无法将数据集导入[项目 #$1]($2)'],
    [/^The (.+) has been restored successfully\. Click \[here\]\((.+)\) to open$/, '$1 已成功恢复。点击[此处]($2)打开'],
    [/^Could not restore (.+) backup\.$/, '无法恢复$1备份。'],
    [/^Could not delete the \[task #(.+)\]\((.+)\)$/, '无法删除[任务 #$1]($2)'],
    [/^Could not update the \[task #(.+)\]\((.+)\)$/, '无法更新[任务 #$1]($2)'],
    [/^Could not transfer the \[task #(.+)\]\((.+)\) to the new workspace$/, '无法将[任务 #$1]($2)转移到新工作区'],
    [/^Consensus \[job #(.+)\]\((.+)\) has been merged$/, '共识[作业 #$1]($2)已合并'],
    [/^Consensus jobs in the \[task #(.+)\]\((.+)\) have been merged$/, '[任务 #$1]($2)中的共识作业已合并'],
    [/^Could not merge the \[job #(.+)\]\((.+)\)$/, '无法合并[作业 #$1]($2)'],
    [/^Could not merge the \[task #(.+)\]\((.+)\)$/, '无法合并[任务 #$1]($2)'],
    [/^Could not delete \[project #(.+)\]\((.+)\)$/, '无法删除[项目 #$1]($2)'],
    [/^Could not update the \[project #(.+)\]\((.+)\)$/, '无法更新[项目 #$1]($2)'],
    [/^Could not transfer the \[project #(.+)\]\((.+)\) to the new workspace$/, '无法将[项目 #$1]($2)转移到新工作区'],
    [/^Fetching inference status for the \[task #(.+)\]\((.+)\)$/, '正在获取[任务 #$1]($2)的推理状态'],
    [/^Could not infer model for the \[task #(.+)\]\((.+)\)$/, '无法为[任务 #$1]($2)执行模型推理'],
    [/^Could not cancel model inference for the \[task #(.+)\]\((.+)\)$/, '无法取消[任务 #$1]($2)的模型推理'],
    [/^Could not receive frame (.+)$/, '无法获取帧 $1'],
    [/^Could not upload annotations for the \[job (.+)\]\((.+)\)$/, '无法为[作业 $1]($2)上传标注'],
    [/^Could not submit review for the job (.+)$/, '无法提交作业 $1 的审核'],
    [/^Could not update cloud storage #(.+)$/, '无法更新云存储 #$1'],
    [/^Could not delete cloud storage (.+)$/, '无法删除云存储 $1'],
    [/^Could not fetch content for cloud storage #(.+)$/, '无法获取云存储 #$1 的内容'],
    [/^Could not fetch cloud storage #(.+) status$/, '无法获取云存储 #$1 的状态'],
    [/^Could not fetch preview for cloud storage #(.+)$/, '无法获取云存储 #$1 的预览'],
    [/^Could not create organization (.+)$/, '无法创建组织 $1'],
    [/^Could not update organization "(.+)"$/, '无法更新组织“$1”'],
    [/^Could not activate organization (.+)$/, '无法激活组织 $1'],
    [/^Could not remove organization (.+)$/, '无法移除组织 $1'],
    [/^Could not invite this member "(.+)" to the organization$/, '无法邀请成员“$1”加入组织'],
    [/^Could not remove member "(.+)" from the organization$/, '无法将成员“$1”移出组织'],
    [/^Could not assign role "(.+)" to the user "(.+)"$/, '无法为用户“$2”分配角色“$1”'],
    [/^Could not delete the job #(.+)$/, '无法删除作业 #$1'],
    // ------------------------------------------------------------------
    // common phrasing in server/core errors
    // ------------------------------------------------------------------
    [/^Not found\.?$/i, '未找到。'],
    [/^Permission denied\.?$/i, '权限被拒绝。'],
    [/^Invalid value\.?$/i, '值无效。'],
    [/^This field is required\.?$/i, '此字段为必填项。'],
    [/^This field may not be null\.?$/i, '此字段不能为空。'],
    [/^This field may not be blank\.?$/i, '此字段不能为空。'],
    [/^Expected a list of items\.?$/i, '应为条目列表。'],
    [/^Expected a dictionary of items\.?$/i, '应为键值字典。'],
    [/^Authentication credentials were not provided\.?$/i, '未提供认证凭据。'],
    [/^You do not have permission to perform this action\.?$/i, '您没有执行此操作的权限。'],
    [/^Open the Browser Console to get details$/, '打开浏览器控制台查看详细信息'],
];

const PHRASES: [RegExp, string][] = [
    [/\bCould not\b/gi, '无法'],
    [/\bCouldn't\b/gi, '无法'],
    [/\bCannot\b/gi, '无法'],
    [/\bCan not\b/gi, '无法'],
    [/\bCan't\b/gi, '无法'],
    [/\bFailed to\b/gi, '无法'],
    [/\bUnable to\b/gi, '无法'],
    [/\bdoes not exist\b/gi, '不存在'],
    [/\bdoesn't exist\b/gi, '不存在'],
    [/\bis not found\b/gi, '未找到'],
    [/\bwas not found\b/gi, '未找到'],
    [/\bnot found\b/gi, '未找到'],
    [/\bis not a valid\b/gi, '不是有效的'],
    [/\bis not valid\b/gi, '无效'],
    [/\bis invalid\b/gi, '无效'],
    [/\bis required\b/gi, '为必填项'],
    [/\bmust be\b/gi, '必须为'],
    [/\bmust contain\b/gi, '必须包含'],
    [/\bmust not\b/gi, '不得'],
    [/\bat least\b/gi, '至少'],
    [/\bat most\b/gi, '至多'],
    [/\balready exists\b/gi, '已存在'],
    [/\bnot allowed\b/gi, '不允许'],
    [/\bpermission denied\b/gi, '权限被拒绝'],
    [/\bInvalid\b/gi, '无效的'],
    [/\bUnknown\b/gi, '未知的'],
    [/\bUnexpected\b/gi, '意外的'],
    [/\bunexpected\b/gi, '意外的'],
    [/\bError\b/g, '错误'],
    [/\berror\b/g, '错误'],
    [/\bPlease\b/gi, '请'],
    [/\bplease\b/g, '请'],
];

function exact(input: string): string | undefined {
    const key = input.replace(/\s+/g, ' ').trim();
    return Object.prototype.hasOwnProperty.call(dict, key) ? (dict as Record<string, string>)[key] : undefined;
}

export function localizeText(input: string): string {
    if (!input) return input;

    const direct = exact(input);
    if (typeof direct === 'string') return direct;

    for (const [re, out] of RULES) {
        if (re.test(input)) {
            if (typeof out === 'function') {
                return input.replace(re, out);
            }
            return input.replace(re, out);
        }
    }

    let result = input;
    for (const [re, out] of PHRASES) {
        result = result.replace(re, out);
    }
    return result;
}

export function localizeRichText(input?: string): string | undefined {
    if (!input) return input;
    return localizeText(input);
}

export default localizeText;
