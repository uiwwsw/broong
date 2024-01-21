import { useGetList } from '!/list/application/get-list';
import useInfiniteScroll from '#/useInfiniteScroll';
import { useEffect, useMemo, useRef, useState } from 'react';

const App = () => {
  const page = useRef(0);
  const { data, trigger } = useGetList();
  const event = async () => {
    await trigger({ page: `${page.current++}` });
    console.log(page.current, '2');
  };

  const loading = useInfiniteScroll({ event, ctn: page.current <= 3 });
  return <div>{JSON.stringify(data)}</div>;
};

export default App;
