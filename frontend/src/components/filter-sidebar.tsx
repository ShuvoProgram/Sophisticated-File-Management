import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { List, ListItem, ListItemText, Box } from "@mui/material";
import { ActiveTool, Editor, filters } from "@/lib/types";
import { ToolSidebarHeader } from "./Sidebar/tool-sidebar-header";
import { ToolSidebarClose } from "./Sidebar/tool-sidebar-close";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
    className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filters" ? "visible" : "hidden"
      )}
    >
      <Box className="flex items-center justify-between p-4 border-b">
        <ToolSidebarHeader
          title="Filters"
          description="Apply a filter to selected image"
        />
      
      </Box>
      <ScrollArea>
        <List>
          {filters.map((filter) => (
            <ListItem 
              button 
              key={filter} 
              onClick={() => editor?.changeImageFilter(filter)}
              className="w-full h-16 hover:opacity-70"
            >
              <ListItemText primary={filter} />
            </ListItem>
          ))}
        </List>
      </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
