import ToolTip from "./ui/ToolTip";
import { TbArrowsLeftRight } from "react-icons/tb";
import { Tab, Tabs } from "@mui/material";
import languages from "./Languages"; // Assuming this contains all language codes and names
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useContext, useState } from "react";
import { TranslateContextData } from "../context/TranslateContext";

export function SelectLanguageDropDown() {
    const { sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage } = useContext(TranslateContextData);

    // Initialize the state with valid default indexes (e.g., 0)
    const [sourceTabIndex, setSourceTabIndex] = useState(0);
    const [targetTabIndex, setTargetTabIndex] = useState(0);

    // Languages for source and target tabs (These should be based on your requirements)
    const sourceTabLanguages = ["en", "hi", "mr"]; // Marathi, Hindi, English
    const targetTabLanguages = ["mr", "en", "fr"]; // French, English, Marathi

    // Function to handle source language change in the dropdown
    const handleSourceLanguageChange = (value) => {
        setSourceLanguage(value);
        const index = sourceTabLanguages.indexOf(value); // Set tab index based on selected language
        setSourceTabIndex(index !== -1 ? index : 0); // Ensure valid index
    };

    // Function to handle target language change in the dropdown
    const handleTargetLanguageChange = (value) => {
        setTargetLanguage(value);
        const index = targetTabLanguages.indexOf(value); // Set tab index based on selected language
        setTargetTabIndex(index !== -1 ? index : 0); // Ensure valid index
    };

    // Function to handle tab change for source language
    const handleSourceTabChange = (newIndex) => {
        const newLanguage = sourceTabLanguages[newIndex];
        setSourceLanguage(newLanguage);
        setSourceTabIndex(newIndex); // Set tab index based on selected language
    };

    // Function to handle tab change for target language
    const handleTargetTabChange = (newIndex) => {
        const newLanguage = targetTabLanguages[newIndex];
        setTargetLanguage(newLanguage);
        setTargetTabIndex(newIndex); // Set tab index based on selected language
    };

    // Swap the source and target languages when TbArrowsLeftRight is clicked
    const swapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setSourceTabIndex(targetTabIndex); // Swap tabs as well
        setTargetTabIndex(sourceTabIndex);
    };

    return (
        <div className="flex justify-between items-center max-w-7xl mx-auto mt-6 sm:px-0 px-6 sm:mb-0 mb-2">

            <div className="flex justify-evenly items-center w-auto sm:w-1/2">

                {/* Source Language Tabs (Marathi, Hindi, English) */}
                <div className="sm:block hidden">
                    <Tabs value={sourceTabIndex} onChange={(_, newValue) => handleSourceTabChange(newValue)}>
                        {sourceTabLanguages.map((langCode, index) => (
                            <Tab key={index} label={languages[langCode]} />
                        ))}
                    </Tabs>
                </div>

                {/* Source Language Select */}
                <div>
                    <Select value={sourceLanguage} onValueChange={handleSourceLanguageChange}>
                        <SelectTrigger className="sm:w-[200px] w-[120px] outline-none">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Language</SelectLabel>
                                {Object.entries(languages).map(([code, name]) => (
                                    <SelectItem key={code} value={code} className="text-sm">
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* Language Transform Arrow */}
            <div>
                <ToolTip TitleToolTip="Left Right Convert Language" onClick={swapLanguages}>
                    <TbArrowsLeftRight className="w-5 h-5 cursor-pointer" />
                </ToolTip>
            </div>

            <div className="flex justify-evenly items-center w-auto sm:w-1/2">
                {/* Target Language Tabs (French, English, Marathi) */}
                <div className="sm:block hidden">
                    <Tabs value={targetTabIndex} onChange={(_, newValue) => handleTargetTabChange(newValue)}>
                        {targetTabLanguages.map((langCode, index) => (
                            <Tab key={index} label={languages[langCode]} />
                        ))}
                    </Tabs>
                </div>

                {/* Target Language Select */}
                <div>
                    <Select value={targetLanguage} onValueChange={handleTargetLanguageChange}>
                        <SelectTrigger className="sm:w-[200px] w-[120px] outline-none">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Language</SelectLabel>
                                {Object.entries(languages).map(([code, name]) => (
                                    <SelectItem key={code} value={code} className="text-sm">
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>
    );
}
