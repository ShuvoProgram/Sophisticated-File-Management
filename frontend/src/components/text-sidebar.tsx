import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "@/lib/types";
import { ToolSidebarHeader } from './Sidebar/tool-sidebar-header';
import { ToolSidebarClose } from './Sidebar/tool-sidebar-close';
import { cn } from '@/lib/utils';

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const SidebarContainer = styled('aside')<{
  visible: boolean;
}>(({ theme, visible }) => ({
  backgroundColor: `#ffffff`, // Ensure this is defined in your theme
  borderRight: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  backgroundRepeat: `no-repeat`,
  zIndex: 40,
  width: '360px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  visibility: visible ? 'visible' : 'hidden',
}));

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const handleAddText = (type: string, options?: Record<string, any>) => {
    editor?.addText(type, options);
  };

  return (
    <aside
    className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Text"
        description="Add text to your canvas"
      />
      <ScrollArea>
        <Box p={2} borderBottom={1} borderColor="divider">
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAddText("TextBox")}
          >
            Add a textbox
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() =>
              handleAddText("Heading", { fontSize: 80, fontWeight: 700 })
            }
            sx={{ height: '64px' }}
          >
            <span className="text-3xl font-bold">Add a heading</span>
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() =>
              handleAddText("Subheading", { fontSize: 44, fontWeight: 600 })
            }
            sx={{ height: '64px' }}
          >
            <span className="text-xl font-semibold">Add a subheading</span>
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => handleAddText("Paragraph", { fontSize: 32 })}
            sx={{ height: '64px' }}
          >
            Paragraph
          </Button>
        </Box>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};