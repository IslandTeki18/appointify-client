import * as React from "react";
import { useState, useEffect } from "react";
import { HeaderSection, Card } from "~src/components";
import { AppointmentCard, EventTypeCard } from "../components";
import axios from "axios";
import { useAuthContext } from "~src/hooks/useAuthContext";

export const DashboardPage = () => {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [eventTypes, setEventTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAppointments();
      await getEventTypes();
    };
    fetchData();
  }, []);
  async function getAppointments() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }
  async function getEventTypes() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/event-types",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setEventTypes(response.data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  }

  function renderAppointments() {
    if (appointments.length === 0) {
      return <p>No appointments found.</p>;
    }
    return appointments.map((appointment: any) => (
      <AppointmentCard key={appointment._id} appointment={appointment} />
    ));
  }

  function renderEventTypes() {
    if (eventTypes.length === 0) {
      return <p>No event types found.</p>;
    }
    return eventTypes.map((eventType: any) => (
      <EventTypeCard key={eventType._id} eventType={eventType} />
    ));
  }
  return (
    <div className="flex flex-col">
      <HeaderSection
        title="Dashboard"
        variant="primary"
        desc="Welcome to the dashboard"
      />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold mt-6">Appointments</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {renderAppointments()}
        </div>
        <h2 className="text-3xl font-bold mt-6">Event Types</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {renderEventTypes()}
        </div>
      </div>
    </div>
  );
};
