import React, { useEffect, useState } from 'react';
import { Field, useField } from 'formik';
import { Project } from '../../interfaces';
import { api } from '../../api';
import { FormField } from '..';
import { mdiOfficeBuilding } from '@mdi/js';

type Props = {
    label?: string
    labelFor?: string
    name?: string
    id?: string
}

export default function ProjectDropdown({
    label,
    labelFor,
    name,
    id,
  }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Call your async function to get the list of projects
    api.getProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  // Use Formik's useField hook to get the field properties
  const [field, meta, helpers] = useField(name);

  return (
    <FormField label={label} labelFor={labelFor} icons={[mdiOfficeBuilding]}>
        <select
            {...field}
            id={id}
            onChange={(e) => {
                field.onChange(e);
                helpers.setValue(e.target.value); // Manually update the field value
                console.log(e.target.value)
            }}
        >
            <option value="" disabled selected>Selecteer een project</option>
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}
        </select>
    </FormField>
  );
};
