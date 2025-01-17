import { FC, useLayoutEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import { fetchProductsCategories } from 'api/products/productsApi';
import ProductsSubcategories from 'components/products/Categories/ProductsSubcategories';
import { IBreadcrumb, IProductCategory } from 'types/products';
import notification from 'utils/notification';

interface IProductsCategoriesProps {
  setCategoryId: (categoryId: string) => void;
  setBreadcrumbs: (breadcrumbs: IBreadcrumb[]) => void;
}

const ProductsCategories: FC<IProductsCategoriesProps> = ({ setCategoryId, setBreadcrumbs }): JSX.Element => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [activeCategoryBtn, setActiveCategoryBtn] = useState<HTMLButtonElement | null>(null);

  const getCategories = async (): Promise<void> => {
    const data = await fetchProductsCategories();

    typeof data !== 'string' ? setCategories(data.results) : notification('error', data);
  };

  useLayoutEffect((): void => {
    getCategories().catch((e: Error) => notification('error', e.message));
  }, []);

  const getCategoryNameById = (id: string): string => {
    const category = categories.find((cat) => cat.id === id);

    return category ? category.name['en-US'] || '' : '';
  };

  const selectCategory = (e: React.MouseEvent): void => {
    const targetElem = e.target as HTMLButtonElement;

    if (targetElem) {
      const categoryId = targetElem.id;
      const categoryName = targetElem.textContent || '';

      setCategoryId(categoryId);

      const selectedCategory = categories.find((category) => category.id === categoryId);

      if (selectedCategory) {
        const breadcrumbs: IBreadcrumb[] = selectedCategory.ancestors
          .map((ancestor) => ({ id: ancestor.id, name: getCategoryNameById(ancestor.id) }))
          .filter((ancestor) => ancestor.name !== '')
          .concat({ id: categoryId, name: categoryName });

        setBreadcrumbs(breadcrumbs);
      } else {
        setBreadcrumbs([{ id: categoryId, name: categoryName }]);
      }
    }
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
