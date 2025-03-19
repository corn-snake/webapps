"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListenRoute = () => {
    const pn = usePathname(),
        r = useRouter(),
        [ch, sCh] = useState([pn]);
    useEffect(()=>{
        if(pn == ch.at(-2)) {
            r.refresh();
            sCh(p=>p.slice(0, -2));
        } else {
            sCh(p=>[...p, pn])
        }
    },[pn]);
};

export default ListenRoute;