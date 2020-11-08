import axios from 'axios'

const URL_LOCALHOST = 'http://localhost:3030'

const getPosts = () => {
  axios.get(`${URL_LOCALHOST}/lines`).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  })
}

export {
  getPosts
}