import axios from "axios";
const instance = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    headers : {
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
    },
});
export default instance;
