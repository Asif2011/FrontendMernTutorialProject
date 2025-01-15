import { NavLink } from "react-router-dom";
import styles from './navBar.module.css'
import { useSelector } from "react-redux";
import { signout } from "../api/internal";
import { resetUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

function NavBar() {
    let isAuth = useSelector((state) => state.user.auth)
    let name = useSelector((state) => state.user.name)
    let dispatch = useDispatch()

    const handleSignout = async () => {

        await signout();
        dispatch(resetUser());

    }

    return (
        <>
            <div className={styles.navbar}>
                <NavLink className={`${styles.logo} ${styles.inactiveStyle}`} to='/'>Coinbounce</NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeStyle : styles.inactiveStyle} to='/'>Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeStyle : styles.inactiveStyle} to='/crypto'>Cryptocurrencies</NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeStyle : styles.inactiveStyle} to='/blogs'>Blogs</NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeStyle : styles.inactiveStyle} to='/create'>Submit blog</NavLink>
                {isAuth ?
                    <NavLink to='signout'>
                        <button onClick={handleSignout} className={styles.signout}>{`Signout: ${name}`}</button>
                    </NavLink> :
                    <>
                        <NavLink className={({ isActive }) => isActive ? styles.activeStyle : styles.inactiveStyle} to='/login'>
                            <button className={styles.login}>Login</button>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.activeStyle : styles.inactiveStyle} to='/signup'>
                            <button className={styles.signup}>Signup</button>
                        </NavLink>
                    </>
                }
            </div>
            <div className={styles.separator}></div>
        </>
    )
}
export default NavBar;