import React, { useState } from "react";
import axios from "axios";


const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    emailCode: "",
  });

  const [emailExists, setEmailExists] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showNull, setShowNull] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendCode = async e => {
    e.preventDefault();
    try{
        await axios.post('/user/join/verify', {email: form.email});
        alert("인증 코드가 이메일로 전송되었습니다.");
    } catch (error) {
        console.error("Error Sending Code", error);
    }

  }

  const handleVerifyCode = async e => {
    e.preventDefault();
    try {
        await axios.post('signup/verify', {email: form.email, code: form.emailCode});
        alert("인증 코드가 확인되었습니다.");
    } catch (error) {
        console.error("Error Verifying Code", error);
        alert("인증 코드가 일치하지 않습니다.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.email === '' || form.password === '' || form.confirmPassword === ''){
        alert("모든 필드를 입력하세요.");
        return;
    }

    if (!emailVerified) {
        alert("이메일 인증을 완료하세요.");
        return;
    }

    if (form.password !== form.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
      } else {
        alert("회원가입 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className="container">
        <div className="content">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                name="email" 
                placeholder="이화인 메일" 
                value={form.email} 
                onChange={handleChange} 
                required />
            <button 
                type="button" 
                onClick={handleSendCode}>
                이메일 인증
            </button>

            <input
                type="text" 
                name="emailCode" 
                placeholder="인증 코드 입력" 
                value={form.emailCode} 
                onChange={handleChange} 
                required />
            <button 
                type="button" 
                onClick={handleVerifyCode}>
                확인
            </button>

            <input 
                type="password" 
                name="password" 
                placeholder="비밀번호" 
                value={form.password} 
                onChange={handleChange}
                required />
            <input 
                type="password" 
                name="confirmPassword" 
                placeholder="비밀번호 확인" 
                value={form.confirmPassword} 
                onChange={handleChange}
                required />

            <button type="submit">가입하기</button>
        </form>
        </div>
    </div>
  );
};

export default SignUp;
