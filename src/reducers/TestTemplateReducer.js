import {INSERT_TESTTEMPLATE} from '../utils/Constants'
const initialState={
    insertTestTemplate:false,
}
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case INSERT_TESTTEMPLATE:
            return {...state,insertTestTemplate:payload}
    }
}