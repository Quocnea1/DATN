import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { BreadcrumbsStyled, BreadcrumbsWrapper, CmBreadcrumbsStyle } from '@/components/organisms/sidebar/styled';

import { getURLObjectFromLink } from '@/utils/parseUtil';

interface IBreadcrumb {
  key: number;
  name: string;
  url?: string;
}

const formatText = (text: string) => {
  if (!text) return '';

  if (text.includes('-')) {
    const textArr = text.split('-');
    const newText: string[] = [];

    textArr.map((item) => {
      newText.push(item.charAt(0).toUpperCase() + item.slice(1));
    });

    return newText.join(' ');
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

//TODO: Loading VITE_API_URL from environment and remove styled
const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState<string>('App & SG');
  const [breadcrumbsData, setBreadcrumbsData] = useState<IBreadcrumb[]>([]);

  useEffect(() => {
    const data = location.pathname.split('/').filter((item) => item !== '');

    const breadcrumb: IBreadcrumb[] = [];

    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        breadcrumb.push({ name: formatText(data[i]), url: '/' + data[i], key: i });
        continue;
      }

      if (i === data.length - 1) {
        breadcrumb.push({ name: 'Current Page', key: i });
        continue;
      }

      breadcrumb.push({ name: formatText(data[i]), url: '/' + data[i - 1] + '/' + data[i], key: i });
    }

    setBreadcrumbsData(breadcrumb);
    setPageTitle(formatText(data[data.length - 1]));
  }, [location.pathname]);

  const serverInfo = (): string => {
    const url = import.meta.env.VITE_API_URL;
    const objectUrl = getURLObjectFromLink(url || 'http://118.67.132.38:24000/proobject/proobject-managerops');
    return `(Server ${objectUrl.hostname}${objectUrl.port ? ` / ${objectUrl.port}` : ''} )`;
  };

  return (
    <CmBreadcrumbsStyle>
      <BreadcrumbsWrapper>
        <BreadcrumbsStyled separator="›">
          {!!breadcrumbsData &&
            breadcrumbsData.map((item) => (
              <a
                key={item.key}
                onClick={() => {
                  navigate(item.url || '#');
                }}
              >
                {item.name}
              </a>
            ))}
        </BreadcrumbsStyled>
        <Typography
          variant="h6"
          gutterBottom
        >
          {pageTitle}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: '400' }}
        >
          {serverInfo()}
        </Typography>
      </BreadcrumbsWrapper>
    </CmBreadcrumbsStyle>
  );
};

export default Breadcrumbs;
