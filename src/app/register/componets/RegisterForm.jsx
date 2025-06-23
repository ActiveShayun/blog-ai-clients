'use client'
import React from 'react';

const RegisterForm = () => {
    const handleRegister = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ name, email, password });
    }
    return (
        <div>
            <div className="hero bg-base-200 max-w-xl  mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="card bg-base-100 w-full shadow-2xl">
                        <div className="card-body w-full ">
                            <form onSubmit={handleRegister}>
                                <fieldset className="fieldset w-full">
                                    <label className="label">Name</label>
                                    <input type="text"
                                        name='name'
                                        className="input w-full"
                                        placeholder="Name" />
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
                                    <button className="btn btn-neutral mt-4">Sign up</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;