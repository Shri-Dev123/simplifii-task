import { useState } from "react";
import loginImage from "../assets/images/Login_Image.jpg";
import logo from "../assets/images/logo.png";
const LoginPageUi = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [generatedOTP, setGeneratedOTP] = useState("");

    const handleGenerateOTP = async () => {
        const generateOtpEndpoint =
            "https://be-infollion.vercel.app/api/v1/users/generate-otp";

        const requestBody = {
            username: userName,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        };

        try {
            const response = await fetch(generateOtpEndpoint, requestOptions);
            const data = await response.json();

            if (response.ok) {
                console.log("Generated OTP:", data);
                setGeneratedOTP(data.otp);
            } else {
                console.error("OTP generation failed:", data.error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleLogin = async () => {
        const loginEndpoint =
            "https://be-infollion.vercel.app/api/v1/users/login";

        if (password.length >= 8) {
            const requestBody = {
                username: userName,
                password: password,
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            };

            try {
                const response = await fetch(loginEndpoint, requestOptions);
                const data = await response.json();

                if (response.ok) {
                    console.log("Login successful:", data);
                } else {
                    console.error("Login failed:", data.error);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        } else {
            const verifyOtpEndpoint =
                "https://be-infollion.vercel.app/api/v1/users/verify-otp";

            const requestBody = {
                username: userName,
                otp: generatedOTP,
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            };

            try {
                const response = await fetch(verifyOtpEndpoint, requestOptions);
                const data = await response.json();

                if (response.ok) {
                    console.log("Login with OTP successful:", data);
                } else {
                    console.error("Login with OTP failed:", data.error);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        }
    };

    return (
        <>
            <div className="flex flex-row">
                <img src={loginImage} alt="loginImage" />
                <div className="flex mt-5 flex-col gap-8 items-center justify-items-right ml-64">
                    <img className="mt-10" src={logo} alt="logo" />
                    <h1 className="">Login to Dashboard</h1>
                    <input
                        className="bg-slate-100 w-96 p-3 rounded-full mr-0.5"
                        type="email"
                        placeholder="Email/Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        className="bg-slate-100 w-96 p-3 rounded-full mr-0.5"
                        type="password"
                        placeholder="Password/OTP"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-96 p-3 rounded-full mr-0.5 bg-orange-400 text-white"
                        onClick={handleLogin}
                    >
                        Log in
                    </button>
                    <h1>OR</h1>
                    <button
                        className="w-96 p-3 rounded-full mr-0.5 bg-slate-100"
                        onClick={handleGenerateOTP}
                    >
                        Log in with OTP
                    </button>
                    <h1>Or Log in with</h1>
                </div>
            </div>
        </>
    );
};

export default LoginPageUi;
