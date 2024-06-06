import { ChangeEvent, useState } from 'react';

import { Slider, Stack, Typography } from '@mui/material';

import PriceValueInput from 'components/products/ProductsFilter/ProductPriceInput';

const ProductFilter = (): JSX.Element => {
  const minCategoryPrice = 0;
  const maxCategoryPrice = 1000;

  const [minPrice, setMinPrice] = useState<number>(minCategoryPrice);
  const [maxPrice, setMaxPrice] = useState<number>(maxCategoryPrice);
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = (event: Event, newValue: number[]): void => {
    setPriceRange(newValue);
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
      <Typography>Price:</Typography>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay='auto'
        disableSwap
        min={minCategoryPrice}
        max={maxCategoryPrice}
        sx={{ maxWidth: '300px', margin: '15px' }}
      />
      <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
        <PriceValueInput label='min' value={minPrice} onChange={handleMinInputChange} />
        <Typography>-</Typography>
        <PriceValueInput label='max' value={maxPrice} onChange={handleMaxInputChange} />
      </Stack>
    </>
  );
};

export default ProductFilter;
