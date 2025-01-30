import { useContext } from 'react'
import FeedbackDrawer from '../FeedbackDrawer.jsx'
import { TranslateContextData } from '../../context/TranslateContext.jsx'

export function FeedBackLink() {
    const { openSlider, setOpenSlider } = useContext(TranslateContextData)

    return (
        <>
            <span
                className="inline-block text-xs text-blue-600 italic cursor-pointer absolute right-8 sm:right-40 p-1"
                onClick={() => setOpenSlider(true)}
            >
                Send Feedback
            </span>
            {
                openSlider ? <FeedbackDrawer /> : ""
            }
        </>
    )
}