export const userId = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).data[0][0].user_id
