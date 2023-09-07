import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';

const Popular: NextPageWithLayout = () => {
  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter options={constants.FILTERS_TIME} />
      <PostList />
    </Box>
  );
};

Popular.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default Popular;