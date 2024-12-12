// import { Select, Option } from "@material-tailwind/react";
import ToolTip from "./ui/ToolTip";
import { TbArrowsLeftRight } from "react-icons/tb";
import { Tab, Tabs } from "@mui/material";
import languages from "./Languages";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useContext } from "react";
import { TranslateContextData } from "../context/TranslateContext";

export function SelectLanguageDropDown() {
    const { sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage } = useContext(TranslateContextData)


    // Swap the source and target languages when TbArrowsLeftRight is clicked
    const swapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
    };

    console.log(sourceLanguage, targetLanguage);
    return (
        <div className="flex justify-between items-center w-full mt-6 sm:px-4 px-6 sm:mb-0 mb-2">

            <div className="flex justify-evenly items-center w-auto sm:w-1/2">

                <div className="sm:block hidden">
                    <Tabs>
                        <Tab label="Marathi" />
                        <Tab label="Hindi" />
                        <Tab label="English" />
                    </Tabs>
                </div>

                <div>
                    <Select value={sourceLanguage} onValueChange={(value) => setSourceLanguage(value)}>
                        <SelectTrigger className="sm:w-[200px] w-[120px] outline-none">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Language</SelectLabel>
                                {
                                    Object.entries(languages).map(([code, name]) => (
                                        <SelectItem className="text-sm" key={code} value={code}>{name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>

                    </Select>
                </div>

            </div>

            {/* Language Transform Arrow */}
            <div>
                <ToolTip TitleToolTip={"Left Right Convert Language"}>
                    <TbArrowsLeftRight
                        className="w-5 h-5 cursor-pointer"
                        onClick={swapLanguages} // Handle swap on icon click
                    />
                </ToolTip>
            </div>

            <div className="flex justify-evenly items-center w-auto sm:w-1/2">

                <div className="sm:block hidden">
                    <Tabs>
                        <Tab label="Marathi" />
                        <Tab label="Hindi" />
                        <Tab label="English" />
                    </Tabs>
                </div>

                <div>
                    <Select value={targetLanguage} onValueChange={(value) => setTargetLanguage(value)}>
                        <SelectTrigger className="sm:w-[200px] w-[120px] outline-none">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Language</SelectLabel>
                                {
                                    Object.entries(languages).map(([code, name]) => (
                                        <SelectItem className="text-sm" key={code} value={code}>{name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>

                    </Select>
                </div>

            </div>

        </div>
    );
}