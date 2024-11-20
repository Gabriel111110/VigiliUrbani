export const createLogin = () => {
  const myToken = "01aeec9c-9533-46c4-85e1-dfc449335c90"; // token ottenuto via mail 
  const inputName = document.querySelector("#name");
  const inputPassword = document.querySelector("#password");
  const loginButton = document.querySelector("#login");
  let isLogged = false;

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      fetch("http://ws.cipiaceinfo.it/credential/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "key": "01aeec9c-9533-46c4-85e1-dfc449335c90"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then(r => r.json())
        .then(r => {
          resolve(r.result);
        })
        .catch(reject);


    });
  };

  loginButton.onclick = () => {
    const username = inputName.value;
    const password = inputPassword.value; 
    login(username, password).then((result) => {
      if (result) {
        console.log(result)
        isLogged = true;

        document.querySelector("#aggiungiIncidente").classList.remove("hidden");
        document.querySelector("#aggiungiIncidente").classList.add("visibile");

      } else {
        document.querySelector("#aggiungiIncidente").classList.add("hidden");
        document.querySelector("#aggiungiIncidente").classList.remove("visibile");
      }
    });
    console.log("iapSD")
    inputName.value = "";
    inputPassword.value = "";
  };

  return {
    isLogged: () => { return isLogged } 
  };
};
