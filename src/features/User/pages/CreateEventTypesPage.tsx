import React from "react";
import { useState, useEffect } from "react";
import { HeaderSection, Form, Input, Button } from "~src/components";
import { EventTypeCard } from "../components";
import axios from "axios";
import { useAuthContext } from "~src/hooks/useAuthContext";
import { getAllEventTypes } from "../api/getAllEventTypes";

interface EventType {
  title: string;
  duration: number;
  description: string;
  availability: {
    days: number[];
    startTime: string;
    endTime: string;
  };
}

export const CreateEventTypesPage = () => {
  const { user } = useAuthContext();
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [formData, setFormData] = useState<EventType>({
    title: "",
    duration: 30,
    description: "",
    availability: {
      days: [],
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    const fetchEventTypes = async () => {
      const data = await getAllEventTypes();
      setEventTypes(data);
    };
    fetchEventTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "days") {
      const dayNumber = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          days: prev.availability.days.includes(dayNumber)
            ? prev.availability.days.filter((d) => d !== dayNumber)
            : [...prev.availability.days, dayNumber],
        },
      }));
    } else if (name === "startTime" || name === "endTime") {
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "duration" ? parseInt(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/event-types", formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setFormData({
        title: "",
        duration: 30,
        description: "",
        availability: {
          days: [],
          startTime: "",
          endTime: "",
        },
      });
    } catch (error) {
      console.error("Error creating event type:", error);
    }
  };

  function renderEventTypes() {
    if (eventTypes.length === 0) {
      return <p>No event types found.</p>;
    }
    return eventTypes.map((eventType: any) => (
      <EventTypeCard key={eventType._id} eventType={eventType} />
    ));
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col">
      <HeaderSection
        title="Create Event Type"
        variant="primary"
        desc="Fill in the details to create a new event type"
      />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-3xl font-bold mb-6">Create an Event Type</h2>
        <Form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-4xl w-screen"
          darkMode
        >
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div>
            <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
              Available Days
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day, index) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="days"
                    value={index}
                    checked={
                      formData.availability &&
                      formData.availability.days?.includes(index)
                    }
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>
          <Input
            label="Start Time"
            name="startTime"
            type="time"
            value={formData.availability && formData.availability.startTime}
            onChange={handleChange}
            required
          />
          <Input
            label="End Time"
            name="endTime"
            type="time"
            value={formData.availability && formData.availability.endTime}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="primary">
            Create Event Type
          </Button>
        </Form>
      </div>
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-3xl font-bold">Event Types</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {renderEventTypes()}
        </div>
      </div>
    </div>
  );
};
