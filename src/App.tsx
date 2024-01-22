import { useGetList } from '!/test/application/get-list';
import useInfiniteScroll from '#/useInfiniteScroll';
import Card from '@/Card';
import Loading from '@/Loading';
import { useRef } from 'react';

const App = () => {
  const page = useRef(0);
  const { data, trigger, isMutating } = useGetList();
  const event = async () => {
    if (page.current > 3) return false;
    await trigger({ page: `${++page.current}` });
  };

  useInfiniteScroll({ event });
  return (
    <>
      {isMutating ? <Loading /> : null}
      <div className="grid-cols-card-list m-auto grid justify-center gap-9 py-9">
        {data?.map((x) => <Card key={x.id} {...x} />)}
      </div>
    </>
  );
};

export default App;
