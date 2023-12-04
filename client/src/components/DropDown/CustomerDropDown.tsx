import React, { useEffect, useState } from 'react';
import { Field, useField } from 'formik';
import { Customer } from '../../interfaces';
import { api } from '../../api';
import { FormField } from '..';
import { mdiOfficeBuilding } from '@mdi/js';

type Props = {
    label?: string
    labelFor?: string
    name?: string
    id?: string
}

export default function CustomerDropdown({
    label,
    labelFor,
    name,
    id,
  }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Call your async function to get the list of customers
    api.getCustomers().then((customers) => {
      setCustomers(customers);
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
            <option value="" disabled selected>Selecteer een klant</option>
            {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                    {customer.name}
                </option>
            ))}
        </select>
    </FormField>
  );
};
