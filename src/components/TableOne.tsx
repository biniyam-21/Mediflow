import React, { useState } from 'react';
import { Table, Button, Badge } from '@mantine/core';
import { MOCK_OFFERS } from '../data/mockOffers';
import { VendorOffer } from '../types';

const TableOne: React.FC = () => {
  const [offers, setOffers] = useState<VendorOffer[]>(MOCK_OFFERS);

  const handleStatusChange = (id: string | number, newStatus: 'accepted' | 'declined') => {
    setOffers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const rows = offers.map((element, idx) => (
    <tr key={`${element.id}-${idx}`}>
      <td style={{ fontWeight: 500 }}>{element.name}</td>
      <td>{element.position}</td>
      <td>{element.symbol}</td>
      <td>{element.mass.toLocaleString()} Tsh</td>
      <td>
        {element.status === 'accepted' ? (
          <Badge color="green" variant="filled">Accepted</Badge>
        ) : element.status === 'declined' ? (
          <Badge color="red" variant="filled">Declined</Badge>
        ) : (
          <Button
            variant="outline"
            color="green"
            size="xs"
            onClick={() => handleStatusChange(element.id, 'accepted')}
          >
            Accept
          </Button>
        )}
      </td>
      <td>
        {element.status === 'pending' && (
          <Button
            variant="outline"
            color="red"
            size="xs"
            onClick={() => handleStatusChange(element.id, 'declined')}
          >
            Decline
          </Button>
        )}
      </td>
    </tr>
  ));

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table horizontalSpacing="md" verticalSpacing="xs" fontSize="md" highlightOnHover>
        <thead>
          <tr>
            <th>Center name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Price</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default TableOne;
