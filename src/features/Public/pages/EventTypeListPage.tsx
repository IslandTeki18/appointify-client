import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface EventType {
  _id: string;
  title: string;
  duration: number;
  description: string;
}

export const EventTypeListPage = () => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/event-types");
      setEventTypes(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch event types. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Event Types</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventTypes.map((eventType) => (
          <Link
            key={eventType._id}
            to={`/book/${eventType._id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{eventType.title}</h2>
            <p className="text-gray-600 mb-2">
              Duration: {eventType.duration} minutes
            </p>
            <p className="text-gray-700">{eventType.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
