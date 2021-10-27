import API from './API';
const controller = `user`;

export const Leaderboard = {
    List,
    Create,
    UpdateById,
    Delete,
};
function List() {
    return API.get(`${controller}/get`).then(response => {
        return response;
    }, error => {
    });
}

async function Create(body) {
    return API.post(`${controller}/create`, body).then(response => {
        return response;
    }, error => {
    });
}

async function Delete(id) {
    return API.delete(`${controller}/delete/${id}`).then(response => {
        return response.data;
    }, error => {
    });
}
function UpdateById(payload) {
    return API.put(`${controller}/UpdateById`, payload).then(response => {
        return response;
    }, error => {
    });
}