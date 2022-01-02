#!/usr/bin/env node

import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue, APP_DICTIONARY, getKeyValue } from './services/storage.service.js'
import { getIcon, getWeather } from './services/api.service.js'

const saveData = async (key, value) => {
  if (!value.length) {
    printError(`${key} was not passed.`)
    return
  }
  try {
    await saveKeyValue(key, value)
    printSuccess(`${key} was successfully saved.`)
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(APP_DICTIONARY.city)
    const weatherData = await getWeather(city)
    printWeather(weatherData, getIcon(weatherData.weather[0].icon))
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('City is not defined')
    } else if (e?.response?.status === 401) {
      printError('Token is not correct')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    return printHelp()
  }
  if (args.c) {
    return saveData(APP_DICTIONARY.city, args.c)
  }
  if (args.t) {
    return saveData(APP_DICTIONARY.token, args.t)
  }
  return getForecast()
}

initCLI()