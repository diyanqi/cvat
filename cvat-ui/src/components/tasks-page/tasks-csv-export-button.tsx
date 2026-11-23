// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { TasksQuery } from 'reducers';
import { CSVColumn } from 'utils/csv-writer';
import { getCore, Task } from 'cvat-core-wrapper';
import createCSVExportButton from '../export-csv-button-hoc';
import { tt } from 'i18n';

const cvat = getCore();

const columns: CSVColumn<Task>[] = [
    { header: tt("ID"), accessor: (task) => task.id },
    { header: tt("Name"), accessor: (task) => task.name },
    { header: tt("Task URL"), accessor: (task) => `${window.location.origin}/tasks/${task.id}` },
    { header: tt("Project ID"), accessor: (task) => task.projectId },
    { header: tt("Project Name"), accessor: (task) => task.projectName ?? '' },
    { header: tt("Project URL"), accessor: (task) => (task.projectId ? `${window.location.origin}/projects/${task.projectId}` : '') },
    { header: tt("Owner"), accessor: (task) => task.owner?.username ?? '' },
    { header: tt("Assignee"), accessor: (task) => task.assignee?.username ?? '' },
    { header: tt("Status"), accessor: (task) => task.status },
    { header: tt("Mode"), accessor: (task) => task.mode },
    { header: tt("Size"), accessor: (task) => task.size },
    { header: tt("Subset"), accessor: (task) => task.subset ?? '' },
    {
        header: tt("Created Date"),
        accessor: (task) => task.createdDate,
    },
    {
        header: tt("Updated Date"),
        accessor: (task) => task.updatedDate,
    },
    { header: tt("Bug Tracker"), accessor: (task) => task.bugTracker ?? '' },
];

const TasksCSVExportButton = createCSVExportButton<Task, TasksQuery>({
    resourceName: 'tasks',
    className: 'cvat-tasks-export-csv-button',
    tooltipTitle: tt("Export tasks to CSV"),
    columns,
    uniqueKey: 'id',
    fetchPage: async (query) => {
        const tasks = await cvat.tasks.get(query);
        return {
            results: tasks,
            count: tasks.count,
        };
    },
});

export default TasksCSVExportButton;
