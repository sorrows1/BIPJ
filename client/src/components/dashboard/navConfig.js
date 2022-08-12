import LocalMallIcon from '@mui/icons-material/LocalMall';

const navConfig = [
  {
    title: 'product',
    icon: <LocalMallIcon height={24} width={24} />,
    path: '/dashboard/product',
    children: [
      {
        title: 'list',
        path: '/dashboard/product/list',
      },
      {
        title: 'create',
        path: '/dashboard/product/new',
      },
    ],
  },
  {
    title: 'sales',
    icon: <LocalMallIcon height={24} width={24} />,
    path: '/dashboard/sales',
    children: [
      {
        title: 'list',
        path: '/dashboard/sales/list',
      },
    ],
  },
];

export default navConfig;
