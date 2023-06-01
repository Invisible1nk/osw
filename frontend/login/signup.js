
// 휴대폰 인증 토큰 전송하기
// const getValidationNumber = async () => {
//   document.querySelector('#ValidationInputWrapper').style.display = 'flex'
//   console.log('인증 번호 전송')
// }

// // 핸드폰 인증 완료 API 요청
// const submitToken = async () => {
//   console.log('핸드폰 인증 완료')
// }

//import {CloseModal} from "./index.js"
// 회원 가입 API 요청
const submitSignup = async (req,res) => {
  
  const phone1 = document.getElementById("PhoneNumber01").value
  const phone2 = document.getElementById("PhoneNumber02").value
  const phone3 = document.getElementById("PhoneNumber03").value
  const phone = `${phone1}${phone2}${phone3}`
  const id = document.getElementById("SignupId").value
  const pwd = document.getElementById("SignupPwd").value
  const email = document.getElementById("SignupEmail").value
  
  if(phone1 == "" || phone2 == "" || phone3 == "" ||
    id == "" || pwd == "" || email == ""){
      alert('모든 정보를 입력하여야 합니다!');
      return
    }
  axios.post('http://localhost:3000/user',{
    id: id,
    pwd: pwd,
    email: email,
    phone: phone
  }).then(result =>{
    console.log(result)
    if(result.status==500 || result.data==false){
    alert('이미존재하는 아이디입니다.!'); window.location.href='http://127.0.0.1:5500/WEB_PROJECT/frontend/login/login.html'; 
    }
    else if(result.status==200){
      alert('회원가입 성공하였습니다.');window.location.href='http://127.0.0.1:5500/WEB_PROJECT/frontend/login/login.html'; 
    }
    
  })
}
