import React from 'react';
import FooterComponent from '../Footer';
import "./style.scss";

const Layout = ({title, children}) => {
    return (
        <div className='layout-container'>
            <div className='header'>{title}</div>
            <div className='body'>{children}</div>
            <FooterComponent />
        </div>
    )
}

export default Layout;