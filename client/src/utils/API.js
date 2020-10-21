import axios from 'axios';

export default {

    // Get a new word
    getWord: function() {
        return axios.get("/getWord");
    }

};