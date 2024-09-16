import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Card, Button } from "~src/components";
import { useNavigate } from "react-router-dom";

interface Availability {
  days: number[];
  startTime: string;
  endTime: string;
}

interface EventType {
  availability: Availability;
  _id: string;
  title: string;
  duration: number;
  description: string;
  user: string;
  __v: number;
}

interface EventTypeCardProps {
  eventType: EventType;
}

export const EventTypeCard: React.FC<EventTypeCardProps> = ({ eventType }) => {
  const navigate = useNavigate();
  const getDayName = (day: number): string => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;
  };

  return (
    <Card variant="clear" className="flex flex-col justify-between">
      <div className="bg-purple-600 text-white px-6 py-4">
        <h2 className="text-2xl font-semibold">{eventType.title}</h2>
        <p className="text-indigo-100">{eventType.description}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <ClockIcon className="text-gray-400 h-8 w-8" />
          <span className="text-gray-700">
            Duration: {formatDuration(eventType.duration)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <CalendarIcon className="text-gray-400 h-8 w-8" />
          <div>
            <p className="text-gray-700 font-medium">Availability:</p>
            <p className="text-gray-600">
              {eventType.availability.days.map(getDayName).join(", ")}
            </p>
            <p className="text-gray-600">
              {eventType.availability.startTime} -{" "}
              {eventType.availability.endTime}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <UserIcon className="text-gray-400 h-8 w-8" />
          <span className="text-gray-700">User ID: {eventType.user}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <p className="text-gray-500 text-sm">Event Type ID: {eventType._id}</p>
      </div>
      <div className="grid grid-cols-1 items-center gap-3 px-4 py-4">
        <Button
          className="w-full flex items-center justify-center gap-2"
          variant="primary"
          onClick={() => navigate(`/event-details/${eventType._id}`)}
        >
          <EyeIcon className="w-4 h-4" />
          View
        </Button>
      </div>
    </Card>
  );
};
