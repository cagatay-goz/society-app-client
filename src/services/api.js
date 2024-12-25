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
        console.log("API Response:", response.data); // For debugging
        return response.data;
    } catch (error) {
        // Log the full error for better debugging
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Server Error:", error.response.data);
            console.error("Status Code:", error.response.status);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response:", error.request);
        } else {
            // Other errors (e.g., setup issues)
            console.error("Error Setting Up Request:", error.message);
        }
        throw error; // Re-throw to handle it in the calling function
    }
};

// Delete Announcement by ID
export const deleteAnnouncementById = async (announcementId) => {
    try {
        // DELETE isteği gönder
        const response = await axiosInstance.delete(`/announcements/${announcementId}`);

        // İstek başarılı ise dönen veriyi geri döndür
        return response.data;
    } catch (error) {
        // Hata durumunda daha fazla bilgi yazdır
        if (error.response) {
            console.error("Server Error:", error.response.data);
            console.error("Status Code:", error.response.status);
        } else if (error.request) {
            console.error("No Response:", error.request);
        } else {
            console.error("Error Setting Up Request:", error.message);
        }
        throw error; // Hata üst fonksiyonlara iletilsin
    }
};

/**
 * Update an existing announcement
 * @param {number} announcementId - ID of the announcement to update
 * @param {FormData} formData - FormData object containing the updated data
 */
export const updateAnnouncement = async (announcementId, formData) => {
    try {
        const response = await axiosInstance.put(`/announcements/${announcementId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("API Response:", response.data); // For debugging
        return response.data;
    } catch (error) {
        // Log the full error for better debugging
        if (error.response) {
            console.error("Server Error:", error.response.data);
            console.error("Status Code:", error.response.status);
        } else if (error.request) {
            console.error("No Response:", error.request);
        } else {
            console.error("Error Setting Up Request:", error.message);
        }
        throw error; // Re-throw to handle it in the calling function
    }
};



