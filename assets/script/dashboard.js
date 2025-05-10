import auth from "./auth.js";

let user = auth.middelware();

document.getElementById('userName').innerText = user.user.first_name;