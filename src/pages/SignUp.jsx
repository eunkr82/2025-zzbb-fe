import React, { useState, useMemo } from "react";
import api from "../axios/Api";
import SubmitBtn from "../components/SubmitBtn";
import { ReactComponent as ZZBB } from "../assets/ZZBB.svg";
import styles from "../styles/Auth.module.css";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    emailCode: "",
  });

  const isFormFilled = useMemo(() => Object.values(form).every(value => value.trim() != "", [form])) ;

  const [status, setStatus] = useState ({
    emailSent: false,
    isVerified: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({...prev, [name]:value}));
  };

  const handleSendCode = async () => {
    if (!(form.email.includes("@ewha.ac.kr") || form.email.includes("@ewhain.net"))) {
      alert("이화 메일을 입력하세요.");
      return;
    }

    try{
        await api.post('/user/join/verify', {email: form.email});
        setStatus((prev) => ({...prev, emailSent : true}));
        alert("인증 코드가 이메일로 전송되었습니다.");
    } catch (error) {
        console.error("Error Sending Code", error);
        alert("이메일 인증 요청 실패");
    }

  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post('/signup/verify', {email: form.email, code: form.emailCode});
        if (response.data.success) {
          setStatus((prev) => ({...prev, isVerified: true}));
          alert("인증이 완료되었습니다.");
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

    if (!status.isVerified) {
        alert("이메일 인증을 완료하세요.");
        return;
    }

    if (form.password !== form.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
      await api.post("/user/join", {
        email: form.email,
        password: form.password,
      });
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("회원가입 오류", error);
      alert("회원가입에 실패했습니다.");
    }

  };

  return (
    <div className="container">
        <div className={styles.content}>
          <h1>ZZBB</h1>
          <div style={{display: "flex", justifyContent:"center", marginTop: "20px", marginBottom: "30px"}}>
            <ZZBB/>
          </div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <p>이메일</p>
            <div className={styles.inputContainer}>
              <input 
                  type="email"
                  name="email"
                  placeholder="학교 이메일"
                  value={form.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  disabled={status.emailSent} />
              <button 
                  type="button" 
                  onClick={handleSendCode}
                  className={styles.verifyBtn}
                  disabled={!status.emailSent}>
                  {status.emailSent ? "전송됨" : "전송"}
              </button>
            </div>
            <div className={styles.inputContainer}>
              <input
                    type="text" 
                    name="emailCode"
                    placeholder="인증 코드 입력" 
                    value={form.emailCode} 
                    onChange={handleChange} 
                    className={styles.input}
                    required
                    disabled={status.isVerified} />
                <button 
                    type="button" 
                    onClick={handleVerifyCode}
                    className={styles.verifyBtn}
                    disabled={!status.emailSent || !status.isVerified}>
                    {status.isVerified ? "인증완료" : "확인"}
                </button>
            </div>

            <p>비밀번호</p>
            <input 
                type="password" 
                name="password" 
                placeholder="비밀번호" 
                value={form.password} 
                onChange={handleChange}
                className={styles.input}
                required />
            <input 
                type="password" 
                name="confirmPassword" 
                placeholder="비밀번호 확인" 
                value={form.confirmPassword} 
                onChange={handleChange}
                className={styles.input}
                required />

            <SubmitBtn text="가입하기" isDisabled={!isFormFilled || !status.isVerified} onClick={handleSubmit}/>
        </form>
        </div>
    </div>
  );

};

export default SignUp;
