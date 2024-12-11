"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { sha512 } from "/public/sha512";

const LogIn = ()=>{
    const [li, sLi] = useState(false),
        r = useRouter();
    useEffect(()=>{ //
        if (li) r.push("/");
    }, [li]);
    return <form className="login_form">
        <input type="text" name="usr" placeholder="Username" id="usr_login" minLength={5}/>
        <input type="password" name="pwd" placeholder="Password" id="pw_login" minLength={7}/>
        <span className="fakeSubmit" onClick={()=>axios.post("http://localhost:8080/api/login", {uname: document.getElementById("usr_login").value, pw: sha512(document.getElementById("pw_login").value)}).then(d=>{
            console.log(d.headers);
            sLi(d.data);
        })}>Log In</span>
    </form>
};
export default LogIn;