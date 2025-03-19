"use client";

const { default: axios } = require("axios");

function yyy(fixed){
    const a = [...document.querySelectorAll("input")].filter(e => e.value.length > 0).reduce((pv, cv) => {
        pv[cv.id] = cv.value;
        return pv;
    }, { ...fixed });
    console.log(a)
    return a;
}

const SubmitPut = ({uri, fixed})=>{
    return <span className="fakeSubmit" onClick={e => axios.patch(uri, yyy(fixed)).then(()=>console.log("true"))}>Update</span>
};
module.exports = SubmitPut;