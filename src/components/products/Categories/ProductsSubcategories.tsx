import { FC, useMemo, useState } from 'react';

import { Button, Fade, Paper, Popper } from '@mui/material';

import { IProductCategory } from 'types/products';

interface IProductsSubcategoriesProps {
  anchorEl: HTMLButtonElement | null;
  ancestorId: string;
  categories: IProductCategory[];
}

const ProductsSubcategories: FC<IProductsSubcategoriesProps> = ({
  anchorEl,
  ancestorId,
  categories,
}): JSX.Element | null => {
  const [activeSubcategoryBtn, setActiveSubcategoryBtn] = useState<HTMLButtonElement | null>(null);

  const subcategoriesElems = useMemo(
    () =>
      categories
        .filter((category) => category?.parent?.id && category.parent.id === ancestorId)
        .map((category) => (
          <Button
            key={category.id}
            id={category.id}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setActiveSubcategoryBtn(e.currentTarget);
            }}
          >
            {category.name['en-US']}
          </Button>
        )),
    [ancestorId, categories],
  );

  const handleClosePopper = (): void => {
    setActiveSubcategoryBtn(null);
  };

  return anchorEl && subcategoriesElems.length > 0 ? (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition sx={{ zIndex: '5' }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper onMouseLeave={handleClosePopper}>
            {activeSubcategoryBtn ? (
              <ProductsSubcategories
                anchorEl={activeSubcategoryBtn}
                ancestorId={activeSubcategoryBtn?.id || ''}
                categories={categories}
              />
            ) : null}
            {subcategoriesElems}
          </Paper>
        </Fade>
      )}
    </Popper>
  ) : null;
};

export default ProductsSubcategories;
