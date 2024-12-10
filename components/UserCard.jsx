import Link from "next/link";

const UserCard = ({uid, name, uname, email})=><article className="user card reasonable_padding">
        <span>
            <i className="listNum">{uid}</i>&nbsp;
            <h2><Link href={`/${uid}`}>{name}</Link></h2>
            &nbsp;<i className="username">({uname})</i>
        </span>
        <span className="email">{email}</span>
    </article>;
export default UserCard;