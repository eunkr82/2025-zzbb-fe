import React, { useState } from 'react';
import { Link

 } from 'react-router-dom';
const Login = () => {
    const [form, setForm] = useState({email: "", pwd: ""});

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("입력 정보:", form);
    }

    return (
        <div className="container">
            <div className="content">
                <section className="loginEmail">
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
                        type="pwd"
                        name="pwd"
                        placeholder="password"
                        value={form.pwd}
                        onChange={handleChange}
                        className="input"
                        />
                        <button type="submit" className="button">시작하기</button>
                    </form>
                </section>
                <section>
                    <p>비밀번호를 잊으셨나요?</p>
                </section>
                <section>
                    <p>계정이 없으신가요?</p>
                    <Link to ='/signup'> <p>회원가입</p> </Link>
                </section>
            </div>
        </div>

    );
};

export default Login;