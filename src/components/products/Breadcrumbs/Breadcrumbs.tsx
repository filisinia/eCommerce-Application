import { FC } from 'react';

import { Breadcrumbs, Button } from '@mui/material';

interface IBreadcrumbsProps {
  setCategoryId: (categoryId: string) => void;
  breadcrumbs: { id: string; name: string }[];
}

const BreadcrumbsElem: FC<IBreadcrumbsProps> = ({ setCategoryId, breadcrumbs }): JSX.Element => {
  const links = breadcrumbs.map((breadcrumb) => (
    <Button onClick={() => setCategoryId(breadcrumb.id)} key={breadcrumb.id}>
      {breadcrumb.name}
    </Button>
  ));

  return <Breadcrumbs aria-label='breadcrumb'>{links}</Breadcrumbs>;
};

export default BreadcrumbsElem;
