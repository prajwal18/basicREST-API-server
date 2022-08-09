//All users
let url = window.location.href;
//Getting all the dom nodes needed
const userListTable = document.getElementById('user-list-table-body');
const singleUserTable = document.getElementById('single-user-table-body');
const userFooter = document.getElementById('user-footer');
const createForm = document.getElementById('create-user-form');
const editForm = document.getElementById('edit-user-form');
const deleteUserBtn = document.getElementById('delete-btn')

const wrapper = (fn) => {
    return async(param1, param2) =>{
        try{
            await fn(param1, param2);
        } catch(error) {
            console.log('Why is it not working');
            window.location.href = "404.html"
        }
    }
}


//Only execute this function when the user is on /users
const renderAllUsers = wrapper(async() => {
    const data = await axios.get('/api/v1/users').then(response => response.data);
    let allUserData = '';
    data.map(user => {
        allUserData += `<tr><td>${user.name}</td><td>${user.email}</td><td><a href ="/users/${user._id}">${user._id}</a></td></tr>`;
    });
    userListTable.innerHTML = allUserData;
})


//Only execute to get the details of a specific user
const renderAUser = wrapper(async (path) => {
    const data = await axios.get(path).then(response => response.data);
    let userData = `<tr><td>${data.name}</td><td>${data._id}</td><td>${data.email}</td><td>${data.password}</td></tr>`;
    let userModification = `<p><a href="/edit-user/${data._id}">Edit User</a></p>`;
    const holder = document.createElement('div');
    holder.innerHTML = userModification;
    singleUserTable.innerHTML = userData;
    userFooter.appendChild(holder);
})


//Only execute this function when the user is on /create-user
const createUser = wrapper(async () => {
    const body = Array.from(document.querySelectorAll('#create-user-form div input'))
                        .reduce((obj, prop) => {
                            return {
                                ...obj,
                                [prop.name]: prop.value
                            }
                        }, {});

    await axios.post('/api/v1/users', body);
    window.location.href = "allUsers.html"
})


//Only execute this function when the user is on /edit-user
const editUser = wrapper(async (path) => {
    const body = Array.from(document.querySelectorAll('#edit-user-form div input'))
                        .reduce((obj, prop) => {
                            return {
                                ...obj,
                                [prop.name]: prop.value
                            }
                        }, {});

    await axios.patch(path, body);
})
const populateEditForm = wrapper(async (path) => {
    const {name, email, password} = await axios.get(path).then(response => response.data);
    Array.from(document.querySelectorAll('#edit-user-form div input'))
    .forEach(item => {
        if(item.name === 'name'){
            item.value = name
        }
        if(item.name === 'email'){
            item.value = email
        }
        if(item.name === 'password'){
            item.value = password
        }
    })
})


//Only execute this funtion when the user is deleting a user
const deleteUser = wrapper(async (path) => {
    await axios.delete(path);
    window.location.href = "allUsers.html";
})


//Helper function to normalize url query
const getNormalizedQuery = () => {
    const query = url.split('?')[1];
    console.log(query)
    if(!query) return null;
    const queryObj = {}
    query.split('&').forEach(item => {
        const [key, value] = item.split("=");
        queryObj[key] = value;
    });
    return queryObj;
}


//Executing function based on which route the user is on
if(document.title === 'User Manager | User'){
    const urlQuery = getNormalizedQuery();
    renderAUser(`/api/v1/users/${urlQuery.id}`);

    deleteUserBtn.addEventListener('click', async () => {
        await axios.delete(`/api/v1/users/${urlQuery.id}`)
        window.location.href = "allUsers.html"
    })
}


if(document.title === 'User Manager | All Users'){
    renderAllUsers();
}


if(document.title === 'User Manager | Create'){
    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createUser();
    })
}


if(document.title === 'User Manager | Edit'){
    const urlQuery = getNormalizedQuery();
    populateEditForm(`/api/v1/users/${urlQuery.id}`)
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editUser(`/api/v1/users/${urlQuery.id}`);
        window.location.href = `/users/${urlQuery.id}`
    })
    
}
