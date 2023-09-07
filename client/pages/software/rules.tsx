import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Category } from '@/features/category';
import { Rules } from '@/features/rules';
import { constants } from '@/common';

const RulesPage: NextPageWithLayout = () => {
  const category = constants.CATEGORIES[5];

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Category category={category} />
      <Box>
        <Rules />
      </Box>
    </Box>
  );
};

RulesPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'errors'])),
    },
  };
};

export default RulesPage;
