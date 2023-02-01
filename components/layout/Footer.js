import React from 'react';

const Footer = () => {
    return (
        <div className='text-center bg-slate-500 py-2 text-white h-10 w-full bottom-0'>
            <span className='text-sm font-bold'>Equipe de T.I - Escola Modelar Cambaúba - {new Date().getFullYear()}</span>
        </div>
    );
};

export default Footer;
