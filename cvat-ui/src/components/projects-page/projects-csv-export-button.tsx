// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { ProjectsQuery } from 'reducers';
import { CSVColumn } from 'utils/csv-writer';
import { getCore, Project } from 'cvat-core-wrapper';
import createCSVExportButton from '../export-csv-button-hoc';
import { tt } from 'i18n';

const cvat = getCore();

const columns: CSVColumn<Project>[] = [
    { header: tt("ID"), accessor: (project) => project.id },
    { header: tt("Name"), accessor: (project) => project.name },
    { header: tt("Project URL"), accessor: (project) => `${window.location.origin}/projects/${project.id}` },
    { header: tt("Owner"), accessor: (project) => project.owner?.username ?? '' },
    { header: tt("Assignee"), accessor: (project) => project.assignee?.username ?? '' },
    { header: tt("Status"), accessor: (project) => project.status },
    { header: tt("Dimension"), accessor: (project) => project.dimension },
    {
        header: tt("Task Subsets"),
        accessor: (project) => (
            project.subsets && project.subsets.length > 0 ?
                project.subsets.join(', ') :
                ''
        ),
    },
    {
        header: tt("Created Date"),
        accessor: (project) => project.createdDate,
    },
    {
        header: tt("Updated Date"),
        accessor: (project) => project.updatedDate,
    },
    { header: tt("Bug Tracker"), accessor: (project) => project.bugTracker ?? '' },
];

const ProjectsCSVExportButton = createCSVExportButton<Project, ProjectsQuery>({
    resourceName: 'projects',
    className: 'cvat-projects-export-csv-button',
    tooltipTitle: tt("Export projects to CSV"),
    columns,
    uniqueKey: 'id',
    fetchPage: async (query) => {
        const projects = await cvat.projects.get(query);
        return {
            results: projects,
            count: projects.count,
        };
    },
});

export default ProjectsCSVExportButton;
