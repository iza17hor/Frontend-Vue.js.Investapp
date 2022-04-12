import axios from 'axios';
import store from '@/store';
// ustawienia uwirzytelniania

export default function() { // funkcja
    const http = axios.create({ 
        headers: {
            Authorization: `Bearer ${store.getters.getAccessToken}`//skonfigurowany AccessToken
        }
        
    });
    return http;   // zwracanie http
}