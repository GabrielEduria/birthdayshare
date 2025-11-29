'use client';

import { Cake, Menu, X} from "lucide-react";
import { useState } from "react";
import Button from "./button/Button";

function Navbar() {
    const [isopen, setIsOpen] = useState(false);

    return (    
        <nav className="sticky top-0 z-100 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto px-4">
            </div>
        </nav>
    )
}

export default Navbar