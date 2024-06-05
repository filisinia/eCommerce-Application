import { useLayoutEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import ProductsSubcategories from './ProductsSubcategories';

import { fetchProductsCategories } from 'api/products/productsApi';
import { IProductCategory } from 'types/products';
import notification from 'utils/notification';

const ProductsCategories = (): JSX.Element => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [activeCategoryBtn, setActiveCategoryBtn] = useState<HTMLButtonElement | null>(null);

  const resetActiveCategory = (): void => {
    setActiveCategoryBtn(null);
  };

  const getCategories = async (): Promise<void> => {
    const data = await fetchProductsCategories();

    typeof data !== 'string' ? setCategories(data.results) : notification('error', data);
  };

  useLayoutEffect(() => {
    getCategories().catch((e: Error) => notification('error', e.message));
  }, []);

  const categoriesElems = categories.map((category) => {
    if (category.ancestors && category.ancestors.length === 0) {
      return (
        <Button
          key={category.id}
          id={category.id}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (e.currentTarget instanceof HTMLButtonElement) setActiveCategoryBtn(e.currentTarget);
          }}
          onMouseLeave={resetActiveCategory}
        >
          {category.name['en-US']}
        </Button>
      );
    }

    return null;
  });

  return (
    <>
      <Box>{categoriesElems}</Box>
      <ProductsSubcategories
        anchorEl={activeCategoryBtn}
        ancestorId={activeCategoryBtn?.id || ''}
        categories={categories}
      />
    </>
  );
};

export default ProductsCategories;
