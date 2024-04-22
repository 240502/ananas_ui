import { useState } from 'react';
import '../../../assets/css/Shop/login.css';
import { login } from '../../../services/login.servies';
import { redirect, Navigate, useNavigate } from 'react-router-dom';
import { userState } from '../../../store/user.atom';
import { useRecoilState } from 'recoil';
function Login() {
    const [usename, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    async function handleLogin() {
        const res = await login({ UserName: usename, password: password });
        if (res) {
            setUser(res);
            localStorage.setItem('user', JSON.stringify(res));
            navigate('/');
        }
        console.log(user);
    }
    return (
        <div className="frame">
            <div className="container">
                <div className="row">
                    <div className="form-login">
                        <div className="login-wrap">
                            <div className="icon">
                                <span>
                                    <i className="fa-regular fa-user" />
                                </span>
                            </div>
                            <h3 className="title">Sign In</h3>
                            <form className="form">
                                <div className="form-item">
                                    <input
                                        type="text"
                                        id="email"
                                        className="email"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label htmlFor="">Username</label>
                                </div>
                                <div className="form-item">
                                    <input
                                        type="password"
                                        id="password"
                                        className="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="">Password</label>
                                </div>
                                <button type="button" id="btnLogin" className="btnLogin" onClick={handleLogin}>
                                    {' '}
                                    Login
                                </button>
                                <div className="form-group">
                                    <div className="item">
                                        <input type="checkbox" id="rememberBtn" />
                                        <label htmlFor="">Remember Me</label>
                                    </div>
                                    <div className="item">Forgot Password</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
