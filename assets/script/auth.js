var localUsers = localStorage.getItem("users"),
    users = [];
if (!localUsers) {
    fetch("../../standard/users.json").then(e => e.json()).then(e => {
        localStorage.setItem("users", JSON.stringify(e))
        users = e;
    })
} else {
    users = JSON.parse(localUsers);
}

var auth = {
    showMessage: (msg, classs) => {
        let e_elemet = document.querySelector('div.message'), element;
        if (!e_elemet) {
            element = document.createElement('div')

            document.body.appendChild(element);
        } else {
            element = e_elemet;
        }
        let p = document.createElement('p');
        element.appendChild(p);
        element.classList.add('message')
        p.classList.add(classs)

        p.innerText = msg;
        setTimeout(_ => {
            p.style.opacity = 0;
            setTimeout(x => {
                p.remove()
            }, 300)
        }, 4000)

        p.addEventListener('click', _ => {
            _.currentTarget.remove()
        })
    },
    errorMessage: msg => {
        auth.showMessage(msg, 'error_message')
    },
    successMessage: msg => {
        auth.showMessage(msg, 'success_message')
    },
    signup: (data) => {
        let user = users.filter(e => e.email == data.email);
        if (user.length > 0) {
            auth.errorMessage('this mail is already taken')
        } else {
            data.id = users.length + 1;
            users.push(data)
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("user", JSON.stringify(data))
            localStorage.setItem("id", data.id)
            auth.successMessage('You have signed up')
            location.href = 'dashboard.html';
        }
    },
    login: (data) => {
        let user = users.filter(e => e.email == data.email)[0];
        if (user) {
            if (user.password == data.password) {
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("id", user.id)
                auth.successMessage('Welcome')
                location.href = 'dashboard.html';
            } else {
                auth.errorMessage('wrong password')
            }
        } else {
            auth.errorMessage('User not found')
        }
    },
    middelware: () => {
        let user = localStorage.getItem('user'),
            id = localStorage.getItem('id');
        if (user && id) {
            return {
                id: id,
                user: JSON.parse(user)
            }
        } else {
            location.href = 'login.html';
        }
    },
    uploadAvatar: (url) => {
        let user = users.filter(e => e.id == localStorage.getItem('id'))[0],
            index = users.indexOf(user);
        user.avatar = url;
        localStorage.setItem('user', JSON.stringify(user));
        users[index] = user;
        localStorage.setItem("users", JSON.stringify(users))
    },
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        location.href = 'login.html';
    }
}
export default auth;