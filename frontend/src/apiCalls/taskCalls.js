const serverUrl = "http://localhost:8080";
var jwt;
if (typeof window == "undefined" || !localStorage.getItem("jwt"))
  jwt.token = "";
else jwt = JSON.parse(localStorage.getItem("jwt"));

export const createTask = async (data) => {
  return await fetch(`${serverUrl}/create-task`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchTasks = async () => {
  return await fetch(`${serverUrl}/fetchTasks`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTask = async (taskId) => {
  return await fetch(
    `${serverUrl}/deleteTask?` + new URLSearchParams({ taskId: taskId }),
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTask = async (data, taskId) => {
  return await fetch(
    `${serverUrl}/updateTask?` + new URLSearchParams({ taskId: taskId }),
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
