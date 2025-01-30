import { MdHistory } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet";
import { HistoryData } from "../History";
import { SavedData } from "../Saved";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function ManageDataHistory() {
    return (
        <div className='flex gap-14 items-center justify-center mt-10'>
            {/* History Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <span className="flex flex-col items-center gap-2 cursor-pointer">
                        <span className="text-gray-500 border-2 rounded-full p-3">
                            <MdHistory size={25} />
                        </span>
                        <span className="text-gray-500 font-medium text-sm">History</span>
                    </span>
                </SheetTrigger>
                <SheetContent>
                    <VisuallyHidden>
                        <SheetTitle>History</SheetTitle>
                        <SheetDescription>View your recent history</SheetDescription>
                    </VisuallyHidden>
                    <HistoryData />
                </SheetContent>
            </Sheet>

            {/* Saved Data Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <span className="flex flex-col items-center gap-2 cursor-pointer">
                        <span className="text-gray-500 border-2 rounded-full p-3">
                            <IoStar size={25} />
                        </span>
                        <span className="text-gray-500 font-medium text-sm">Saved</span>
                    </span>
                </SheetTrigger>
                <SheetContent>
                    <VisuallyHidden>
                        <SheetTitle>Saved</SheetTitle>
                        <SheetDescription>View your saved items</SheetDescription>
                    </VisuallyHidden>
                    <SavedData />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default ManageDataHistory;
