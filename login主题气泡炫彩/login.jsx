import React,{useState} from 'react'
import './login.less'
function Login() {
  // 定义密码可见与不可见
  const [isShow,setIsShow]=useState(false)
  // 定义错误数据
  const [nameErr,setNameErr]=useState('')
  const [passwordErr,setPasswprdErr]=useState('')
  const [code,setCode]=useState('')
  // 定义value值
  const [nameValue,setNameValue]=useState('')
  const [passwordValue,setPasswordValue]=useState('')
  const [codeValue,setCodeValue]=useState('')
  // 表单提交事件
  document.onkeydown=useCallback((event)=>{
    if(event.keyCode===13 || event.shiftKey){
      login()
    }
  },[nameValue,passwordValue,codeValue])
  const submit=useCallback((event)=>{
    event.preventDefault()
    login()
  },[nameValue,passwordValue,codeValue])
  const login=useCallback(()=>{
    const isNameOk=nameBlur()
    const isPasswordOk=passwordBlur()
    const isCodeOk=codeBlur()
    if( isNameOk && isPasswordOk && isCodeOk){
      console.log(1,nameValue,passwordValue,codeValue)
    }
  },[nameValue,passwordValue,codeValue])
  // 给表单赋值
  const nameChange=(event)=>{
    setNameValue(event.target.value)
  }
  const passwordChange=(event)=>{
    setPasswordValue(event.target.value)
  }
  const codeChange=(event)=>{
    setCodeValue(event.target.value)
  }
  // 用户名验证
  const nameBlur=useCallback(()=>{
    const value=nameValue.replace(/\s+/g,"") // 去除空格
    if(value===''){
      setNameErr("名字不能为空")
      return false
    }else {
      // 表单名字验证规则
      const reg=/^[a-zA-Z][0-9a-zA-Z]*/
      if(reg.test(value)){
        setNameErr('')
        return true
      }else {
        setNameErr("必须以英文开头")
        return false
      }
    }
  },[nameValue])

  // 密码验证
  const passwordBlur=useCallback(()=>{
    const value=passwordValue.replace(/\s+/g,"") // 去除空格
    if(value===''){
      setPasswprdErr("密码不能为空")
      return false
    }else {
      // 表单密码验证规则
      const reg=/^[0-9a-zA-Z]{6,}/
      if(reg.test(value)){
        setPasswprdErr('')
        return true
      }else {
        setPasswprdErr("必须以是英文或数字，至少6位")
        return false
      }
    }
  },[passwordValue])
  // 验证码验证
  const codeBlur=useCallback(()=>{
    const value=codeValue.replace(/\s+/g,"") // 去除空格
    if(value===''){
      setCode('验证码不能为空')
    }else {
      setCode('')
      return true
    }
  },[codeValue])
  // 切换可见或不可见
  const showChange=useCallback(()=>{
    setIsShow(!isShow)
  },[isShow])
  return (
      <div className='login'>
        <section>

          <div className="color"/>
          <div className="color"/>
          <div className="color"/>
          <div className="box">

            <div className="circle" style={{'--x':'0'}}/>
            <div className="circle" style={{'--x':'1'}}/>
            <div className="circle" style={{'--x':'2'}}/>
            <div className="circle" style={{'--x':'3'}}/>
            <div className="circle" style={{'--x':'4'}}/>

            <div className="container">
              <div className="form">
                <h2>登录</h2>
                <form onSubmit={submit}>
                  <div className="inputBox">
                    <input type="text" placeholder="姓名" onBlur={nameBlur} value={nameValue} onChange={nameChange}/>
                    <p>{nameErr}</p>
                  </div>
                  <div className="inputBox">
                    <input type="password" placeholder="密码" onBlur={passwordBlur} autoComplete="on" value={passwordValue} onChange={passwordChange}/>
                    <p>{passwordErr}</p>

                  </div>
                  <div className="inputCode">
                    <input type="text" placeholder="验证码" onBlur={codeBlur} value={codeValue} onChange={codeChange}/>
                    <img
                        src="https://img0.baidu.com/it/u=3798217922,3880088897&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500"
                        style={{width:'70px',height:'40px',marginLeft:'20px',borderRadius:'7px'}}
                    />
                    <p>{code}</p>

                  </div>
                  <div className="inputBox">
                    <input type="submit" value="登录"/>

                  </div>
                  <p className="forget">忘记密码?<a href="#">
                    点击这里
                  </a></p>
                  <p className="forget">没有账户?<a href="#">
                    注册
                  </a></p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}
export default Login
