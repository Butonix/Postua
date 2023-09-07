import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';

const Fresh: NextPageWithLayout = () => {
  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter
        pageKey={'fresh'}
        options={constants.FILTERS_RARING}
        defaultValue={constants.FILTERS_RARING[1]}
      />
      <PostList />
    </Box>
  );
};

Fresh.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default Fresh;