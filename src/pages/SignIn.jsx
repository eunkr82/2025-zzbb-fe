import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ZZBB } from '../assets/ZZBB.svg';
import api from '../axios/Api';
import SubmitBtn from '../components/SubmitBtn';
import '../styles/Auth.css';

const SignIn = ({ setUser }) => {
    const [form, setForm] = useState({username: "", password: ""});
    const isFormFilled = useMemo(() => Object.values(form).every(value => value.trim() !== "", [form.username, form.password])) ;
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]:value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username.includes("@ewha.ac.kr") && !form.username.includes("@ewhain.net")) {
            alert("이화인 메일을 입력하세요.");
            return;
        }

        try {
            const response = await api.post('/user/login', form);

            if(response.status === 200){
                const { accessToken, refreshToken, user } = response.data.data;
                
                console.log("로그인 응답 데이터:", response.data);
                console.log("data 객체:", response.data.data);

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                setUser(user); 
                navigate("/main");
            } else {
                console.log("자동 로그인 실패: ", response.status);
                alert("자동 로그인에 실패했습니다.");
            }
        } 
        catch (error) {
                console.error("로그인 실패", error);
                alert("로그인에 실패했습니다.");
        }
    };

    return (
        <div className="container">
            <div className="content">
                <div style={{display: "flex", justifyContent:"center", margin: "50px 0px"}}>
                    <ZZBB/>
                </div>
                <section className="form">
                    <form onSubmit={handleSubmit}>
                        <p>이메일</p>
                        <input
                        type="username"
                        name="username"
                        placeholder="username"
                        value={form.username}
                        onChange={handleChange}
                        className="input"
                        />
                        <p>비밀번호</p>
                        <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                        className="input"
                        />
                        <SubmitBtn text="시작하기" isDisabled={!isFormFilled} onClick={handleSubmit}/>
                    </form>
                </section>
                <section className='extraInfo'>
                    <p>계정이 없으신가요?</p>
                    <Link 
                        to ='/signup'
                        style={{color: "#000", }}> 
                        <p>회원가입</p> 
                    </Link>
                </section>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p>가입시 이용약관 및 개인정보 처리방침에 동의하게 됩니다.</p>
                </div>
            </div>
        </div>

    );
};

export default SignIn;