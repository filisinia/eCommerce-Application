import { FC } from 'react';

import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';

interface IBreadcrumbs {
  breadcrumbs: (string | null)[];
}

const BreadcrumbsElem: FC<IBreadcrumbs> = ({ breadcrumbs }): JSX.Element => {
  const links = breadcrumbs.map((breadcrumb) => (
    <Link to={`/${breadcrumb}`} key={breadcrumb}>
      {breadcrumb}
    </Link>
  ));

  return <Breadcrumbs aria-label='breadcrumb'>{links}</Breadcrumbs>;
};

export default BreadcrumbsElem;
