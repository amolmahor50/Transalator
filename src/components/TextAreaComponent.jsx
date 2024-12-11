import ToolTip from "./ui/ToolTip";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { PiPencilSimple } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { PiShareNetwork } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FeedBackLink } from "./ui/FeedBackLink"


export function TextAreaGrid() {

    const handleTextareaResize = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset height to auto to calculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    };

    return (
        <>
            <div className="max-w-7xl grid gap-3 sm:grid-cols-12 items-center">

                <div className="sm:col-span-6 relative border-2 rounded-lg p-4">

                    <span className="absolute right-3 top-2">
                        <ToolTip TitleToolTip={"Clear source Text"}>
                            <IoMdClose size={20} />
                        </ToolTip>
                    </span>

                    <textarea
                        onInput={handleTextareaResize}
                        className="w-full text-base focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Type something..."
                    />

                    <Link className="ml-2 mb-2 text-blue-400 text-sm italic">
                        Dictionary
                    </Link>

                    <div className="flex justify-between">
                        <span>
                            <ToolTip TitleToolTip={"Translate by voice"}>
                                <MdOutlineKeyboardVoice size={20} />
                            </ToolTip>

                            <ToolTip TitleToolTip={"Listen"}>
                                <HiOutlineSpeakerWave size={20} />
                            </ToolTip>
                        </span>

                        <span className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">0 / 5,000</span>
                            <ToolTip TitleToolTip={"Edit"}>
                                <PiPencilSimple size={20} />
                            </ToolTip>
                        </span>
                    </div>

                </div>

                <div className="sm:col-span-6 relative bg-[#eeee] rounded-lg p-4">

                    <span className="absolute right-3 top-2">
                        <ToolTip TitleToolTip={"Save Translation"}>
                            <FaRegStar size={20} />
                        </ToolTip>
                    </span>

                    <textarea
                        disabled
                        onInput={handleTextareaResize}
                        className="w-full bg-[#eeee] text-base placeholder:text-gray-800 rounded-lg border-none focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Translation"
                    />

                    <Link className="ml-2 mb-2 text-blue-400 text-sm italic">
                        Dictionary
                    </Link>

                    <div className="flex justify-between">
                        <span>
                            <ToolTip TitleToolTip={"Listen"}>
                                <HiOutlineSpeakerWave size={20} />
                            </ToolTip>
                        </span>

                        <span>
                            <ToolTip TitleToolTip={"Copy translation"}>
                                <FaRegCopy size={20} />
                            </ToolTip>

                            <ToolTip TitleToolTip={"Rate this translation"}>
                                <AiOutlineLike size={20} />
                            </ToolTip>

                            <ToolTip TitleToolTip={"Share translation"}>
                                <PiShareNetwork size={20} />
                            </ToolTip>
                        </span>
                    </div>

                </div>
            </div>
            <FeedBackLink />
        </>

    )
}
