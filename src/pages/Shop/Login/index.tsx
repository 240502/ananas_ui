import { useState } from 'react';
import '../../../assets/css/Shop/login.css';
import { login } from '../../../services/login.servies';
import { redirect, Navigate, useNavigate } from 'react-router-dom';
import { userState } from '../../../store/user.atom';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin() {
        try {
            const res = await login({ UserName: username, password: password });

            if (res) {
                toast.success('Đăng nhập thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setUser(res);
                localStorage.setItem('user', JSON.stringify(res));
                navigate('/');
            } else {
                toast.error('Đăng nhập không thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (err) {
            toast.error('Đăng nhập không thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
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
                                        type={showPassword === true ? 'text' : 'password'}
                                        id="password"
                                        className="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="">Password</label>
                                    <i
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '5%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        className={
                                            showPassword === true ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
                                        }
                                    ></i>
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
