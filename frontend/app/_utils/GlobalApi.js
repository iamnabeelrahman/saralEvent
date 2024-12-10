const {default: axios} = require("axios")

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api'
})


const getCategory = () => axiosClient.get('/categories?populate=*')

const getCategoryList = () => axiosClient.get('/categories?populate=*').then(res => { return res.data.data})

const getSlider =() => axiosClient.get('/sliders?populate=*').then(res =>  res.data.data)

const getAllEvent = () => axiosClient.get('/events?populate=*').then(res => {return res.data.data})

const getEventsByCategory = (category) => axiosClient.get('/events?filters[categories][name][$in]=' + category + "&populate=*").then(res=>{ return res.data.data})

const createUser =(username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
});

const SignIn = (email, password) => axiosClient.post('/auth/local', {
    identifier:email,
    password:password
})

export default{
    getCategory,
    getSlider,
    getCategoryList,
    getAllEvent,
    getEventsByCategory,
    createUser,
    SignIn
}