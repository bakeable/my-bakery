import { mdiBookEdit, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { Customer } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../Avatar/UserAvatar'
import { useRouter } from 'next/router'
import { api } from '../../api'

const TableCustomers = () => {
  const router = useRouter()

  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    api.getCustomers().then((customers) => {
      setCustomers(customers || []);
    });
  }, []);

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const customersPaginated = customers.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(customers.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalDeleteActive, setIsModalDeleteActive] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)

  const closeModal = () => {
    setIsModalDeleteActive(false)
  }

  const confirmDeleteCustomer = (customerId: string) => {
    setIsModalDeleteActive(true)
    setCustomerToDelete(customerId)
  }

  const deleteCustomer = () => {
    if (customerToDelete) {
      api
        .deleteCustomer(customerToDelete)
        .then(() => {
          closeModal();
  
          // Filter out the deleted customer and update the state
          setCustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer.id !== customerToDelete)
          );
        })
        .catch(() => {
          closeModal();
        });
    }
  }

  return (
    <>
      <CardBoxModal
        title="Weet je het zeker?"
        buttonColor="danger"
        buttonLabel="Bevestigen"
        isActive={isModalDeleteActive}
        onConfirm={deleteCustomer}
        onCancel={closeModal}
      >
        <p>Deze actie kan niet ongedaan worden gemaakt</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Klantnaam</th>
            <th>Relatienummer</th>
            <th>Aangemaakt op</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customersPaginated.map((customer: Customer) => (
            <tr key={customer.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={customer.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Name">{customer.name}</td>
              <td data-label="RelationNumber">{customer.relation_number}</td>
              <td data-label="Created">
                <small className="text-gray-500 dark:text-slate-400">{new Date(customer.created_timestamp || Date.now()).toLocaleDateString()}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="success"
                    icon={mdiBookEdit}
                    onClick={() => router.push(`/customers/${customer.id}`)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => confirmDeleteCustomer(customer.id)}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableCustomers
