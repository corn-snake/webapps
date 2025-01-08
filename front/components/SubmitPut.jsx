"use client";

const { default: axios } = require("axios");

const SubmitPut = ({uri, fixed})=>{
    return <span className="fakeSubmit" onClick={e => axios.patch(uri, [...document.querySelectorAll("input")].filter(e=>e.value.length > 0).reduce((pv, cv) => {
        pv[cv.id] = cv.value;
        return pv;
    }, {...fixed})).then(()=>console.log("true"))}>Update</span>
};
module.exports = SubmitPut;