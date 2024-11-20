export const createRegister = () => {
    const myToken = "01aeec9c-9533-46c4-85e1-dfc449335c90"; // token ottenuto via mail 
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
                    "key": "01aeec9c-9533-46c4-85e1-dfc449335c90"
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
        const username = inputName.value;
        const password = inputPassword.value; 
        register(username,password);
        inputName.value="";
        inputPassword.value="";
        console.log("jbqdbks")
    };
  
    return {
        isLogged: () => isLogged 
    };
  };
  