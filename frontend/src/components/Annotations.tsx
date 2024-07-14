import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, Typography } from '@mui/material';

const Annotations = ({ annotations, onAdd }: any) => {
  const [text, setText] = useState('');

  const handleAddAnnotation = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Annotations</Typography>
      <List>
        {annotations.map((annotation: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
          <ListItem key={index}>
            <ListItemText primary={annotation} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Annotation"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <Button variant="contained" onClick={handleAddAnnotation}>Add Annotation</Button>
    </Box>
  );
};

export default Annotations;