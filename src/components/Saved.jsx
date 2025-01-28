import { Box, Rating, Stack, Typography } from "@mui/material";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import ToolTip from "./ui/ToolTip";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuRadioGroup,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useContext, useState } from "react";
import { TranslateContextData } from "../context/TranslateContext";
import { Button } from "@/components/ui/button"

export function SavedData() {
    const [sortStatus, setSortStatus] = useState('sort by date');
    const [searchPopUp, setSearchPopUp] = useState(false);
    const {
        AllSavedData,
        sourceText,
        setSourceText,
        handleSpeakerText
    } = useContext(TranslateContextData);

    const handleSpeaker = (type, textType) => {
        setSourceText(textType);
        handleSpeakerText(type);
    }

    console.log("allSavedData-", AllSavedData);

    return (
        <>
            {
                AllSavedData.length === 0 ?
                    <div className="flex flex-col gap-4 justify-center items-center h-screen">
                        <Typography variant="h5">
                            Build your own phrasebook
                        </Typography>
                        <Typography variant="body2">
                            Save key phrases by tapping the star icon
                        </Typography>
                        <Button
                            variant="outlined"
                            sx={{ textTransform: "none", gap: "8px" }}
                        >
                            Learn More
                        </Button>
                    </div>
                    :
                    <Stack>
                        <Typography
                            variant="h6"
                        >
                            Saved
                        </Typography>

                        <Box className="mt-6">
                            {searchPopUp ?
                                <Stack direction="row" className="bg-accent rounded-lg p-2 flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <MdOutlineSearch size={22} />
                                        <input placeholder="Search" className="border-none outline-none bg-accent" />
                                    </div>
                                    <IoMdClose size={22} className="cursor-pointer" onClick={() => setSearchPopUp(false)} />
                                </Stack>
                                :
                                <Stack direction='row' className="flex justify-between items-center border-b-2 pb-2">
                                    <div>
                                        <ToolTip TitleToolTip='Search saved translation' onClick={() => setSearchPopUp(true)} >
                                            <MdOutlineSearch size={22} />
                                        </ToolTip>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Typography variant="body" className="cursor-pointer flex gap-1 items-center">
                                                    Sort
                                                    <FaCaretDown />
                                                </Typography>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-fit p-2">
                                                <DropdownMenuRadioGroup value={sortStatus} onValueChange={setSortStatus}>
                                                    <DropdownMenuRadioItem className="hover:bg-blue-50 cursor-pointer" value="sort by date">Sort by date</DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem className="hover:bg-blue-50 cursor-pointer" value="sort alphabetically">Sort alphabetically</DropdownMenuRadioItem>
                                                </DropdownMenuRadioGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <ToolTip TitleToolTip='Search saved translation'>
                                                    <BiSolidSpreadsheet size={22} />
                                                </ToolTip>
                                            </DropdownMenuTrigger>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size={24} className="border-none rounded-full">
                                                    <ToolTip TitleToolTip="More Option">
                                                        <BsThreeDotsVertical size={24} />
                                                    </ToolTip>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-fit p-3 mr-4">
                                                <DropdownMenuItem className="p-3">
                                                    <span>Clear All saved</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>
                                </Stack>
                            }

                            <Stack direction="row" className="flex justify-between items-center py-2">
                                <Typography variant="subtitle1">
                                    {AllSavedData.length} phrase
                                </Typography>
                                <div className="flex items-center gap-4">
                                    <GrFormPrevious size={20} />
                                    <GrFormNext size={20} />
                                </div>
                            </Stack>
                            {
                                AllSavedData.map((type) => (
                                    <Stack key={type.id} direction="column" className="cursor-pointer rounded-lg hover:bg-accent p-2 flex flex-col mb-2 border">
                                        <Stack direction="row" className="flex justify-between items-center">
                                            <Typography variant="body2" className="border rounded-full px-2">
                                                {type.sourceLang} - {type.targetLang}
                                            </Typography>
                                            <div className="flex items-center">
                                                <ToolTip TitleToolTip="Remove from save">
                                                    <Rating name="customized-1" defaultValue={1} max={1} />
                                                </ToolTip>
                                            </div>
                                        </Stack>
                                        <Stack direction="column">
                                            <Typography variant="caption" className="flex gap-2 items-center">
                                                {type.sourceText}
                                                <ToolTip TitleToolTip="Listen" onClick={() => handleSpeaker("sourceText", type.sourceText)}>
                                                    <HiOutlineSpeakerWave size={12} />
                                                </ToolTip>
                                            </Typography>
                                            <Typography variant="caption" className="flex gap-2 items-center">
                                                {type.translateText}
                                                <ToolTip TitleToolTip="Listen" onClick={() => handleSpeaker("translatedText", type.translateText)}>
                                                    <HiOutlineSpeakerWave size={12} />
                                                </ToolTip>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Box>
                    </Stack>
            }
        </>

    )
}
