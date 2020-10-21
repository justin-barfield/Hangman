import axios from 'axios';

export default {

    // Get a new word
    getWord: function() {
        console.log("Client: Api: getWord");
        return axios.get("/getWord");
    }

};