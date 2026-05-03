const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/apf-cohort-203",
  headers: {
    authorization: "fb15848b-5663-40d8-95ca-b42a7eae5a20",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

const request = (path, options = {}) => {
  return fetch(`${config.baseUrl}${path}`, {
    headers: config.headers,
    ...options,
  }).then(checkResponse);
};

export const getUserInfo = () => {
  return request("/users/me");
};

export const getCardList = () => {
  return request("/cards");
};

export const setUserInfo = ({ name, about }) => {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
};

export const setUserAvatar = (avatar) => {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  });
};

export const addNewCard = ({ name, link }) => {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
};

export const deleteCardFromServer = (cardId) => {
  return request(`/cards/${cardId}`, { method: "DELETE" });
};

export const changeLikeCardStatus = (cardId, isLiked) => {
  return request(`/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
  });
};
