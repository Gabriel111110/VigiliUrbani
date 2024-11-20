export const createLogin = () => {
  const myToken = "5e78f06b-1635-4528-aec8-ebb4607134a8"; // token ottenuto via mail 
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
                  "key": myToken
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
      const username = inputName.value; // Ottiene il valore dall'input
      const password = inputPassword.value; // Ottiene il valore dall'input
      login(username, password).then((result) => {
          if (result) { 
            console.log(result)
              isLogged = true;
          }
      });
      console.log("iapSD")
      inputName.value="";
      inputPassword.value="";
  };

  return {
      isLogged: () =>{return isLogged }  // Espone una funzione per verificare lo stato di login
  };
};
