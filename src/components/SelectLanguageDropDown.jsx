import { Select, Option } from "@material-tailwind/react";
import ToolTip from "./ui/ToolTip";
import { TbArrowsLeftRight } from "react-icons/tb";
import { Tab, Tabs } from "@mui/material";
import languages from "./Languages"

export function SelectLanguageDropDown() {
    

    return (
        <div className="flex w-full mt-6 px-4">

            <div className="flex justify-evenly items-center w-1/2">

                <Tabs>
                    <Tab label="Marathi" />
                    <Tab label="Hindi" />
                    <Tab label="English" />
                </Tabs>

                <div className="w-74">
                    <Select label="Select Language" className="no-scrollbar">
                        {
                            Object.entries(languages).map(([code, name]) => (
                                <Option className="text-sm" key={code} value={code}>{name}</Option>
                            ))
                        }
                    </Select>
                </div>

            </div>

            {/* languages trasnform arrow button */}
            <div>
                <ToolTip TitleToolTip={"Left Right Convert Language"}>
                    <TbArrowsLeftRight size={25} />
                </ToolTip>
            </div>

            <div className="flex justify-evenly items-center w-1/2">

                <Tabs>
                    <Tab label="Marathi" />
                    <Tab label="Hindi" />
                    <Tab label="English" />
                </Tabs>

                <div className="w-74">
                    <Select label="Select Language" className="no-scrollbar">
                        {
                            Object.entries(languages).map(([code, name]) => (
                                <Option className="text-sm" key={code} value={code}>{name}</Option>
                            ))
                        }
                    </Select>
                </div>

            </div>

        </div>
    );
}