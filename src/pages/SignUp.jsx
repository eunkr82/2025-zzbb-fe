import React, { useState, useMemo } from "react";
import axios from "axios";
import SubmitBtn from "../components/SubmitBtn";
import '../styles/Auth.css';

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    emailCode: "",
  });

  const isFormFilled = useMemo(() => Object.values(form).every(value => value.trim() != "", [form])) ;

  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]:value}));
  };

  const handleSendCode = async () => {
    if (!form.email.includes("@ewha.ac.kr") && !form.email.includes("@ewhain.net")) {
      alert("이화인 메일을 입력하세요.");
      return;
    }

    try{
        await axios.post('/user/join/verify', {email: form.email});
        setEmailSent(true);
        alert("인증 코드가 이메일로 전송되었습니다.");
    } catch (error) {
        console.error("Error Sending Code", error);
        alert("이메일 인증 요청 실패");
    }

  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('signup/verify', {email: form.email, code: form.emailCode});
        if (response.data.success) {
          setIsVerified(true);
        } else {
          alert("인증 코드가 일치하지 않습니다.");
        }
    } catch (error) {
        console.error("인증 코드 확인 오류", error);
        alert("인증 코드 확인에 실패했습니다.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
        alert("이메일 인증을 완료하세요.");
        return;
    }

    if (form.password !== form.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
      await axios.post("/user/join", {
        email: form.email,
        password: form.password,
      });
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }

  };

  return (
    <div className="container">
        <div className="content">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit} className="form">
            <p>이화인 메일</p>
            <div className="inputContainer">
              <input
                    type="text" 
                    name="emailCode"
                    placeholder="인증 코드 입력" 
                    value={form.emailCode} 
                    onChange={handleChange} 
                    className="input"
                    required />
                <button 
                    type="button" 
                    onClick={handleSendCode}
                    className="verifyBtn">
                    {isVerified ? "인증 완료" : "확인"}
                </button>
            </div>

            <p>비밀번호</p>
            <input 
                type="password" 
                name="password" 
                placeholder="비밀번호" 
                value={form.password} 
                onChange={handleChange}
                className="input"
                required />
            <input 
                type="password" 
                name="confirmPassword" 
                placeholder="비밀번호 확인" 
                value={form.confirmPassword} 
                onChange={handleChange}
                className="input"
                required />

            <SubmitBtn text="가입하기" isDisabled={!isFormFilled || !isVerified} onClick={handleSubmit}/>
        </form>
        </div>
    </div>
  );

};

export default SignUp;
