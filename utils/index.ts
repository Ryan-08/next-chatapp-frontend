import axios from "axios";
import makeToast from "./toaster";

export const registerUser = (name: string, email: string, password: string) => {
  const result = axios
    .post("http://localhost:8000/user/register", {
      name,
      email,
      password,
    })
    .then((response) => {
      makeToast("success", response.data.message);
      return true;
    })
    .catch((error) => {
      makeToast("error", error.response.data.message);
      return false;
    });

  return result;
};
export const loginUser = (email: string, password: string) => {
  const result = axios
    .post("http://localhost:8000/user/login", {
      email,
      password,
    })
    .then((response) => {
      makeToast("success", response.data.message);
      localStorage.setItem("CC_token", response.data.token);
      return true;
    })
    .catch((error) => {
      makeToast("error", error.response.data.message);
      return false;
    });

  return result;
};
export const createChatroom = (name: string) => {
  const result = axios
    .post(
      "http://localhost:8000/chatroom",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("CC_token")}`,
        },
      }
    )
    .then((response) => {
      makeToast("success", response.data.message);
      return true;
    })
    .catch((error) => {
      makeToast("error", error.response.data.message);
      return false;
    });

  return result;
};

export const getChatrooms = () => {
  const result = axios
    .get("http://localhost:8000/chatroom", {
      headers: { Authorization: `Bearer ${localStorage.getItem("CC_token")}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      setTimeout(getChatrooms, 3000);
    });

  return result;
};
export const getMessages = async (id: any) => {
  const apiUrl = `http://localhost:8000/message/${id}`;
  const result = await axios
    .get(apiUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem("CC_token")}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      setTimeout(getChatrooms, 3000);
    });

  return result;
};
