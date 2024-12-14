import { createContext, useEffect, useState } from "react";

export const TranslateContextData = createContext();

export const TranslateProvider = ({ children }) => {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en'); // Source language (e.g., 'mr' for Marathi)
    const [targetLanguage, setTargetLanguage] = useState('mr'); // Target language (e.g., 'fr' for French)

    const [debounceTimer, setDebounceTimer] = useState(null);

    // Function to handle the exchange of languages when the arrow is clicked
    const handleExchangeLangArrow = () => {
        let tempValue = sourceText;
        setSourceText(translatedText);
        setTranslatedText(tempValue);

        let tempLang = sourceLanguage;
        setSourceLanguage(targetLanguage);
        setTargetLanguage(tempLang);
    }

    // voice speech handler fromTextArea and toTextArea
    const utterText = (text, languages) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterText.lang = languages;
        synth.speak(utterance);
        showAlert("Speak speech your paragraph...!", "Success");
        titleShow("Speak Speech On");
    }

    const handleSpeakerText = (id) => {
        if (id == "sourceText") {
            utterText(sourceText, sourceLanguage);
        }
        else if (id == "translatedText") {
            utterText(translatedText, targetLanguage);
        }
    }

    // handling API and changing the languages with debouncing
    useEffect(() => {
        // Clear the translated text immediately if sourceText is empty
        if (sourceText.length === 0) {
            setTranslatedText(""); // Clear the translated text if sourceText is empty
        }

        // Clean up previous timer if a new keystroke happens
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        if (sourceText.length > 0) {
            // Set a new timeout to delay the API call by 1 second (you can adjust the delay time)
            const newTimer = setTimeout(() => {
                let url = `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLanguage}|${targetLanguage}`;
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        setTranslatedText(data.responseData.translatedText);
                    });
            }, 1000); // 1 second debounce delay

            // Set the new debounce timer
            setDebounceTimer(newTimer);
        }

        // Clean up the timer when the component unmounts or dependencies change
        return () => clearTimeout(debounceTimer);
    }, [sourceText, translatedText, sourceLanguage, targetLanguage]); // dependencies include sourceText to trigger on text change

    return (
        <TranslateContextData.Provider value={{
            sourceText, setSourceText, translatedText, setTranslatedText, // text related
            sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage, // language related
            handleExchangeLangArrow, handleSpeakerText // language exchange function
        }}>
            {children}
        </TranslateContextData.Provider>
    )
}
