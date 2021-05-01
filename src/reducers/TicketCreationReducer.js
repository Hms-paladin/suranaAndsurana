
import { INSERT_TICKET_TEMPLATE, INSERT_RECRUITMENT_TICKET, GET_TICKET_TEMPLATE, GET_RECRUITMENT_TICKET, UPDATE_TICKET_STATUS } from '../utils/Constants.js';

const intialState = {
    InsertTicketTemplate: [], InsertRecruitmentTicket: [], getTicketTemplate: [], getRecruitmentTicket: [], updateTicketStatus: []
}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case INSERT_TICKET_TEMPLATE:
            return { ...state, InsertTicketTemplate: payload }
        case INSERT_RECRUITMENT_TICKET:
            return { ...state, InsertRecruitmentTicket: payload }
        case GET_TICKET_TEMPLATE:
            return { ...state, getTicketTemplate: payload }
        case GET_RECRUITMENT_TICKET:
            return { ...state, getRecruitmentTicket: payload }
        case UPDATE_TICKET_STATUS:
            return { ...state, updateTicketStatus: payload }
        default:
            return state;
    }

}
