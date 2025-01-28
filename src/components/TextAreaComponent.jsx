import ToolTip from "./ui/ToolTip";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { CiKeyboard } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { PiShareNetwork } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FeedBackLink } from "./FeedBackLink"
import { useContext } from "react";
import { TranslateContextData } from "../context/TranslateContext";
import ManageDataHistory from "./ui/DataHistory";
import { toast } from "sonner";
import { Rating } from "@mui/material";

export function TextAreaGrid() {

    const {
        sourceText,
        setSourceText,
        translatedText,
        handleSpeakerText
    } = useContext(TranslateContextData);

    const handleTextareaResize = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset height to auto to calculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    };

    // handle clear all text in your textarea
    const handleCloseButtonClickeRemoveText = () => {
        setSourceText("");

    }

    // from textarea and to textarea inside text copy handler
    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
        toast("Copied Text", {
            action: {
                label: "Close"
            }
        })
    }

    const handleCopyText = (target, id) => {
        if (target) {
            if (id == "sourceText") {
                copyContent(sourceText);
            }
            else {
                copyContent(translatedText);
            }
        }
    }

    return (
        <>
            <div className="max-w-7xl grid gap-3 sm:grid-cols-2 grid-cols-1 items-center">

                <div className="relative border-2 rounded-lg sm:p-4 p-2">

                    {
                        sourceText.length != 0 ? <span className="absolute right-2 sm:right-3 top-0 sm:top-2"
                            onClick={handleCloseButtonClickeRemoveText}>
                            <ToolTip TitleToolTip="Clear source Text">
                                <IoMdClose className="sm:text-xl text-lg" />
                            </ToolTip>
                        </span> : ""
                    }

                    <textarea
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        onInput={handleTextareaResize}
                        className="w-full text-base focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Type something..."
                    />

                    {
                        sourceText.length != 0 ?
                            <Link className="ml-1 text-blue-500 text-xs sm:text-sm italic">
                                Dictionary
                            </Link> : ""
                    }

                    <div className="flex justify-between">
                        <span>
                            <ToolTip TitleToolTip="Translate by voice">
                                <MdOutlineKeyboardVoice className="sm:text-xl text-lg" />
                            </ToolTip>

                            {
                                sourceText.length != 0 ?
                                    <span>
                                        <ToolTip TitleToolTip="Listen" onClick={() => handleSpeakerText("sourceText")}>
                                            <HiOutlineSpeakerWave className="sm:text-xl text-lg" />
                                        </ToolTip>

                                        <ToolTip TitleToolTip="Copy translation" onClick={(e) => handleCopyText(e.target, "sourceText")}>
                                            <FaRegCopy className="text-lg" />
                                        </ToolTip>
                                    </span> : ""
                            }
                        </span>

                        <span className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">{sourceText.length} / 5,000</span>
                            <ToolTip TitleToolTip="Keyboard">
                                <CiKeyboard className="sm:text-xl text-lg" />
                            </ToolTip>
                        </span>
                    </div>

                </div>

                <div className="relative bg-[#eeee] rounded-lg p-2 sm:p-4">

                    {
                        sourceText.length != 0 ?
                            <span className="absolute sm:right-3 right-1 top-0 sm:top-2">
                                <ToolTip TitleToolTip="Save Translation">
                                    <Rating name="customized-1" defaultValue={0} max={1} />
                                </ToolTip>
                            </span> : ""
                    }

                    <textarea
                        disabled
                        value={translatedText}
                        onInput={handleTextareaResize}
                        className="w-full bg-[#eeee] text-base placeholder:text-gray-800 rounded-lg border-none focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Translation"
                    />

                    {
                        sourceText.length != 0 ?
                            <Link className="ml-1 mb-2 text-blue-500 text-xs sm:text-sm italic">
                                Dictionary
                            </Link> : ""
                    }

                    {
                        sourceText.length != 0 ?
                            <div className="flex justify-between">
                                <span>
                                    <ToolTip TitleToolTip="Listen" onClick={() => handleSpeakerText("translatedText")}>
                                        <HiOutlineSpeakerWave className="sm:text-xl text-lg" />
                                    </ToolTip>
                                </span>

                                <span>
                                    <ToolTip TitleToolTip="Copy translation" onClick={(e) => handleCopyText(e.target, "trasnalteText")} >
                                        <FaRegCopy className="sm:text-xl text-lg" />
                                    </ToolTip>

                                    <ToolTip TitleToolTip="Rate this translation">
                                        <AiOutlineLike className="sm:text-xl text-lg" />
                                    </ToolTip>

                                    <ToolTip TitleToolTip="Share translation">
                                        <PiShareNetwork className="sm:text-xl text-lg" />
                                    </ToolTip>
                                </span>
                            </div>
                            :
                            <div className="mt-4 text-gray-600 italic text-sm">Welcome</div>
                    }
                </div>
            </div>
            <FeedBackLink />
            <ManageDataHistory />
        </>

    )
}
