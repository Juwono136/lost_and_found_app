import { useState, useRef, useEffect } from "react";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Button,
} from "@material-tailwind/react";

const ColumnSelector = ({ allFields, visibleFields, setVisibleFields }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleField = (field) => {
    setVisibleFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Trigger button */}
      <Button size="sm" className="bg-purple-400" onClick={() => setOpen((prev) => !prev)}>
        Filter Columns
      </Button>

      {/* Dropdown menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 mt-2 z-50"
          style={{ minWidth: "200px" }}
        >
          <Card className="h-48 overflow-y-auto shadow-lg">
            <List>
              {allFields.map((field) => {
                const isChecked = visibleFields.includes(field);
                return (
                  <ListItem key={field} className="p-0">
                    <label className="flex w-full cursor-pointer items-center px-3 py-2">
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          checked={isChecked}
                          onChange={() => toggleField(field)}
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{ className: "p-0" }}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="font-medium capitalize"
                      >
                        {field.replace(/_/g, " ")}
                      </Typography>
                    </label>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;
