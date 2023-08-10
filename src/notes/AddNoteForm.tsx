import { ChangeEvent, useState } from 'react'
import { Note } from './model.ts'
import { Button, FormGroup, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const sxForm = {
  display: 'grid',
  gridTemplateRows: '1fr auto',
  gap: 1,
}

const sxButton = {
  justifySelf: 'start',
}

interface Props {
  onAddNote: (note: Note) => void;
  sendEmail: (note: Note) => void; // Add the sendEmail prop
}

export const AddNoteForm = ({ sendEmail }: Props) => {
  const [noteText, setNoteText] = useState<string>('')

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setNoteText(text)
  }

  const handleButtonClick = () => {
    const note: Note = { timestamp: Date.now(), content: noteText };
    sendEmail(note); // Send the note via email
    setNoteText('')
  }

  const isButtonDisabled = noteText.length === 0

  return (
    <div>
    <FormGroup sx={sxForm}>
      
      <TextField
        label={'Feedback...'}
        multiline={true}
        variant={'outlined'}
        rows={5}
        value={noteText}
        onChange={handleTextChange}
        />

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <Button sx={sxButton} variant="outlined" disabled={isButtonDisabled} onClick={handleButtonClick} startIcon={<DeleteIcon />}>
          Lösche
        </Button>
        <Button sx={sxButton} variant="contained" disabled={isButtonDisabled} onClick={handleButtonClick} endIcon={<SendIcon />}>
          schicken
        </Button>
      </div>
      
    </FormGroup>
    </div>
  )
}
