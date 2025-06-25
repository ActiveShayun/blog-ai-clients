'use client'
import React from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter()
    const handleLogin = async (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
        const user = { email, password }
        console.log(user)
        try {
            const res = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
                redirect: false
            })
            console.log('respones', res);
            if (res.ok) {
                router.push("/")
            } else {
                alert('login failed')
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="hero bg-base-200 max-w-xl  mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="card bg-base-100 w-full shadow-2xl">
                        <div className="card-body w-full ">
                            <form onSubmit={handleLogin}>
                                <fieldset className="fieldset w-full">
                                    <label className="label">Email</label>
                                    <input type="email"
                                        name='email'
                                        className="input w-full"
                                        placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password"
                                        name='password'
                                        className="input w-full"
                                        placeholder="Password" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button type='submit' className="btn btn-neutral mt-4">Sign up</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;