import React from 'react';
import { IconCheck, IconTruck, IconThumbUp, IconFileText } from '@tabler/icons-react';
import { OrderStatus } from '../types';

interface TimelineStep {
  label: string;
  description: string;
  icon: React.ElementType;
  status: 'done' | 'active' | 'pending';
}

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  updatedAt?: string;
  createdAt?: string;
}

const getSteps = (status: OrderStatus): TimelineStep[] => {
  const order: OrderStatus[] = ['requested', 'approved', 'in_transit', 'delivered'];
  const cancelled = status === 'cancelled';
  const currentIdx = cancelled ? -1 : order.indexOf(status);

  return [
    {
      label: 'Order Requested',
      description: 'Your order has been submitted and is awaiting review.',
      icon: IconFileText,
      status: cancelled ? 'done' : currentIdx >= 0 ? 'done' : 'pending',
    },
    {
      label: 'Order Approved',
      description: 'The vendor has reviewed and approved your order.',
      icon: IconThumbUp,
      status: cancelled ? 'pending' : currentIdx > 0 ? 'done' : currentIdx === 0 ? 'pending' : 'pending',
    },
    {
      label: 'In Transit',
      description: 'Your medicines are packed and on the way.',
      icon: IconTruck,
      status: cancelled ? 'pending' : currentIdx > 1 ? 'done' : currentIdx === 1 ? 'active' : 'pending',
    },
    {
      label: 'Delivered',
      description: 'Your order has been received successfully.',
      icon: IconCheck,
      status: cancelled ? 'pending' : currentIdx === 3 ? 'active' : 'pending',
    },
  ];
};

const colorMap = {
  done: { dot: '#16a34a', line: 'done', text: '#16a34a' },
  active: { dot: '#16a34a', line: 'pending', text: '#16a34a' },
  pending: { dot: '#e2e8f0', line: 'pending', text: '#94a3b8' },
};

const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const steps = getSteps(currentStatus);

  return (
    <div className="timeline">
      {steps.map((step, idx) => {
        const colors = colorMap[step.status];
        const isLast = idx === steps.length - 1;
        const Icon = step.icon;
        return (
          <div key={idx} className="timeline-step">
            <div className="timeline-connector">
              <div
                className={`timeline-dot ${step.status}`}
                style={{ background: colors.dot, boxShadow: step.status === 'active' ? '0 0 0 4px rgba(22,163,74,0.15)' : 'none' }}
              >
                <Icon size={15} color={step.status === 'pending' ? '#94a3b8' : 'white'} strokeWidth={2.2} />
              </div>
              {!isLast && (
                <div
                  className={`timeline-line ${step.status === 'done' ? 'done' : 'pending'}`}
                  style={{ minHeight: 28, background: step.status === 'done' ? '#16a34a' : '#e2e8f0' }}
                />
              )}
            </div>
            <div style={{ paddingTop: 4, paddingBottom: isLast ? 0 : 20 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: step.status === 'pending' ? '#94a3b8' : '#0f172a' }}>
                {step.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>
                {step.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
