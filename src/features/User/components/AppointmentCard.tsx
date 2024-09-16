import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Appointment } from "~src/types/types";
import { Card } from "~src/components";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <Card variant="clear">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-2xl font-semibold">
          {appointment.eventType.title}
        </h2>
        <p className="text-blue-100">{appointment.eventType.description}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="text-gray-400 h-8 w-8" />
          <span className="text-gray-700">
            {formatDate(appointment.startTime)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <ClockIcon className="text-gray-400 h-8 w-8" />
          <span className="text-gray-700">
            {formatTime(appointment.startTime)} -{" "}
            {formatTime(appointment.endTime)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <UsersIcon className="text-gray-400 h-8 w-8" />
          <div>
            <p className="text-gray-700 font-medium">
              {appointment.attendee.name}
            </p>
            <p className="text-gray-500 text-sm">
              {appointment.attendee.email}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </span>
        </div>
      </div>
    </Card>
  );
};
