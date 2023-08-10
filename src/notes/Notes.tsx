import { useState } from 'react';
import { Note } from './model.ts';
import { AddNoteForm } from './AddNoteForm';
import { NoteCard } from './NoteCard.tsx';
import { Box } from '@mui/system';
import sgMail from '@sendgrid/mail';



const sxRoot = {
  display: 'grid',
  width: '60%',
  height: '100%',
  gridTemplateRows: 'auto 1fr',
  gap: 2,
};

const sxNotes = {
  display: 'grid',
  alignSelf: 'start',
  gap: 1,
};

sgMail.setApiKey('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');

const sendEmail = (note: Note) => {
  const msg = {
    to: ['towhidtayeb10@gmail.com', 'tayebtowhid10@gmail.com'], // Replace with your email address
    from: 'towhidtayeb10@gmail.com', // Replace with the email you want to send from
    subject: 'New Note Added',
    text: note.content,
    html: '<h1> Hello from sendgrid </h1>',
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (note: Note) => {
    setNotes(notes.concat(note));
    sendEmail(note); // Send the note via email
  };

  return (
    <Box sx={sxRoot}>
      <AddNoteForm onAddNote={handleAddNote} sendEmail={sendEmail}/>
      <Box sx={sxNotes}>
        {notes
          .sort((n1: Note, n2: Note) => n2.timestamp - n1.timestamp)
          .map((note: Note) => (
            <NoteCard key={note.timestamp} note={note} />
          ))}
      </Box>
    </Box>
  );
};




