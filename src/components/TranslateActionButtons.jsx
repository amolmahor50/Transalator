import React, { useContext, useState } from 'react'
import { MdTranslate } from "react-icons/md";
import { PiImageSquareFill } from "react-icons/pi";
import { IoMdDocument } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { Link } from 'react-router-dom';

// text type translate action like if you want 
export function TranslateActionButton() {
    const [active, setACtive] = useState("Text")

    // translate Button type main header 
    const TranslateTypeButton = [
        {
            type: "Text",
            href: "/",
            icon: <MdTranslate />,
        },
        {
            type: "Images",
            href: "/imageTranslate",
            icon: <PiImageSquareFill />,
        },
        {
            type: "Documents",
            href: "/documentTranslate",
            icon: <IoMdDocument />,
        },
        {
            type: "Websites",
            href: "/websiteTranslate",
            icon: <CgWebsite />,
        }
    ]
    return (
        <div className='flex gap-3 my-4 overflow-x-auto no-scrollbar px-6'>
            {TranslateTypeButton.map((button) => (
                <Link
                    key={button.type}
                    onClick={() => setACtive(button.type)}
                    to={button.href} className={`flex items-center gap-2 py-2 px-3 border rounded text-xs sm:text-sm font-medium text-blue-900 cursor-pointer ${active === button.type ? "bg-blue-100" : ""} ${active == button.type ? "" : "hover:bg-blue-50"}`}>
                    {button.icon}
                    <span>{button.type}</span>
                </Link>
            ))}
        </div>
    )
}