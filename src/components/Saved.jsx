import { Box, Rating, Stack, Typography } from "@mui/material";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ToolTip from "./ui/ToolTip";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuRadioGroup,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useContext, useEffect, useState } from "react";
import { TranslateContextData } from "../context/TranslateContext";
import { db, ref, remove, get } from "../lib/firebaseConfig"; // Firebase imports
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Function to highlight matching text in a string
const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`\\b(${query})\\b`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="text-red-900 inline">{part}</span>
        ) : (
            part
        )
    );
};

export function SavedData() {
    const [sortStatus, setSortStatus] = useState("sort by date");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchPopUp, setSearchPopUp] = useState(false);

    const {
        user,
        AllSavedData,
        setSourceText,
        handleSpeakerText,
        fetchAllSavedData,
        setTranslatedText,
        setSourceLanguage,
        setTargetLanguage
    } =
        useContext(TranslateContextData);

    useEffect(() => {
        // Filter and sort whenever AllSavedData, sortStatus, or searchQuery changes
        let data = [...AllSavedData];

        // Sort based on sortStatus
        if (sortStatus === "sort alphabetically") {
            data = data.sort((a, b) =>
                a.sourceText.localeCompare(b.sourceText)
            );
        } else if (sortStatus === "sort by date") {
            data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        // Filter based on searchQuery
        if (searchQuery) {
            data = data.filter(
                (item) =>
                    item.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.translatedText
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(data);
    }, [AllSavedData, sortStatus, searchQuery]);

    // speaker the saved text
    const handleSpeaker = (type, textType) => {
        setSourceText(textType);
        handleSpeakerText(type);
    };

    // handle selected savedData deleted
    const handleDelete = async (id) => {
        try {
            const itemRef = ref(db, `users/${user.uid}/translationsData/savedData/${id}`); // Reference to the specific item
            await remove(itemRef); // Remove item from Firebase
            toast.success("Saved item deleted!", {
                action: {
                    label: "Close",
                },
            });
            fetchAllSavedData(); // Re-fetch all data
        } catch (error) {
            toast.error(`Error deleting item:${error}`, {
                action: {
                    label: "Close",
                },
            });
        }
    };

    // New function to delete all saved data
    const handleDeleteAll = async () => {
        try {
            const savedDataRef = ref(db, `users/${user.uid}/translationsData/savedData`); // Reference to the saved history
            const snapshot = await get(savedDataRef); // Get all data from Firebase
            if (snapshot.exists()) {
                const data = snapshot.val();
                const promises = Object.keys(data).map((id) => {
                    const itemRef = ref(db, `users/${user.uid}/translationsData/savedData/${id}`);
                    return remove(itemRef); // Remove each item from Firebase
                });

                await Promise.all(promises); // Wait for all deletions to complete
                toast.success("All saved translations deleted successfully!", {
                    action: {
                        label: "Close",
                    },
                });
                fetchAllSavedData(); // Re-fetch all data after deletion
            }
        } catch (error) {
            toast.error(`Error deleting all item:${error}`, {
                action: {
                    label: "Close",
                },
            });
        }
    };

    // show the saved text data
    const handleCardClick = (type) => {
        // Set the clicked card data to the respective states
        setSourceText(type.sourceText);
        setTranslatedText(type.translatedText);
        setSourceLanguage(type.sourceLanguage);
        setTargetLanguage(type.targetLanguage);

        // Close the search popup after selecting a card
        setSearchPopUp(false);
    };

    return (
        <>
            {AllSavedData.length === 0 ? (
                <div className="flex flex-col gap-4 justify-center items-center h-screen">
                    <Typography variant="h5">Build your own phrasebook</Typography>
                    <Typography variant="body2">
                        Save key phrases by tapping the star icon
                    </Typography>
                    <Button
                        variant="outline"
                        sx={{ textTransform: "none", gap: "8px" }}
                    >
                        Learn More
                    </Button>
                </div>
            ) : (
                <Stack>
                    <Typography variant="h6">Saved</Typography>

                    <Box className="mt-6">
                        {searchPopUp ? (
                            <Stack
                                direction="row"
                                className="bg-accent rounded-lg p-2 flex justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <MdOutlineSearch size={22} />
                                    <input
                                        placeholder="Search"
                                        className="border-none outline-none bg-accent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <IoMdClose
                                    size={22}
                                    className="cursor-pointer"
                                    onClick={() => setSearchPopUp(false)}
                                />
                            </Stack>
                        ) : (
                            <Stack
                                direction="row"
                                className="flex justify-between items-center border-b-2 pb-2"
                            >
                                <div>
                                    <ToolTip
                                        TitleToolTip="Search saved translation"
                                        onClick={() => setSearchPopUp(true)}
                                    >
                                        <MdOutlineSearch size={22} />
                                    </ToolTip>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Typography
                                                variant="body"
                                                className="cursor-pointer flex gap-1 items-center"
                                            >
                                                Sort
                                                <FaCaretDown />
                                            </Typography>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-fit p-2">
                                            <DropdownMenuRadioGroup
                                                value={sortStatus}
                                                onValueChange={setSortStatus}
                                            >
                                                <DropdownMenuRadioItem
                                                    className="hover:bg-blue-50 cursor-pointer"
                                                    value="sort by date"
                                                >
                                                    Sort by date
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem
                                                    className="hover:bg-blue-50 cursor-pointer"
                                                    value="sort alphabetically"
                                                >
                                                    Sort alphabetically
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size={24} className="border-none rounded-full">
                                                <ToolTip TitleToolTip="More Option">
                                                    <BsThreeDotsVertical size={24} />
                                                </ToolTip>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-fit p-2 mr-6">
                                            <DropdownMenuItem onClick={handleDeleteAll}>
                                                <span>Clear All Saved</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </Stack>
                        )}

                        {/* Scrollable Section */}
                        <Box
                            className="scrollable-section no-scrollbar"
                            sx={{
                                maxHeight: "480px",
                                overflowY: "auto",
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                marginTop: "10px",
                            }}
                        >
                            {filteredData.map((type) => (
                                <Stack
                                    key={type.id}
                                    direction="column"
                                    className="cursor-pointer rounded-lg hover:bg-accent p-2 flex flex-col mb-2 border"
                                    onClick={() => handleCardClick(type)} // Call the function when the card is clicked
                                >
                                    <Stack direction="row" className="flex justify-between items-center">
                                        <Typography
                                            variant="body2"
                                            className="border rounded-full px-2"
                                        >
                                            {type.sourceLanguage} - {type.targetLanguage}
                                        </Typography>
                                        <div className="flex items-center">
                                            <ToolTip TitleToolTip="Remove from save"
                                                onClick={() => handleDelete(type.id)}
                                            >
                                                <Rating
                                                    name="customized-1"
                                                    defaultValue={1}
                                                    max={1}
                                                />
                                            </ToolTip>
                                        </div>
                                    </Stack>
                                    <Stack direction="column">
                                        <Typography
                                            variant="caption"
                                            className="flex gap-2 items-center"
                                        >
                                            {highlightText((type.sourceText).length > 30 ? (type.sourceText).slice(0, 30) + "..." : (type.sourceText), searchQuery)}
                                            <ToolTip
                                                TitleToolTip="Listen"
                                                onClick={() =>
                                                    handleSpeaker("sourceText", type.sourceText)
                                                }
                                            >
                                                <HiOutlineSpeakerWave size={12} />
                                            </ToolTip>
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            className="flex gap-2 items-center"
                                        >
                                            {highlightText((type.translatedText).length > 32 ? (type.translatedText).slice(0, 32) + "..." : (type.translatedText), searchQuery)}
                                            <ToolTip
                                                TitleToolTip="Listen"
                                                onClick={() =>
                                                    handleSpeaker("translatedText", type.translatedText)
                                                }
                                            >
                                                <HiOutlineSpeakerWave size={12} />
                                            </ToolTip>
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                        </Box>
                    </Box>
                </Stack>
            )}
        </>
    );
}
