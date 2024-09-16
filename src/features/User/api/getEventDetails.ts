import axios from "axios";

export const getEventDetails = async (eventId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/event-types/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};
