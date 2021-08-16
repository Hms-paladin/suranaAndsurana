import { INSERT_TICKET_TEMPLATE, INSERT_RECRUITMENT_TICKET, GET_TICKET_TEMPLATE, GET_RECRUITMENT_TICKET, UPDATE_TICKET_STATUS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import { getHrTaskList } from './TodoListAction';
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment'




export const InsertTicketTemplate = (TicketCreation, changemsg) => async dispatch => {
    console.log(changemsg, "changemsg")
    try {
        axios({
            method: "POST",
            url: apiurl + "insert_ticket_template",
            data: {
                "department_id": TicketCreation.department.value || 0,
                "designation_id": TicketCreation.designation.value || 0,
                "number_of_position": TicketCreation.position.value || 0,
                "location_office": TicketCreation.location.value || 0,
                "required_by": TicketCreation.req_by.value || 0,
                "qualification_id": TicketCreation.qualification.valueById || 0,
                "experience": TicketCreation.experience.value || 0,
                "language_id": TicketCreation.language.valueById || 0,
                "state_id": TicketCreation.state.value || 0,
                "age_limit": TicketCreation.age_limit.value || 0,
                "skill_id": TicketCreation.skills.valueById || 0,
                "trait_id": TicketCreation.traits.valueById || 0,
                "certification_id": TicketCreation.certifications.valueById || 0,
                "specialization_id": TicketCreation.specialization.valueById || 0,
                "capability_id": TicketCreation.capablities.valueById || 0,
                "talent_id": TicketCreation.talents.valueById || 0,
                "remarks": TicketCreation.remarks.value || "",
                "assigned_to": TicketCreation.assignedto.value || 0,
                "created_on": moment().format("YYYY-MM-DD"),
                "created_by": localStorage.getItem("empId"),
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_TICKET_TEMPLATE, payload: true })
                notification.success({

                    message: changemsg ? " Template Updated Successfully" : " Template Saved Successfully",
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const getTicketTemplate = (TicketCreation) => async dispatch => {
    try {
        // console.log(groupName, "groupName")
        axios({
            method: "POST",
            url: apiurl + "get_ticket_template",
            data: {
                "department_id": TicketCreation.department || 0,
                "designation_id": TicketCreation.designation || 0,

            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: GET_TICKET_TEMPLATE, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

// Generate Ticket

export const InsertRecruitmentTicket = (TicketCreation) => async dispatch => {
    try {
        // console.log(groupName, "groupName")
        axios({
            method: "POST",
            url: apiurl + "insert_recruitment_ticket",
            data: {
                "department_id": TicketCreation.department.value || 0,
                "designation_id": TicketCreation.designation.value || 0,
                "location_office": TicketCreation.location.value || 0,
                "number_of_position": TicketCreation.position.value || 0,
                "required_by": TicketCreation.req_by.value || 0,
                "qualification_id": TicketCreation.qualification.valueById || 0,
                "experience": TicketCreation.experience.value || 0,
                "language_id": TicketCreation.language.valueById || 0,
                "state_id": TicketCreation.state.value || 0,
                "age_limit": TicketCreation.age_limit.value || 0,
                "skill_id": TicketCreation.skills.valueById || 0,
                "trait_id": TicketCreation.traits.valueById || 0,
                "certification_id": TicketCreation.certifications.valueById || 0,
                "specialization_id": TicketCreation.specialization.valueById || 0,
                "capability_id": TicketCreation.capablities.valueById || 0,
                "talent_id": TicketCreation.talents.valueById || 0,
                "assigned_to": TicketCreation.assignedto.value || 0,
                "remarks": TicketCreation.remarks.value || "",
                "created_on": moment().format("YYYY-MM-DD"),
                "created_by": localStorage.getItem("empId"),

            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_RECRUITMENT_TICKET, payload: true })
                notification.success({
                    message: " Ticket Generated Successfully",
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const getRecruitmentTicket = (id) => async dispatch => {
    try {
        console.log(id, "groupName")
        axios({
            method: "POST",
            url: apiurl + "get_recruitment_ticket",
            data: {
                "ticket_id": id
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: GET_RECRUITMENT_TICKET, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

// update_ticket_status

export const updateTicketStatus = (id) => async dispatch => {
    try {
        // console.log(id, "groupName")
        axios({
            method: "POST",
            url: apiurl + "update_ticket_status",
            data: {
                "ticket_id": id,
                "closed_by": localStorage.getItem("empId")
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: UPDATE_TICKET_STATUS, payload: response.data.data })
                dispatch(getHrTaskList())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}