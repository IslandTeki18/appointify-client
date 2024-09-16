import axios from "axios";

export const getAllEventTypes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/event-types");
    return response.data;
  } catch (error) {
    console.error("Error fetching event types:", error);
    throw error;
  }
};
