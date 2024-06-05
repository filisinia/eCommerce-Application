import { FC, useLayoutEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import ProductsSubcategories from './ProductsSubcategories';

import { fetchProductsCategories } from 'api/products/productsApi';
import { IProductCategory } from 'types/products';
import notification from 'utils/notification';

interface IProductsCategoriesProps {
  setCategoryId: (categoryId: string) => void;
}

const ProductsCategories: FC<IProductsCategoriesProps> = ({ setCategoryId }): JSX.Element => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [activeCategoryBtn, setActiveCategoryBtn] = useState<HTMLButtonElement | null>(null);

  const getCategories = async (): Promise<void> => {
    const data = await fetchProductsCategories();

    typeof data !== 'string' ? setCategories(data.results) : notification('error', data);
  };

  useLayoutEffect((): void => {
    getCategories().catch((e: Error) => notification('error', e.message));
  }, []);

  const selectCategory = (e: React.MouseEvent): void => {
    const targetElem = e.target;

    if (targetElem instanceof HTMLButtonElement) setCategoryId(targetElem.id);
  };

  const removeActiveCategory = (): void => {
    setActiveCategoryBtn(null);
  };

  const categoriesElems = categories.map((category) => {
    if (category.ancestors && category.ancestors.length === 0) {
      return (
        <Button
          key={category.id}
          id={category.id}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (e.currentTarget instanceof HTMLButtonElement) setActiveCategoryBtn(e.currentTarget);
          }}
        >
          {category.name['en-US']}
        </Button>
      );
    }

    return null;
  });

  return (
    <Box onMouseLeave={removeActiveCategory} onClick={selectCategory}>
      <Box>{categoriesElems}</Box>
      <ProductsSubcategories
        anchorEl={activeCategoryBtn}
        ancestorId={activeCategoryBtn?.id || ''}
        categories={categories}
      />
    </Box>
  );
};

export default ProductsCategories;
