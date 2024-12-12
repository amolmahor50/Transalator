import { createContext, useEffect, useState } from "react";

export const TranslateContextData = createContext();

export const TranslateProvider = ({ children }) => {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en'); // Target language for translation (e.g., 'en' for English)
    const [targetLanguage, setTargetLanguage] = useState('mr'); // Target language for translation (e.g., 'hi' for English)

    console.log("text",sourceText, translatedText);
    console.log("selectedLanguages",sourceLanguage, targetLanguage)

    useEffect(() => {

    }, [sourceLanguage, targetLanguage, sourceText, translatedText])

    // when i clicked the arrow icon then selected language changed
    const handleExchangeLangArrow = () => {
        let tempValue = sourceText;
        setSourceText(toText);
        setTranslatedText(tempValue);

        let tempLang = sourceLanguage;
        setSourceLanguage(toLanguage);
        setTargetLanguage(tempLang);
    }

    return (
        <TranslateContextData.Provider value={{
            sourceText, setSourceText, translatedText, setTranslatedText, //text realated

            sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage, //languages realated 


            handleExchangeLangArrow,

        }}>
            {children}
        </TranslateContextData.Provider>
    )
}