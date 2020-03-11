import Axios from 'axios'
const { json, send, createError, run } = require('micro')

const login = async (req, res) => {
  const { username } = await json(req)
  const url = `https://api.github.com/users/${username}`

  try {
    const response = await Axios.get(url)
    if (response.status(200)) {
      const { id } = await response.data()
      send(res, 200, { token: id })
    } else {
      send(res, response.status, response.statusText)
    }
  } catch (err) {
    throw createError(err.status, err.statusText)
  }
}

module.exports = (req, res) => run(req, res, login);