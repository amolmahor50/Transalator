import React, { useContext, useState } from "react";
import ToolTip from "./ui/ToolTip";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { CiKeyboard } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { PiShareNetwork } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { Rating, Typography } from "@mui/material";
import { FeedBackLink } from "./ui/FeedBackLink";
import { TranslateContextData } from "../context/TranslateContext";
import { toast } from "sonner";
import ManageDataHistory from "./ui/DataHistory";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaGithub, FaGoogleDrive } from "react-icons/fa";
import { IoBluetooth, IoPrint, IoMail } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const shareOptions = [
    { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 text-3xl" />, link: "https://wa.me/?text=" },
    { name: "Facebook", icon: <FaFacebook className="text-blue-500 text-3xl" />, link: "https://www.facebook.com/sharer/sharer.php?u=" },
    { name: "Instagram", icon: <FaInstagram className="text-pink-500 text-3xl" />, link: "https://www.instagram.com/?url=" },
    { name: "Telegram", icon: <FaTelegram className="text-blue-400 text-3xl" />, link: "https://t.me/share/url?url=" },
    { name: "Twitter", icon: <FaTwitter className="text-blue-500 text-3xl" />, link: "https://twitter.com/intent/tweet?text=" },
    { name: "Gmail", icon: <IoMail className="text-red-500 text-3xl" />, link: "mailto:?subject=Shared Translation&body=" },
    { name: "GitHub Gist", icon: <FaGithub className="text-gray-700 text-3xl" />, link: "#" },
    { name: "Google Drive", icon: <FaGoogleDrive className="text-yellow-500 text-3xl" />, link: "#" },
    { name: "Print", icon: <IoPrint className="text-gray-700 text-3xl" />, link: "#" },
    { name: "Bluetooth", icon: <IoBluetooth className="text-blue-600 text-3xl" />, link: "#" }
];

export function TextAreaGrid() {
    const { sourceText, setSourceText, translatedText, setTranslatedText, sourceLanguage, handleSaveTranslationData, handleSpeakerText } =
        useContext(TranslateContextData);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [input, setInput] = useState(""); // State for input field
    const [layout, setLayout] = useState("default");
    const [dictionaryData, setDictionaryData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const fetchDictionaryData = async (word) => {
        if (!word) return toast.error("Please enter a word!");

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            if (data.title) {
                toast.error("Word not found in dictionary.");
                return;
            }

            setDictionaryData(data[0]); // Storing the first result
            setIsOpen(true);
            console.log("dictionaryData", dictionaryData)
        } catch (error) {
            toast.error("Failed to fetch dictionary data.");
        }
    };

    const handleTextareaResize = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto"; // Reset height to auto to calculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    };

    // custom keyboard
    const handleKeyboardInput = (input) => {
        setInput(input);
        setSourceText(input);
    };

    // Handle special keys (Shift, Enter, Backspace)
    const handleKeyPress = (button) => {
        if (button === "{shift}" || button === "{lock}") {
            setLayout(layout === "default" ? "shift" : "default");
        } else if (button === "{bksp}") {
            setInput(input.slice(0, -1));
            setSourceText(input.slice(0, -1));
        } else if (button === "{enter}") {
            setInput(input + "\n");
            setSourceText(input + "\n");
        } else {
            setInput(input + button);
            setSourceText(input + button);
        }
    };

    // Clear all text in the source textarea
    const handleCloseButtonClickRemoveText = () => {
        setSourceText("");
        setInput("");
        setTranslatedText("");
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

    // speaking the text and typing the sourcetext
    const handleVoiceInput = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error("Your browser does not support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = sourceLanguage || "en-US"; // Set the language
        recognition.interimResults = false; // We only want final results

        recognition.onstart = () => {
            toast("Listening...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSourceText(transcript); // Set recognized text
        };

        recognition.onerror = (event) => {
            toast.error("Error occurred: " + event.error);
        };

        recognition.start();
    };

    const handleShare = (platform) => {
        const text = encodeURIComponent(translatedText); // Get translated text

        if (!translatedText) {
            toast.error("No translated text to share!");
            return;
        }

        if (platform.link === "#") {
            alert(`Feature not available for ${platform.name}`);
        } else {
            window.open(`${platform.link}${text}`, "_blank");
        }
    };

    return (
        <>
            <div className="max-w-7xl grid gap-3 sm:grid-cols-2 grid-cols-1 items-center">
                <div className="relative border-2 rounded-lg sm:p-4 p-2">
                    {sourceText.length !== 0 ? (
                        <span className="absolute right-2 sm:right-3 top-0 sm:top-2"                        >
                            <ToolTip
                                TitleToolTip="Clear source Text"
                                onClick={handleCloseButtonClickRemoveText}
                            >
                                <IoMdClose className="sm:text-xl text-lg" />
                            </ToolTip>
                        </span>
                    ) : (
                        ""
                    )}

                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setSourceText(e.target.value);
                        }}
                        onInput={handleTextareaResize}
                        className="w-full text-base focus:outline-none no-scrollbar"
                        rows="3"
                        placeholder="Type something..."
                    />

                    {sourceText.length !== 0 ? (
                        <span
                            className="ml-1 text-blue-500 text-xs sm:text-sm italic cursor-pointer"
                            onClick={() => fetchDictionaryData(sourceText)}
                        >
                            Dictionary
                        </span>
                    ) : (
                        ""
                    )}

                    <div className="flex justify-between">
                        <span>
                            <ToolTip
                                TitleToolTip="Translate by voice"
                                onClick={handleVoiceInput}
                            >
                                <MdOutlineKeyboardVoice className="sm:text-xl text-lg" />
                            </ToolTip>

                            {sourceText.length !== 0 ? (
                                <span>
                                    <ToolTip
                                        TitleToolTip="Listen"
                                        onClick={() => handleSpeakerText("sourceText")}
                                    >
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
                            <ToolTip TitleToolTip="Keyboard" onClick={() => setShowKeyboard(!showKeyboard)}>
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
                        <span
                            className="ml-1 mb-2 text-blue-500 text-xs sm:text-sm italic cursor-pointer"
                            onClick={() => fetchDictionaryData(sourceText)}
                        >
                            Dictionary
                        </span>
                    ) : (
                        ""
                    )}

                    {sourceText.length !== 0 ? (
                        <div className="flex justify-between">
                            <span>
                                <ToolTip
                                    TitleToolTip="Listen"
                                    onClick={() => handleSpeakerText("translatedText")}
                                >
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

                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <ToolTip TitleToolTip="Share translation">
                                            <PiShareNetwork className="sm:text-xl text-lg" />
                                        </ToolTip>
                                    </DrawerTrigger>
                                    <DrawerContent className="max-w-xl w-full mx-auto sm:h-[300px] h-[250px] px-6 flex flex-col">
                                        <DrawerHeader>
                                            <DrawerTitle></DrawerTitle>
                                        </DrawerHeader>

                                        <div className="grid gap-4 grid-cols-3 overflow-y-auto px-2 no-scrollbar">
                                            {shareOptions.map((platform, index) => (
                                                <Button
                                                    variant="secondary"
                                                    className="flex flex-col items-center gap-2 border p-8"
                                                    key={index}
                                                    onClick={() => handleShare(platform)}
                                                >
                                                    {platform.icon}
                                                    <Typography variant="caption">
                                                        {platform.name}
                                                    </Typography>
                                                </Button>
                                            ))}
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            </span>
                        </div>
                    ) : (
                        <div className="mt-4 text-gray-600 italic text-sm">Welcome</div>
                    )}
                </div>
            </div>
            <FeedBackLink />
            <ManageDataHistory />

            {showKeyboard && (
                <div className='fixed w-full left-0 bottom-0'>
                    <Keyboard
                        onChange={handleKeyboardInput}
                        onKeyPress={handleKeyPress}
                        layoutName={layout}
                    />
                </div>
            )}

            {/* Dictionary Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Dictionary</DialogTitle>
                    </DialogHeader>

                    {dictionaryData && (
                        <Tabs defaultValue="definition">
                            <TabsList>
                                <TabsTrigger value="definition">Definition</TabsTrigger>
                                <TabsTrigger value="synonyms">Synonyms</TabsTrigger>
                                <TabsTrigger value="antonyms">Antonyms</TabsTrigger>
                                <TabsTrigger value="examples">Examples</TabsTrigger>
                            </TabsList>

                            {/* Definition Tab */}
                            <TabsContent value="definition">
                                <p className="text-lg font-semibold">{dictionaryData.word}</p>
                                {dictionaryData.meanings.map((meaning, index) => (
                                    <div key={index} className="mt-2">
                                        <p className="italic">{meaning.partOfSpeech}</p>
                                        <p>{meaning.definitions[0].definition}</p>
                                    </div>
                                ))}
                            </TabsContent>

                            {/* Synonyms Tab */}
                            <TabsContent value="synonyms">
                                {dictionaryData.meanings.flatMap(m => m.synonyms).length > 0 ? (
                                    <p>{dictionaryData.meanings.flatMap(m => m.synonyms).join(", ")}</p>
                                ) : (
                                    <p>No synonyms found.</p>
                                )}
                            </TabsContent>

                            {/* Antonyms Tab */}
                            <TabsContent value="antonyms">
                                {dictionaryData.meanings.flatMap(m => m.antonyms).length > 0 ? (
                                    <p>{dictionaryData.meanings.flatMap(m => m.antonyms).join(", ")}</p>
                                ) : (
                                    <p>No antonyms found.</p>
                                )}
                            </TabsContent>

                            {/* Examples Tab */}
                            <TabsContent value="examples">
                                {dictionaryData.meanings.flatMap(m => m.definitions[0]?.example || []).length > 0 ? (
                                    <p>{dictionaryData.meanings.flatMap(m => m.definitions[0]?.example).join("")}</p>
                                ) : (
                                    <p>No examples found.</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </DialogContent>
            </Dialog>

        </>
    );
}
