import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Error.module.css'

const Error = () => {
    return (
        <div className={`${styles.errorWrapper}`}>
            <div className={styles.errorHeader}>Error page not found</div>
            <div className={styles.errorBody}> Go to <Link className={styles.homeLink} to='/' replace > Home </Link></div>
        </div>
    );
};

export default Error;