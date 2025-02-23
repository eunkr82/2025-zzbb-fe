import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, 
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken"); 
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;  
            try {
                const refreshToken = localStorage.getItem("refreshToken"); 
                if (!refreshToken) throw new Error("리프레시 토큰 없음");

                const response = await axios.post("https://2025-zzbb-back.site/user/refresh", 
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken); 
                    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("토큰 갱신 실패", refreshError);
                localStorage.removeItem("accessToken");
                if (!localStorage.getItem("refreshToken")) {
                    localStorage.removeItem("refreshToken");
                }
                
                const navigate = useNavigate();
                navigate('/signin');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
