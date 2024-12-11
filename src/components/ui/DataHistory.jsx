import { MdHistory } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

function ManageDataHistory() {

    const items = [
        {
            name: "History",
            icon: <MdHistory size={25} />
        },
        {
            name: "Saved",
            icon: <IoStar size={25} />
        }
    ]
    return (
        <div className='flex gap-14 items-center justify-center mt-10'>
            {
                items.map((item, index) => (
                    <Link
                        to='/'
                        key={index}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                    >

                        <span className="text-gray-500 border-2 rounded-full p-3">{item.icon}</span>
                        <span className="text-gray-500 font-medium text-sm">{item.name}</span>

                    </Link>
                ))
            }
        </div>
    )
}

export default ManageDataHistory;