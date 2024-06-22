import { ChangeEvent, FC, useState } from 'react';

import { Box, Button, Slider, Stack, Typography } from '@mui/material';

import PriceValueInput from 'components/products/ProductsFilter/ProductPriceInput';

interface IProductFilter {
  filterByPrice: (min: number, max: number) => void;
  minCategoryPrice: number;
  maxCategoryPrice: number;
}

const ProductFilter: FC<IProductFilter> = ({ filterByPrice, minCategoryPrice, maxCategoryPrice }): JSX.Element => {
  const [minPrice, setMinPrice] = useState<number>(minCategoryPrice);
  const [maxPrice, setMaxPrice] = useState<number>(maxCategoryPrice);
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    if (typeof newValue === 'number') return;

    const [min, max] = newValue;

    setPriceRange(newValue);
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleFilterBtnClick = (): void => {
    filterByPrice(minPrice, maxPrice);
  };

  const handleMinInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newMinValue = Number(event.target.value);

    if (newMinValue >= minCategoryPrice && newMinValue <= maxPrice) {
      setMinPrice(newMinValue);
      setPriceRange([newMinValue, priceRange[1]]);
    }
  };

  const handleMaxInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newMaxValue = Number(event.target.value);

    if (newMaxValue >= minPrice && newMaxValue <= maxCategoryPrice) {
      setMaxPrice(newMaxValue);
      setPriceRange([priceRange[0], newMaxValue]);
    }
  };

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Typography>Price:</Typography>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay='auto'
          disableSwap
          min={minCategoryPrice}
          max={maxCategoryPrice}
          sx={{ width: '250px', margin: '15px' }}
        />
      </Box>
      <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
        <PriceValueInput label='min' value={minPrice} onChange={handleMinInputChange} />
        <Typography>-</Typography>
        <PriceValueInput label='max' value={maxPrice} onChange={handleMaxInputChange} />
      </Stack>
      <Button onClick={handleFilterBtnClick} sx={{ marginLeft: '8px' }} variant='contained'>
        Filter
      </Button>
    </>
  );
};

export default ProductFilter;
