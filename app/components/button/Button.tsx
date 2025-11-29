'use client';

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    href?: string;
}
function Button({children, href}: ButtonProps) {
    return (

        <button 
            type="button" 
             className="bg-blue-500 hover:bg-blue-400 text-white
             font-bold py-2 px-4 border-b-4 border-blue-700 
             hover:border-blue-500 rounded cursor-pointer"
            onClick={() => href}
      
        >
            {children}
        </button>
    )
}

export default Button;