import React, { useState } from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup, Select, MenuItem, SelectChangeEvent, Stack } from '@mui/material';

interface FilterSortProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sortKey: string) => void;
}

const FilterSortControls: React.FC<FilterSortProps> = ({ categories, onCategoryChange, onSortChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleSortChange = (event: React.MouseEvent<HTMLElement>, newSortKey: string) => {
    setSortKey(newSortKey);
    onSortChange(newSortKey);
  };

  return (
<Box sx={{ margin: 2 }}>
      <Stack spacing={2}>
        {/* First row: Category Selector */}
        <Select
          size="small" // Sets the Select to a smaller size
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          fullWidth
          inputProps={{ 'aria-label': 'All categories' }}
          sx={{
            height: '35px', // Adjust the height as needed
            maxWidth: '60%',
            '& .MuiSelect-select': {
              paddingTop: '2px',
              paddingBottom: '2px',
            },
            '& .MuiSvgIcon-root': { // Adjust the icon size if necessary
              width: '20px',
              height: '20px',
            },
          }}
        >
          <MenuItem value="">
            All Categories
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>

        {/* Second row: Toggle Buttons for Sorting */}
        <ToggleButtonGroup
          value={sortKey}
          exclusive
          onChange={handleSortChange}
          aria-label="text alignment"
          fullWidth
          sx={{
            // If you want to add some custom styling to the group itself, you can do so here
            '.MuiToggleButtonGroup-grouped': {
              // Apply styles to the children (ToggleButtons) of the ToggleButtonGroup
              flex: 1,  // This makes each button flex to fill the space
              // Set a minimum width for each button if needed
              minWidth: '120px', // Adjust the minimum width as needed
            }
          }}
        >
          <ToggleButton size='small' value="time" aria-label="left aligned">
            Latest
          </ToggleButton>
          <ToggleButton size='small' value="popularity" aria-label="centered">
            Top
          </ToggleButton>
          <ToggleButton size='small' value="new" aria-label="right aligned">
            New (17)
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
};

export default FilterSortControls;