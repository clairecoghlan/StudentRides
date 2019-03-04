import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://api.geonames.org', // ?maxRows=10&username=eamole
    params: {
      maxRows: 10,
      username: 'eamole',
      country: 'ie'
    }

    // ,
    // withCredentials: true
    // ,
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // }
  })
}
