
import { tt } from 'i18n';// Copyright (C) 2019-2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

const NO_BREAK_SPACE = '\u00a0';
const UNDEFINED_ATTRIBUTE_VALUE = '__undefined__';
const CHANGELOG_URL = 'https://github.com/cvat-ai/cvat/blob/develop/CHANGELOG.md';
const LICENSE_URL = 'https://github.com/cvat-ai/cvat/blob/develop/LICENSE';
const DISCORD_URL = 'https://discord.gg/fNR3eXfk6C';
const GITHUB_URL = 'https://github.com/cvat-ai/cvat';
const GITHUB_IMAGE_URL = 'https://github.com/cvat-ai/cvat/raw/develop/site/content/en/images/cvat.jpg';
const GUIDE_URL = 'https://docs.cvat.ai/docs';
const QUALITY_TARGET_METRICS_GUIDE_URL =
    `${GUIDE_URL}/qa-analytics/auto-qa/#quality-target-metrics`;
const UPGRADE_GUIDE_URL = 'https://docs.cvat.ai/docs/administration/advanced/upgrade_guide';
const SHARE_MOUNT_GUIDE_URL =
    'https://docs.cvat.ai/docs/administration/basics/installation/#share-path';
const NUCLIO_GUIDE =
    'https://docs.cvat.ai//docs/administration/advanced/installation_automatic_annotation/';
const FILTERS_GUIDE_URL = 'https://docs.cvat.ai/docs/manual/advanced/filter/';
const DATASET_MANIFEST_GUIDE_URL = 'https://docs.cvat.ai/docs/manual/advanced/dataset_manifest/';
const CANVAS_BACKGROUND_COLORS = ['#ffffff', '#f1f1f1', '#e5e5e5', '#d8d8d8', '#CCCCCC', '#B3B3B3', '#999999'];
const NEW_LABEL_COLOR = '#b3b3b3';
const LATEST_COMMENTS_SHOWN_QUICK_ISSUE = 3;
const QUICK_ISSUE_INCORRECT_POSITION_TEXT = '位置错误';
const QUICK_ISSUE_INCORRECT_ATTRIBUTE_TEXT = '属性错误';
const DEFAULT_PROJECT_SUBSETS = ['Train', 'Test', 'Validation'];
const CANVAS_WORKSPACE_ROWS = 12;
const CANVAS_WORKSPACE_COLS = 12;
const CANVAS_WORKSPACE_MARGIN = 8;
const CANVAS_WORKSPACE_DEFAULT_CONTEXT_HEIGHT = 4;
const CANVAS_WORKSPACE_PADDING = CANVAS_WORKSPACE_MARGIN / 2;
const OUTSIDE_PIC_URL = 'https://docs.cvat.ai/images/image019.jpg';
const DEFAULT_AWS_REGIONS: string[][] = [
    ['us-east-1', tt("US East (N. Virginia)")],
    ['us-east-2', tt("US East (Ohio)")],
    ['us-west-1', tt("US West (N. California)")],
    ['us-west-2', tt("US West (Oregon)")],
    ['ap-south-1', tt("Asia Pacific (Mumbai)")],
    ['ap-northeast-1', tt("Asia Pacific (Tokyo)")],
    ['ap-northeast-2', tt("Asia Pacific (Seoul)")],
    ['ap-northeast-3', tt("Asia Pacific (Osaka)")],
    ['ap-southeast-1', tt("Asia Pacific (Singapore)")],
    ['ap-southeast-2', tt("Asia Pacific (Sydney)")],
    ['ca-central-1', tt("Canada (Central)")],
    ['eu-central-1', tt("EU (Frankfurt)")],
    ['eu-west-1', tt("Europe (Ireland)")],
    ['eu-west-2', tt("Europe (London)")],
    ['eu-west-3', tt("Europe (Paris)")],
    ['eu-north-1', tt("Europe (Stockholm)")],
    ['sa-east-1', tt("South America (São Paulo)")],
];

const DEFAULT_GOOGLE_CLOUD_STORAGE_LOCATIONS: string[][] = [
    ['NORTHAMERICA-NORTHEAST1', 'Montréal'],
    ['NORTHAMERICA-NORTHEAST2', 'Toronto'],
    ['US-CENTRAL1', 'Iowa'],
    ['US-EAST1', tt("South Carolina")],
    ['US-EAST4', tt("Northern Virginia")],
    ['US-WEST1', 'Oregon'],
    ['US-WEST2', tt("Los Angeles")],
    ['US-WEST3', tt("Salt Lake City")],
    ['US-WEST4', tt("Las Vegas")],
    ['SOUTHAMERICA-EAST1', tt("São Paulo")],
    ['EUROPE-CENTRAL2', 'Warsaw'],
    ['EUROPE-NORTH1', 'Finland'],
    ['EUROPE-WEST1', 'Belgium'],
    ['EUROPE-WEST2', 'London'],
    ['EUROPE-WEST3', 'Frankfurt'],
    ['EUROPE-WEST4', 'Netherlands'],
    ['EUROPE-WEST6', 'Zürich'],
    ['ASIA-EAST1', 'Taiwan'],
    ['ASIA-EAST2', tt("Hong Kong")],
    ['ASIA-NORTHEAST1', 'Tokyo'],
    ['ASIA-NORTHEAST2', 'Osaka'],
    ['ASIA-NORTHEAST3', 'Seoul'],
    ['ASIA-SOUTH1', 'Mumbai'],
    ['ASIA-SOUTH2', 'Delhi'],
    ['ASIA-SOUTHEAST1', 'Singapore'],
    ['ASIA-SOUTHEAST2', 'Jakarta'],
    ['AUSTRALIA-SOUTHEAST1', 'Sydney'],
    ['AUSTRALIA-SOUTHEAST2', 'Melbourne'],
    // Multi-regions
    ['ASIA', tt("Data centers in Asia")],
    ['EU', tt("Data centers within member states of the European Union")],
    ['US', tt("Data centers in the United States")],
    // Dual-regions
    ['ASIA1', tt("ASIA-NORTHEAST1 and ASIA-NORTHEAST2")],
    ['EUR4', tt("EUROPE-NORTH1 and EUROPE-WEST4")],
    ['NAM4', tt("US-CENTRAL1 and US-EAST1")],
];

const MAXIMUM_NOTIFICATION_MESSAGE_LENGTH = 600; // all above will be sent to console
const HEALTH_CHECK_RETRIES = 10;
const HEALTH_CHECK_PERIOD = 3000; // ms
const HEALTH_CHECK_REQUEST_TIMEOUT = 15000; // ms

const CONTROLS_LOGS_INTERVAL = 90000; // 1.5 min in ms
const ACTIVITY_EVENTS_INTERVAL_MS = 60000;

const RESET_NOTIFICATIONS_PATHS = {
    from: [
        '/auth/login',
        '/auth/register',
        '/auth/logout',
    ],
    exclude: [
        '/auth',
    ],
};
const BUCKET_CONTENT_KEY = tt("All files");

const NUMERIC_VALUE_CLAMP_THRESHOLD = 5000;
const MAX_REPLICAS_TO_ADD = 100; // per job and action, UI only. The server limit is MAX_JOBS_PER_TASK
const OPENCV_PATH = '/assets/opencv_4.8.0.js';

const LOCAL_STORAGE_SEEN_GUIDES_MEMORY_LIMIT = 10;
const LOCAL_STORAGE_LAST_FRAME_MEMORY_LIMIT = 20;

const REQUEST_SUCCESS_NOTIFICATION_DURATION = 5; // seconds

const BLACKLISTED_GO_BACK_PATHS = [
    /\/auth.+/,
];

const PAID_PLACEHOLDER_CONFIG = {
    url: 'https://www.cvat.ai/pricing/cloud',
    features: {
        qualityControl:
        '质量控制功能通过创建作为基准的真实标注作业，轻松评估标注质量。' +
        'CVAT 会自动将所有与任务相关的作业与该基准进行比较，计算标注精度以确保高质量结果。',
        analyticsReport:
        '分析报告功能提供对资源的全面洞察，包括对象统计、工作时长和标注速度等关键指标。' +
        '它允许按时间段、子资源或用户筛选数据，清晰展示性能趋势。此外，它还会展示资源内历史作业数据，' +
        '并提供详细图表以可视化信息。该功能非常适合需要深入分析和更好资源管理的用户。',
    },
};

export default {
    UNDEFINED_ATTRIBUTE_VALUE,
    NO_BREAK_SPACE,
    CHANGELOG_URL,
    LICENSE_URL,
    DISCORD_URL,
    GITHUB_URL,
    GITHUB_IMAGE_URL,
    GUIDE_URL,
    QUALITY_TARGET_METRICS_GUIDE_URL,
    UPGRADE_GUIDE_URL,
    SHARE_MOUNT_GUIDE_URL,
    CANVAS_BACKGROUND_COLORS,
    NEW_LABEL_COLOR,
    NUCLIO_GUIDE,
    FILTERS_GUIDE_URL,
    LATEST_COMMENTS_SHOWN_QUICK_ISSUE,
    QUICK_ISSUE_INCORRECT_POSITION_TEXT,
    QUICK_ISSUE_INCORRECT_ATTRIBUTE_TEXT,
    DEFAULT_PROJECT_SUBSETS,
    DEFAULT_AWS_REGIONS,
    DEFAULT_GOOGLE_CLOUD_STORAGE_LOCATIONS,
    OUTSIDE_PIC_URL,
    DATASET_MANIFEST_GUIDE_URL,
    HEALTH_CHECK_RETRIES,
    HEALTH_CHECK_PERIOD,
    HEALTH_CHECK_REQUEST_TIMEOUT,
    CANVAS_WORKSPACE_ROWS,
    CANVAS_WORKSPACE_COLS,
    CANVAS_WORKSPACE_MARGIN,
    CANVAS_WORKSPACE_PADDING,
    CANVAS_WORKSPACE_DEFAULT_CONTEXT_HEIGHT,
    CONTROLS_LOGS_INTERVAL,
    ACTIVITY_EVENTS_INTERVAL_MS,
    RESET_NOTIFICATIONS_PATHS,
    BUCKET_CONTENT_KEY,
    NUMERIC_VALUE_CLAMP_THRESHOLD,
    MAX_REPLICAS_TO_ADD,
    OPENCV_PATH,
    LOCAL_STORAGE_SEEN_GUIDES_MEMORY_LIMIT,
    LOCAL_STORAGE_LAST_FRAME_MEMORY_LIMIT,
    REQUEST_SUCCESS_NOTIFICATION_DURATION,
    BLACKLISTED_GO_BACK_PATHS,
    PAID_PLACEHOLDER_CONFIG,
    MAXIMUM_NOTIFICATION_MESSAGE_LENGTH,
};
