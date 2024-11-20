export const createRegister = () => {
    const myToken = "5e78f06b-1635-4528-aec8-ebb4607134a8"; // token ottenuto via mail 
    const inputName = document.querySelector("#nameR");
    const inputPassword = document.querySelector("#passwordR");
    const registerButton = document.querySelector("#register");
    let isLogged = false;
  
    const register = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch("http://ws.cipiaceinfo.it/credential/register", { 
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
                resolve(r)
                console.log(r+"registrato")
            })
            .catch(reject);
        });
    };
  
    registerButton.onclick = () => {
        const username = inputName.value; // Ottiene il valore dall'input
        const password = inputPassword.value; // Ottiene il valore dall'input
        register(username,password);
        inputName.value="";
        inputPassword.value="";
        console.log("jbqdbks")
    };
  
    return {
        isLogged: () => isLogged // Espone una funzione per verificare lo stato di login
    };
  };
  