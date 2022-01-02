import chalk from 'chalk'
const { bgRed, bgGreen, bgYellow, bgCyan } = chalk
import dedent from 'dedent-js'

const printError = (err) => {
  console.log(bgRed(' ERROR ') + ' ' + err)
}

const printSuccess = (msg) => {
  console.log(bgGreen(' SUCCESS ') + ' ' + msg)
}

const printHelp = () => {
  console.log(
    dedent`${bgYellow(' HELP ')}
    no parameters - output the weather
    -c [CITY] - to set the city
    -h [HELP] - to print the help
    -t [API_KEY] - to set token
    `
  )
}

const printWeather = (response, icon) => {
  console.log(
    dedent`${bgCyan(' WEATHER ')} Weather in the city: ${response.name}
    ${icon}  ${response.weather[0].description}
    Temperature: ${response.main.temp} (feels like ${response.main.feels_like})
    Humidity: ${response.main.humidity} %
    Wind speed: ${response.wind.speed} m/s
    `
  )
}

export { printError, printSuccess, printHelp, printWeather }