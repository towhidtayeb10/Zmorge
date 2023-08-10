import { Card, CardContent, Typography } from '@mui/material'
import { Note } from './model.ts'

interface Props {
  note: Note
}

export const NoteCard = ({ note }: Props) => (
  <Card>
    <CardContent>
      <Typography align={'right'}>{new Date(note.timestamp).toDateString()}</Typography>
      <Typography component={'div'}>
        {note.content.split('\n').map((text: string, key: number) => {
          return <div key={key}>{text}</div>
        })}
      </Typography>
    </CardContent>
  </Card>
)
