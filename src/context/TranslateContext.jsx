import { createContext, useEffect, useState } from "react";
import { db, ref, push, set, get } from "../lib/firebaseConfig"; // Ensure correct Firebase imports
import { toast } from "sonner";
import { fetchDataForHistory } from "./data";

export const TranslateContextData = createContext();

export const TranslateProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Authenticated user (optional if not using auth)
    const [loading, setLoading] = useState(true); // Global loading state
    const [sourceText, setSourceText] = useState(""); // Input text
    const [translatedText, setTranslatedText] = useState(""); // Translated text
    const [sourceLanguage, setSourceLanguage] = useState("en"); // Source language (default: English)
    const [targetLanguage, setTargetLanguage] = useState("mr"); // Target language (default: Marathi)
    const [openSlider, setOpenSlider] = useState(false); // Optional UI slider state
    const [AllSavedData, setAllSavedData] = useState([]); // Saved translations from Firebase
    const [AllHistoryData, setAllHistoryData] = useState(fetchDataForHistory); // Example local history
    const [debounceTimer, setDebounceTimer] = useState(null); // Debouncing timer

    // Exchange source and target languages
    const handleExchangeLangArrow = () => {
        const tempText = sourceText;
        const tempLang = sourceLanguage;

        setSourceText(translatedText);
        setTranslatedText(tempText);

        setSourceLanguage(targetLanguage);
        setTargetLanguage(tempLang);
    };

    // Handle text-to-speech
    const utterText = (text, lang) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        synth.speak(utterance);
    };

    const handleSpeakerText = (id) => {
        if (id === "sourceText") {
            utterText(sourceText, sourceLanguage);
        } else if (id === "translatedText") {
            utterText(translatedText, targetLanguage);
        }
    };

    // Fetch saved translations from Firebase
    const fetchAllSavedData = async () => {
        if (!user) return; // Prevent fetching if user is not logged in

        try {
            const translationsRef = ref(db, `users/${user.uid}/translationsData/savedData`);
            const snapshot = await get(translationsRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedData = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setAllSavedData(formattedData);
            } else {
                setAllSavedData([]);
                toast.info("No saved translations found.", {
                    action: {
                        label: "Close",
                    },
                });
            }
        } catch (error) {
            toast.error(`Error fetching translations: ${error.message}`, {
                action: {
                    label: "Close",
                },
            });
        }
    };

    // Save a new translation to Firebase
    const handleSaveTranslationData = async (event, newValue) => {
        if (!user) {
            toast.error("You must be logged in to save translations.", {
                action: {
                    label: "Close",
                },
            });
            return;
        }

        const existingTranslation = AllSavedData.find(
            (data) => data.sourceText === sourceText && data.translatedText === translatedText
        );

        if (existingTranslation) {
            // If the translation is already saved, remove it
            try {
                const translationRef = ref(db, `users/${user.uid}/translationsData/savedData/${existingTranslation.id}`);
                await set(translationRef, null); // Delete the translation from Firebase
                setAllSavedData((prevData) =>
                    prevData.filter((data) => data.id !== existingTranslation.id)
                ); // Update state to remove the deleted translation
                toast.success("Translation removed successfully!", {
                    action: {
                        label: "Close",
                    },
                });
            } catch (error) {
                toast.error(`Error removing translation: ${error.message}`, {
                    action: {
                        label: "Close",
                    },
                });
            }
        } else {
            // If the translation is not saved, save it
            try {
                const translationsRef = ref(db, `users/${user.uid}/translationsData/savedData`);
                const newTranslationRef = push(translationsRef); // Create a new reference
                const data = {
                    sourceText,
                    translatedText,
                    sourceLanguage,
                    targetLanguage,
                    createdAt: new Date().toISOString(),
                };

                await set(newTranslationRef, data); // Save the new translation to Firebase
                setAllSavedData((prev) => [
                    ...prev,
                    { id: newTranslationRef.key, ...data },
                ]); // Update the local state
                toast.success("Translation saved successfully!", {
                    action: {
                        label: "Close",
                    },
                });
            } catch (error) {
                toast.error(`Error saving translation: ${error.message}`, {
                    action: {
                        label: "Close",
                    },
                });
            }
        }
    };

    // Handle translation with debouncing
    useEffect(() => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        if (sourceText.trim().length > 0) {
            const timer = setTimeout(async () => {
                try {
                    const url = `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLanguage}|${targetLanguage}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setTranslatedText(data.responseData.translatedText);
                } catch (error) {
                    toast.error("Error fetching translation.");
                }
            }, 1000); // 1-second debounce
            setDebounceTimer(timer);
        } else {
            setTranslatedText(""); // Clear translation if input is empty
        }

        return () => clearTimeout(debounceTimer); // Cleanup on unmount or dependency change
    }, [sourceText, sourceLanguage, targetLanguage]);

    // Fetch saved data when the component mounts
    useEffect(() => {
        if (user) {
            fetchAllSavedData(); // Fetch user-specific data when user logs in
        }
    }, [user]);

    return (
        <TranslateContextData.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                sourceText,
                setSourceText,
                translatedText,
                setTranslatedText,
                sourceLanguage,
                setSourceLanguage,
                targetLanguage,
                setTargetLanguage,
                handleExchangeLangArrow,
                handleSpeakerText,
                openSlider,
                setOpenSlider,
                AllSavedData,
                AllHistoryData,
                handleSaveTranslationData,
                fetchAllSavedData,
            }}
        >
            {children}
        </TranslateContextData.Provider>
    );
};
