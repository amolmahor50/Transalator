import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { IoIosStarOutline } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ToolTip from "./ui/ToolTip"
import { useContext } from "react";
import { TranslateContextData } from "../context/TranslateContext";

export function HistoryData() {

  const { AllHistoryData } = useContext(TranslateContextData)

  return (
    <>
      {
        AllHistoryData.length === 0 ?
          <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <Typography variant="h5">
              No past translations
            </Typography>
            <Typography variant="body2">
              Manage your history settings in <span className="text-blue-700">My Activity</span>
            </Typography>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", gap: "8px" }}
            >
              Learn More
            </Button>
          </div>
          :
          <Stack>
            <Typography
              variant="h6"
              className="border-b-2 pb-4"
            >
              History
            </Typography>
            <Typography
              variant="body2"
              color="blue"
              className="w-full flex justify-end py-2 border-b-2 cursor-pointer"
            >
              Clear all history
            </Typography>

            <Box className="mt-6">
              {
                AllHistoryData?.map((type) => (
                  <Stack key={type.id} className="cursor-pointer rounded-lg hover:bg-accent p-2 flex flex-col">
                    <Stack direction="row" className="flex justify-between items-center">
                      <Typography variant="body2" className="border rounded-full px-2">
                        {type.sourceLang} - {type.targetLang}
                      </Typography>
                      <div className="flex items-center">
                        <ToolTip TitleToolTip="Save Translation">
                          <Rating name="customized-1" defaultValue={0} max={1} />
                        </ToolTip>
                        <ToolTip TitleToolTip="More Option">
                          <PiDotsThreeVerticalBold size={20} />
                        </ToolTip>
                      </div>
                    </Stack>
                    <Stack direction="column">
                      <Typography variant="caption">
                        {type.sourceText}
                      </Typography>
                      <Typography variant="caption">
                        {type.translateText}
                      </Typography>
                    </Stack>
                  </Stack>
                ))
              }
            </Box>
          </Stack>
      }
    </>

  )
}
