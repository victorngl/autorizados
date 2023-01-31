import React from 'react';

const Footer = () => {
    return (
        <div className='text-center bg-slate-500 py-2 text-yellow-50 h-10 w-full bottom-0'>
            <span className='font-bold'>Teconologia da Informação - Escola Modelar Cambaúba - {new Date().getFullYear()}</span>
        </div>
    );
};

export default Footer;
