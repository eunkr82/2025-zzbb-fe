import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ZZBB } from '../assets/ZZBB.svg';
import axios from 'axios';
import SubmitBtn from '../components/SubmitBtn';
import '../styles/Auth.css';

const SignIn = ({ setUser }) => {
    const [form, setForm] = useState({email: "", password: ""});
    const isFormFilled = useMemo(() => Object.values(form).every(value => value.trim() != "", [form])) ;
    
    const navigate = useNavigate();

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if(storeUser) {
            setUser(JSON.parse(storeUser));
            navigate('/main');
        }
    }, [setUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevFrom => ({
            ...prevFrom,
            [name]:value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.includes("@ewha.ac.kr") && !form.email.includes("@ewhain.net")) {
            alert("이화인 메일을 입력하세요.");
            return;
        }

        try {
            const response = await axios.post('/', form);
            console.log(response);

            if(response.status === 200){
                const userData = response.data;
                localStorage.setItem('user', JSON.stringify(userData));
                sessionStorage.setItem('userId', userData.userId);
                setUser(userData);
                navigate('/main');
            } else {
                console.log("자동 로그인 실패");
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
                        type="email"
                        name="email"
                        placeholder="email"
                        value={form.email}
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