import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ToolTip from "./ui/ToolTip";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuRadioGroup,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext, useState } from "react";
import { TranslateContextData } from "../context/TranslateContext";

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
                                        <ToolTip TitleToolTip='Search saved translation'>
                                            <MdOutlineSearch size={22} onClick={() => setSearchPopUp(true)} />
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
                                        <ToolTip TitleToolTip='Search saved translation'>
                                            <BiSolidSpreadsheet size={22} />
                                        </ToolTip>
                                        <ToolTip TitleToolTip="More Option">
                                            <PiDotsThreeVerticalBold size={22} />
                                        </ToolTip>
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
                                    <Stack key={type.id} direction="column" className="cursor-pointer rounded-lg hover:bg-accent p-2 flex flex-col">
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
                                                <ToolTip TitleToolTip="Listen">
                                                    <HiOutlineSpeakerWave size={12} onClick={() => handleSpeaker("sourceText", type.sourceText)} />
                                                </ToolTip>
                                            </Typography>
                                            <Typography variant="caption" className="flex gap-2 items-center">
                                                {type.translateText}
                                                <ToolTip TitleToolTip="Listen">
                                                    <HiOutlineSpeakerWave size={12} onClick={() => handleSpeaker("translatedText", type.translateText)} />
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
