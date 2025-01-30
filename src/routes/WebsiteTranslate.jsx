import React from 'react'
import Container from '../components/ui/Container'
import { Label } from "@/components/ui/label"
import { GrLinkNext } from "react-icons/gr";
import ToolTip from '../components/ui/ToolTip';
import { Stack } from '@mui/material';
import { FeedBackLink } from '../components/ui/FeedBackLink';
import ManageDataHistory from '../components/ui/DataHistory';
import { Input } from "@/components/ui/input"

function Website() {
  return (
    <>

      <Container className='sm:border-2 border-b sm:rounded-lg h-[220px] flex justify-center items-center'>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="website" className="ml-2 text-blue-800">Website</Label>
          <Input type="website" id="website" className="border-blue-800 border-2 focus:border-none" placeholder="Website" />
        </div>

        <Stack className='bg-blue-800 text-sm hover:bg-blue-600 mt-4 ml-6 text-white rounded-full'>
          <ToolTip TitleToolTip="Translate" >
            <GrLinkNext color='white' className='text-lg' />
          </ToolTip>
        </Stack>

      </Container>

      <FeedBackLink />
      <ManageDataHistory />
    </>
  )
}

export default Website