import axios from "axios"

function upload (path, userForm) { 
    // 因为userForm里面有file对象，所以需要用FormData传输
    const params = new FormData()

    for (let i in userForm) {
      params.append(i, userForm[i])
    }
    // console.log(params) // 虽然打印出来感觉是空的，但其实是有的
    return axios.post(path, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data)
}

export default upload