import axios from "axios";

// Creating an instance

export const httpAxios=axios.create({
    basURL:process.env.BASE_URL
})