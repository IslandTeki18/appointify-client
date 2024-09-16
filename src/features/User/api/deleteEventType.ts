import axios from "axios";

export const deleteEventType = async (eventTypeId: string, token: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/event-types/${eventTypeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting event type:", error);
    throw error;
  }
};