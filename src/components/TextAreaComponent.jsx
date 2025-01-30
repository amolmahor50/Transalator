import React, { useContext } from "react";
import ToolTip from "./ui/ToolTip";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { CiKeyboard } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { PiShareNetwork } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { FeedBackLink } from "./ui/FeedBackLink";
import { TranslateContextData } from "../context/TranslateContext";
import { toast } from "sonner";
import ManageDataHistory from "./ui/DataHistory";

export function TextAreaGrid() {
    const { sourceText, setSourceText, translatedText, sourceLanguage, targetLanguage, handleSaveTranslationData } =
        useContext(TranslateContextData);

    const handleTextareaResize = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto"; // Reset height to auto to calculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    };

    // Clear all text in the source textarea
    const handleCloseButtonClickRemoveText = () => {
        setSourceText("");
    };

    // Copy text handler
    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
        toast("Copied Text", {
            action: {
                label: "Close",
            },
        });
    };

    const handleCopyText = (target, id) => {
        if (target) {
            if (id === "sourceText") {
                copyContent(sourceText);
            } else {
                copyContent(translatedText);
            }
        }
    };

    return (
        <>
            <div className="max-w-7xl grid gap-3 sm:grid-cols-2 grid-cols-1 items-center">
                <div className="relative border-2 rounded-lg sm:p-4 p-2">
                    {sourceText.length !== 0 ? (
                        <span
                            className="absolute right-2 sm:right-3 top-0 sm:top-2"
                        >
                            <ToolTip TitleToolTip="Clear source Text" onClick={handleCloseButtonClickRemoveText}>
                                <IoMdClose className="sm:text-xl text-lg" />
                            </ToolTip>
                        </span>
                    ) : (
                        ""
                    )}

                    <textarea
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        onInput={handleTextareaResize}
                        className="w-full text-base focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Type something..."
                    />

                    {sourceText.length !== 0 ? (
                        <Link className="ml-1 text-blue-500 text-xs sm:text-sm italic">
                            Dictionary
                        </Link>
                    ) : (
                        ""
                    )}

                    <div className="flex justify-between">
                        <span>
                            <ToolTip TitleToolTip="Translate by voice">
                                <MdOutlineKeyboardVoice className="sm:text-xl text-lg" />
                            </ToolTip>

                            {sourceText.length !== 0 ? (
                                <span>
                                    <ToolTip TitleToolTip="Listen">
                                        <HiOutlineSpeakerWave className="sm:text-xl text-lg" />
                                    </ToolTip>

                                    <ToolTip
                                        TitleToolTip="Copy translation"
                                        onClick={(e) => handleCopyText(e.target, "sourceText")}
                                    >
                                        <FaRegCopy className="text-lg" />
                                    </ToolTip>
                                </span>
                            ) : (
                                ""
                            )}
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
                    {sourceText.length !== 0 ? (
                        <span className="absolute sm:right-3 right-1 top-0 sm:top-2">
                            <ToolTip TitleToolTip="Save Translation">
                                <Rating
                                    name="customized-1"
                                    defaultValue={0}
                                    max={1}
                                    onChange={(event, newValue) => handleSaveTranslationData(event, newValue)}
                                />
                            </ToolTip>
                        </span>
                    ) : (
                        ""
                    )}

                    <textarea
                        disabled
                        value={translatedText}
                        onInput={handleTextareaResize}
                        className="w-full bg-[#eeee] text-base placeholder:text-gray-800 rounded-lg border-none focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Translation"
                    />

                    {sourceText.length !== 0 ? (
                        <Link className="ml-1 mb-2 text-blue-500 text-xs sm:text-sm italic">
                            Dictionary
                        </Link>
                    ) : (
                        ""
                    )}

                    {sourceText.length !== 0 ? (
                        <div className="flex justify-between">
                            <span>
                                <ToolTip TitleToolTip="Listen">
                                    <HiOutlineSpeakerWave className="sm:text-xl text-lg" />
                                </ToolTip>
                            </span>

                            <span>
                                <ToolTip
                                    TitleToolTip="Copy translation"
                                    onClick={(e) => handleCopyText(e.target, "translateText")}
                                >
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
                    ) : (
                        <div className="mt-4 text-gray-600 italic text-sm">Welcome</div>
                    )}
                </div>
            </div>
            <FeedBackLink />
            <ManageDataHistory />
        </>
    );
}
