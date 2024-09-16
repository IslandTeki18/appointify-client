import React from "react";
import { useState, useEffect } from "react";
import { HeaderSection, Card, Button, Modal } from "~src/components";
import { useParams } from "react-router-dom";
import { getEventDetails } from "../api/getEventDetails";
import { deleteEventType } from "../api/deleteEventType";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "~src/hooks/useAuthContext";
import { EventType } from "~src/types/types";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";

export const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<EventType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (eventId) {
        try {
          const data = await getEventDetails(eventId);
          setEventDetails(data);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleDelete = async () => {
    deleteEventType(eventId!, user!.token);
    setIsDeleteModalOpen(false);
    navigate("/dashboard");
  };

  const handleEdit = async () => {
    // Implement edit functionality
    console.log("Edit event:", eventId);
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="flex flex-col">
      <HeaderSection
        title={eventDetails.title}
        variant="primary"
        desc={eventDetails.description}
      />
      <div className="flex flex-col p-8 mx-auto max-w-3xl w-full">
        <Card variant="clear" className="p-6 space-y-6">
          <h3 className="text-2xl font-semibold">Event Details</h3>
          <div className="flex items-center space-x-3">
            <ClockIcon className="text-gray-400 h-8 w-8" />
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-lg text-gray-900">
                {eventDetails.duration} minutes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarIcon className="text-gray-400 h-8 w-8" />
            <div>
              <p className="text-sm font-medium text-gray-500">Availability</p>
              <p className="text-lg text-gray-900">
                {eventDetails.availability.days.map(getDayName).join(", ")}
              </p>
              <p className="text-lg text-gray-900">
                {eventDetails.availability.startTime} -{" "}
                {eventDetails.availability.endTime}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <UserIcon className="text-gray-400 h-8 w-8" />
            <div>
              <p className="text-sm font-medium text-gray-500">User ID</p>
              <p className="text-lg text-gray-900">{eventDetails.user}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Event ID</p>
            <p className="text-lg text-gray-900">{eventDetails._id}</p>
          </div>
          <div className="flex space-x-4 pt-4">
            <Button onClick={handleEdit}>Edit Event</Button>

            <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              Delete Event
            </Button>
          </div>
        </Card>
      </div>
      <Modal
        variant="secondary"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Event?"
      >
        <p>Are you sure you want to delete this event?</p>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="danger" onClick={handleDelete}>
            Yes, delete this event.
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetailsPage;
