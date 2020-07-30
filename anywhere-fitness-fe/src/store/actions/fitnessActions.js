import axios from 'axios'
import * as act from '../actions'
import axiosWithAuth from '../../utils/axiosWithAuth'

export function PostClasses(newClass) {
    return (dispatch) => {
        dispatch({ type: act.FETCH_INSTRUCTOR_START })
        axiosWithAuth().post('/instructor/classes', newClass)
            .then(res => {
                dispatch({ type: act.FETCH_INSTRUCTOR_FINISH })
                dispatch({
                    type: act.FETCH_INSTRUCTOR_RECEIVED,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({ type: act.FETCH_INSTRUCTOR_FINISH })
            })
    }
}

export function GetClasses() {
    return (dispatch) => {
        axiosWithAuth().get('/client/classes/all')
    }
}

export function Login() {
    return (dispatch) => {
        axiosWithAuth().post('/auth/login', data)
    }
}