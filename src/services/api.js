import axiosInstance from "./axiosInstance";

// Fetch societies
export const fetchSocieties = async () => {
    try {
        const response = await axiosInstance.get("/societies"); // Proxy kullanıldığı için baseURL gerekmez
        return response.data;
    } catch (error) {
        console.error("Error fetching societies:", error.message);
        throw error;
    }
};

// Fetch announcements for a specific society by societyId
export const fetchAnnouncementsBySocietyId = async (societyId) => {
    try {
        const response = await axiosInstance.get(`/announcements/society/${societyId}`); // Backend'deki doğru endpoint'i kullan
        return response.data; // Duyuruları döndür
    } catch (error) {
        console.error(`Error fetching announcements for society ID ${societyId}:`, error.message);
        throw error;
    }
};

// Fetch a single announcement by announcementId
export const fetchAnnouncementById = async (announcementId) => {
    try {
        const response = await axiosInstance.get(`/announcements/${announcementId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching announcement ID ${announcementId}:`, error.message);
        throw error;
    }
};


/**
 * Create a new announcement
 */
export const createAnnouncement = async (formData) => {
    try {
        const response = await axiosInstance.post(`/announcements`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating announcement:", error);
        throw error;
    }
};