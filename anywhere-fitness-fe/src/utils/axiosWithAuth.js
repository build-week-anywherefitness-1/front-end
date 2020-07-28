import axios from 'axios'

const url = 'https://app-anywherefitness.herokuapp.com/api'

export default function axiosWithAuth() {
    const token = JSON.parse(localStorage.getItem('token'))

    return axios.create({
        headers: {
            Authorization: token,
        },
        baseURL: url,
    })
}