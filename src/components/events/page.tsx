//src/components/events/page.tsx
'use client';

import { EventCardProps } from '@/types/event';
import { FaCalendarAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <>
      <div
        className="card-item cursor-pointer transition-transform hover:scale-[1.01]"
        onClick={() => onClick(event.id)}
        data-tooltip-id={`event-tooltip-${event.id}`}
        data-tooltip-content={event.description ?? ''}
      >
        <img src={event.imageUrl} alt={event.title} className="event-card-image" />
        <div className="event-card-content bg-white dark:bg-gray-800">
          <div className="event-card-header text-gray-900 dark:text-gray-200">
            <h3 className="event-card-title text-single-line text-gray-900 dark:text-gray-200">{event.title}</h3>
            <span
              className={`event-status-badge ${
                event.status === '진행중' ? 'ongoing' : 'ended'
              }`}
            >
              {event.status}
            </span>
          </div>
          <p className="event-period flex items-center gap-1 text-gray-600">
            <FaCalendarAlt size={14} />
            {event.period}
          </p>
        </div>
      </div>

      <Tooltip
        id={`event-tooltip-${event.id}`}
        className="tooltip-custom"
        place="top"
      />
    </>
  );
}
