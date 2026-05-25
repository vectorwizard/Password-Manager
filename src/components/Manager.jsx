import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("/icons/non-vis.png")) {
            ref.current.src = "/icons/vis.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/icons/non-vis.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
    }
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="mycontainer">
                <div className="logo font-bold text-2xl text-center">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP/&gt;</span>
                </div>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className='text-black flex flex-col p-4 gap-4 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='' />
                    <div className="flex w-full justify-between gap-5">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='' />
                        <div className="relative flex">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='' />
                            <span className='absolute right-0.5 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} src="/icons/vis.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300 hover:cursor-pointer gap-2 border border-green-900'>
                        <span className="material-symbols-outlined">add_ad</span>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4 text-center'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center'>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-1 border border-white text-center flex items-center justify-between px-2'><a href={item.site} target='_blank'>{item.site}</a>
                                            <span className="material-symbols-outlined cursor-pointer" onClick={() => { copyText(item.site) }}>content_copy</span>
                                        </td>
                                        <td className='py-1 border border-white text-center w-50'>
                                            <div className='flex items-center justify-between px-2'>
                                                <div>{item.username}</div>
                                                <div className="material-symbols-outlined cursor-pointer" onClick={() => { copyText(item.username) }}>content_copy</div>
                                            </div>
                                        </td>
                                        <td className='py-1 border border-white text-center w-50'>
                                            <div className='flex items-center justify-between px-2'>
                                                <div>{item.password}</div>
                                                <div className="material-symbols-outlined cursor-pointer" onClick={() => { copyText(item.password) }}>content_copy</div>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default manager
