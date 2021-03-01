import { GET_SKILLS } from '../utils/Constants.js'

const initalState = []

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_SKILLS:
            return payload
        default:
            return state;    
    }
   
}