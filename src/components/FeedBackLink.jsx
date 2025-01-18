import { useContext } from 'react'
import FeedbackDrawer from './ui/FeedbackDrawer.jsx'
import { TranslateContextData } from '../context/TranslateContext.jsx'

export function FeedBackLink() {
    const { openSlider, setOpenSlider } = useContext(TranslateContextData)

    return (
        <>
            <span className='flex justify-end items-end mt-2 mr-4 text-xs cursor-pointer text-blue-600 italic' onClick={() => setOpenSlider(true)}>
                Send Feedback
            </span>
            {
                openSlider ? <FeedbackDrawer /> : ""
            }
        </>
    )
}