// import https from 'https'
import { getKeyValue, APP_DICTIONARY } from './storage.service.js'
import axios from 'axios'

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(APP_DICTIONARY.token)
  if (!token) {
    throw new Error ('API_KEY is not defined. Set it with flag -t [API_KEY]')
  }
  // NATIVE WAY
  // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  // url.searchParams.append('q', city)
  // url.searchParams.append('appid', token)
  // url.searchParams.append('units', 'metric')
  //
  // https.get(url, (response) => {
  //   let result = '';
  //   response.on('data', (chunk) => {
  //     result += chunk
  //   })
  //   response.on('end', () => {
  //     console.log(result)
  //   })
  //   response.on('error', (err) => {
  //
  //   })
  // })
  // AXIOS WAY
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      units: 'metric'
    }
  })
  return data
}

const getIcon = (icon) => {
  switch(icon.slice(0, -1)) {
    case '01':
      return '☀️'
    case '02':
      return '🌤'
    case '03':
      return '☁️'
    case '04':
      return '☁️'
    case '09':
      return '🌧'
    case '10':
      return '🌦'
    case '11':
      return '🌩'
    case '13':
      return '❄️'
    case '50':
      return '🌫'
  }
}

export { getWeather, getIcon }