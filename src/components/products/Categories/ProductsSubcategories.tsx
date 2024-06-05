import { FC } from 'react';

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
  const subcategoriesElems = categories.map((category) => {
    if (category.parent.id === ancestorId) {
      return (
        <Button key={category.id} id={category.id}>
          {category.name['en-US']}
        </Button>
      );
    }

    return null;
  });

  return anchorEl ? (
    <Popper open anchorEl={anchorEl} transition sx={{ zIndex: '5' }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>{subcategoriesElems}</Paper>
        </Fade>
      )}
    </Popper>
  ) : null;
};

export default ProductsSubcategories;
