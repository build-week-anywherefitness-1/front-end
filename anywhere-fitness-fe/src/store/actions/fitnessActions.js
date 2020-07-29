import axios from 'axios'
import * as act from '../actions'

export function PostClasses(data) {
    return (dispatch) => {
        dispatch({ type: act.FETCH_INSTRUCTOR_START })
        axios.post('https://app-anywherefitness.herokuapp.com/api/instructor/classes ')
            .then(res => {
                dispatch({ type: act.FETCH_INSTRUCTOR_FINISH, data })
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