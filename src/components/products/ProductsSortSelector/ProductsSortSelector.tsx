import { useState } from 'react';

import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const sortOptions: { value: string; name: string }[] = [
  { value: 'price asc', name: 'Sort by price increase' },
  { value: 'price desc', name: 'Sort by price decrese' },
  { value: 'name.en-US asc', name: 'Sort by name increase' },
  { value: 'name.en-US desc', name: 'Sort by name decrese' },
];

interface IProductsSortSelector {
  sortProducts: (type: string, direction: string) => void;
}

const ProductsSortSelector = ({ sortProducts }: IProductsSortSelector): JSX.Element => {
  const [sortProductName, setSortProductName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof sortProductName>): void => {
    const {
      target: { value },
    } = event;

    if (typeof value === 'string') {
      const option = JSON.parse(value) as { value: string; name: string };

      setSortProductName(typeof option.name === 'string' ? option.name.split(',') : option.name);

      const [type, direction] = option.value.split(' ');

      sortProducts(type, direction);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='sort__selector'>Sort by</InputLabel>
        <Select
          labelId='sort__selector'
          value={sortProductName}
          onChange={handleChange}
          input={<OutlinedInput label='Sort by' />}
          renderValue={(selected) => selected.join(', ')}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={JSON.stringify(option)}>
              <Checkbox checked={sortProductName.indexOf(option.value) > -1} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ProductsSortSelector;
