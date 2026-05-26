import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

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
            theme: "dark",
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
        if (form.site.length > 3 && form.username.length > 3 && password.username.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedArray = [...passwordArray, newPassword];
            setpasswordArray(updatedArray);
            setform({ site: "", username: "", password: "" });
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            toast('Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error: Password not saved!')
        }
    }

    const deletePassword = (deleteid) => {
        console.log("Deleteing password with id ", deleteid)
        let c = confirm("Do you really want to delete this password")
        if (c) {
            const updatedArray = passwordArray.filter((item) => item.id != deleteid);
            setpasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
        }
        toast('Password deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPassword = (editid) => {
        console.log("Editing password with id ", editid)
        setform(passwordArray.filter((item) => (item.id === editid))[0])
        const updatedArray = passwordArray.filter((item) => item.id != editid);
        setpasswordArray(updatedArray)
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
            <div className="p-2 md:p-0 md: mycontainer min-h-[82vh]">
                <div className="logo font-bold text-2xl text-center">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP/&gt;</span>
                </div>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className='text-black flex flex-col p-4 gap-4 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-5">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='username' />
                        <div className="relative flex">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-0.5 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} src="/icons/vis.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300 hover:cursor-pointer gap-2 border border-green-900'>
                        <span className="material-symbols-outlined">add_ad</span>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4 text-center'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center'>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
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
                                        <td className='py-1 border border-white text-center w-20'>
                                            <div className='flex justify-center items-center'>
                                                <div className="material-symbols-outlined cursor-pointer" onClick={() => { editPassword(item.id) }}>edit</div>
                                                <div className="material-symbols-outlined cursor-pointer" onClick={() => { deletePassword(item.id) }}>delete</div>
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
