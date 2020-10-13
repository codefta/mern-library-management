import axios from 'axios'
const baseUrl = '/api/v1/login'

const login = async (obj) => {
  const res = await axios.post(baseUrl, obj)
  return res.data
}

export default { login }
