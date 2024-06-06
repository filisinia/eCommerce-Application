import { FC } from 'react';

import { Breadcrumbs, Button } from '@mui/material';

interface IBreadcrumbsProps {
  setCategoryId: (categoryId: string) => void;
  setBreadcrumbs: (breadcrumb: { id: string; name: string }[]) => void;
  breadcrumbs: { id: string; name: string }[];
}

const BreadcrumbsElem: FC<IBreadcrumbsProps> = ({ setCategoryId, setBreadcrumbs, breadcrumbs }): JSX.Element => {
  const handleClick = (id: string, index: number): void => {
    setCategoryId(id);

    const newBreadcrumbs = breadcrumbs.splice(0, index + 1);

    setBreadcrumbs(newBreadcrumbs);
  };

  const links = breadcrumbs.map((breadcrumb, index) => (
    <Button onClick={() => handleClick(breadcrumb.id, index)} key={breadcrumb.id}>
      {breadcrumb.name}
    </Button>
  ));

  return <Breadcrumbs aria-label='breadcrumb'>{links}</Breadcrumbs>;
};

export default BreadcrumbsElem;
