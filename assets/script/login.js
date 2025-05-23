import auth from "./auth.js";
// import users from "./auth.js"

let form = document.forms['login'];

// form.ad
form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    for (const [name, value] of Object.entries(formValues)) {
        form[name].classList.remove('error')
        if (value == '') {
            auth.errorMessage(`Please fill ${name} input`)
            form[name].classList.add('error')
            form[name].focus()
            return;
        }
    }
    auth.login(formValues);
})
