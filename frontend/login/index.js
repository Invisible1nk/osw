
const OpenModal = () => {
  let ModalBackground = document.getElementById('ModalContainer')
  let Modal = document.getElementById('SignupModalWrapper')
  ModalBackground.style.display = 'flex'
  Modal.style.display = 'flex'
}
const CloseModal = () => {
  let ModalBackground = document.getElementById('ModalContainer')
  let Modal = document.getElementById('SignupModalWrapper')
  Modal.style.display = 'none'
  ModalBackground.style.display = 'none'
}
const Login = async (req,res) =>{
  const id = document.getElementById('id').value

  console.log(id)
  console.log(1234)
  
    axios.post('http://localhost:3000/login',{
      userId : id,
      userPwd : document.getElementById('pass').value
    }).then(result =>{
      if(result.data==true){
        //모든 페이지에 쿠키생성
        document.cookie = `loginData=${id}; path=/`
        window.location.reload()
        window.location.href='http://127.0.0.1:5500/WEB_PROJECT/frontend/login/login.html';
      }
    })
  }

const LogOut = async(req,res) =>{
  var cookieValue = await decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)loginData\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
  
  axios.post('http://localhost:3000/Logout',{
      id:cookieValue
  }).then(result =>{
      if(result.data == true){
        document.cookie = "loginData=; path=/;";
        window.location.reload()
        window.location.href='http://127.0.0.1:5500/WEB_PROJECT/frontend/login/login.html';
      }
  })

}


const CheckLogin = async() => {
  var cookieValue = await decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)loginData\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
  console.log(cookieValue)
  
  if(cookieValue){
    const liElement1 = document.createElement('div')
    liElement1.innerText=`WELCOME! ${cookieValue}`
    const liElement2 = document.createElement('div')
    const a = document.createElement('a')
    a.innerText="LogOut"
    a.href = "javascript:LogOut();"
    liElement2.appendChild(a)
    document.getElementById('log').append(liElement1)
    document.getElementById('log').append(liElement2)
  }
  else{
      const div = document.createElement('div')
      const div2 = document.createElement('div')
      const input_name = document.createElement('input')
      const input_pwd = document.createElement('input')
      const button = document.createElement('button')
      const span = document.createElement('span')

      div.appendChild(input_name)
      div.appendChild(input_pwd)
      div.appendChild(button)
      div2.appendChild(span)

      input_name.setAttribute("type","text")
      input_name.setAttribute("id","id")
      input_name.setAttribute("placeholder","Id")
      input_pwd.setAttribute("type","password")
      input_pwd.setAttribute("id","pass")
      input_pwd.setAttribute("placeholder","Password")
      button.setAttribute("class","Lgbtn")
      button.setAttribute("type","submit")
      button.setAttribute("onclick","Login()")
      button.setAttribute("value","Login")
      button.innerText="login"
      span.setAttribute("class","SignupButton")
      span.setAttribute("onclick","OpenModal()")
      span.innerText="SIGN UP"
      document.getElementById('log').append(div)
      document.getElementById('log').append(div2)
  }
}

const addGame = async()=>{

}


