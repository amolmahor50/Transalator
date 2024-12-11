import { createContext, useState } from "react";

export const TranslateContextData = createContext();

export const TranslateProvider = ({children}) => {
    const [inputText, setInputText] = useState(''); // Text entered by the user
    const [translatedText, setTranslatedText] = useState(''); // Translated text
    const [targetLanguage, setTargetLanguage] = useState('en'); // Target language for translation (e.g., 'en' for English)

    return(
        <TranslateContextData.Provider value={{}}>
            {children}
        </TranslateContextData.Provider>
    )
}