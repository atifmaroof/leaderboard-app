import { toast } from "react-toastify"

export const Toast = {
    Success,
    Error,
    Add,
    Update,
    Get,
    APIError,
};

function Success(response) {
    toast.success(response, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

}
function Error(response) {
    toast.error(response, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

}

function Get(response) {
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    else {
        return {};
    }
}
function Add(response) {
    if (response.data.statusCode === 200) {
        toast.success("Data adding", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return response.data.data;
    }
    else {
        toast.error("Something went wrong. Please try again", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}
function Update(response) {
    if (response.data.statusCode === 200) {
        toast.success("Data updating", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return response;
    }
    else {
        toast.error("Something went wrong. Please try again", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}

function APIError(response) {
    toast.error("Something went wrong. Please try again", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}
