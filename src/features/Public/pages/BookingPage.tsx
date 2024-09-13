import * as React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { useParams } from "react-router-dom";
import axios from "axios";

interface EventType {
  id: string;
  title: string;
  duration: number;
  description: string;
}

interface TimeSlot {
  start: string;
  end: string;
}

interface ScheduledTime {
  date: string;
  times: TimeSlot[];
}

interface AvailabilityData {
  availableDates: string[];
  scheduledTimes: ScheduledTime[];
}

export const BookingPage = () => {
  const { eventTypeId } = useParams();
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityData | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");

  useEffect(() => {
    const fetchEventType = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event-types/${eventTypeId}`
        );
        setEventType(response.data);
      } catch (error) {
        console.error("Error fetching event type:", error);
      }
    };

    const fetchAvailabilityData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event-types/${eventTypeId}/available-dates`
        );
        setAvailabilityData(response.data);
      } catch (error) {
        console.error("Error fetching availability data:", error);
      }
    };

    fetchEventType();
    fetchAvailabilityData();
  }, [eventTypeId]);

  const handleDateClick = async (arg: any) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    setSelectedSlot(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/event-types/${eventTypeId}/available-slots`,
        {
          params: { date: clickedDate },
        }
      );

      // Filter out booked slots
      const bookedSlots =
        availabilityData?.scheduledTimes.find(
          (scheduled) => scheduled.date === clickedDate
        )?.times || [];

      const filteredSlots = response.data.filter(
        (slot: TimeSlot) =>
          !bookedSlots.some(
            (bookedSlot) =>
              new Date(bookedSlot.start).getTime() ===
              new Date(slot.start).getTime()
          )
      );

      setAvailableSlots(filteredSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !attendeeName || !attendeeEmail) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Parse the start time and adjust it to ISO string with local timezone offset
      const startDate = new Date(selectedSlot.start);
      const startTimeISO = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      ).toISOString();

      await axios.post("http://localhost:5000/api/appointments", {
        eventTypeId,
        startTime: startTimeISO,
        attendee: {
          name: attendeeName,
          email: attendeeEmail,
        },
      });

      alert("Appointment booked successfully!");
      // Refresh availability data after booking
      const response = await axios.get(
        `http://localhost:5000/api/event-types/${eventTypeId}/available-dates`
      );
      setAvailabilityData(response.data);
      setSelectedSlot(null);
      setAttendeeEmail("");
      setAttendeeName("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const calendarEvents: EventInput[] = [];

  if (availabilityData) {
    // Add available dates
    calendarEvents.push(
      ...availabilityData.availableDates.map((date) => ({
        start: date,
        display: "background",
        backgroundColor: "#4CAF50",
      }))
    );

    // Add scheduled times
    calendarEvents.push(
      ...availabilityData.scheduledTimes.flatMap((scheduled) =>
        scheduled.times.map((time) => ({
          start: time.start,
          end: time.end,
          display: "block",
          backgroundColor: "#FFA500",
          borderColor: "#FF8C00",
          title: "Booked",
        }))
      )
    );
  }

  if (!eventType || !availabilityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{eventType.title}</h1>
      <p className="mb-4">{eventType.description}</p>
      <div className="mb-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          events={calendarEvents}
          dateClick={handleDateClick}
          validRange={{
            start: new Date(),
          }}
          height="auto"
        />
      </div>
      {selectedDate && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Available Slots for {selectedDate}
          </h2>
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelect(slot)}
                  className={`p-2 rounded ${
                    selectedSlot === slot
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {new Date(slot.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              ))}
            </div>
          ) : (
            <p>No available slots for this date.</p>
          )}
        </div>
      )}
      {selectedSlot && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Book Appointment</h2>
          <p>Selected time: {new Date(selectedSlot.start).toLocaleString()}</p>
          <input
            type="text"
            placeholder="Your Name"
            value={attendeeName}
            onChange={(e) => setAttendeeName(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={attendeeEmail}
            onChange={(e) => setAttendeeEmail(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
};
