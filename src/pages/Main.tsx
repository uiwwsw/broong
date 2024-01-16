import Button from '@/Button';
import WithTitle from './_WithTitle';
import { useState } from 'react';
import Sample from '@/Sample';

const Main = () => {
  const [count, setCount] = useState(0);
  return (
    <WithTitle title="메인">
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>스타일 없는 버튼 {count}</dt>
        <dd>
          <Button onClick={() => setCount(count + 1)}>버튼</Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>기본 버튼{count}</dt>
        <dd>
          <Button className="btn" onClick={() => setCount(count + 1)}>
            버튼
          </Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>primary 버튼{count}</dt>
        <dd>
          <Button
            className="btn btn--primary"
            onClick={() => setCount(count + 1)}
            onHold={() => setCount((prev) => prev + 1)}
          >
            버튼
          </Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>secondary 버튼{count}</dt>
        <dd>
          <Button className="btn btn--secondary" onClick={() => setCount(count + 1)}>
            버튼
          </Button>
        </dd>
      </dl>
    </WithTitle>
  );
};

export default Main;
