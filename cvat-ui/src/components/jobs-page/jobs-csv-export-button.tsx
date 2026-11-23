// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { JobsQuery } from 'reducers';
import { CSVColumn } from 'utils/csv-writer';
import { getCore, Job } from 'cvat-core-wrapper';
import createCSVExportButton from '../export-csv-button-hoc';
import { tt } from 'i18n';

const cvat = getCore();

const columns: CSVColumn<Job>[] = [
    { header: tt("ID"), accessor: (job) => job.id },
    { header: tt("Job URL"), accessor: (job) => `${window.location.origin}/tasks/${job.taskId}/jobs/${job.id}` },
    { header: tt("Task ID"), accessor: (job) => job.taskId },
    { header: tt("Task Name"), accessor: (job) => job.taskName ?? '' },
    { header: tt("Task URL"), accessor: (job) => `${window.location.origin}/tasks/${job.taskId}` },
    { header: tt("Project ID"), accessor: (job) => job.projectId },
    { header: tt("Project Name"), accessor: (job) => job.projectName ?? '' },
    { header: tt("Project URL"), accessor: (job) => (job.projectId ? `${window.location.origin}/projects/${job.projectId}` : '') },
    { header: tt("Assignee"), accessor: (job) => job.assignee?.username ?? '' },
    { header: tt("Stage"), accessor: (job) => job.stage },
    { header: tt("State"), accessor: (job) => job.state },
    { header: tt("Type"), accessor: (job) => job.type },
    { header: tt("Start Frame"), accessor: (job) => job.startFrame },
    { header: tt("Stop Frame"), accessor: (job) => job.stopFrame },
    { header: tt("Frame Count"), accessor: (job) => job.stopFrame - job.startFrame + 1 },
    {
        header: tt("Created Date"),
        accessor: (job) => job.createdDate,
    },
    {
        header: tt("Updated Date"),
        accessor: (job) => job.updatedDate,
    },
];

const JobsCSVExportButton = createCSVExportButton<Job, JobsQuery>({
    resourceName: 'jobs',
    className: 'cvat-jobs-export-csv-button',
    tooltipTitle: tt("Export jobs to CSV"),
    columns,
    uniqueKey: 'id',
    fetchPage: async (query) => {
        const jobs = await cvat.jobs.get(query);
        return {
            results: jobs,
            count: jobs.count,
        };
    },
});

export default JobsCSVExportButton;
