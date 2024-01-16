import Button from '@/Button';
import WithTitle from './_WithTitle';
import { useRef, useState } from 'react';
import Sample from '@/Sample';
import Input from '@/Input';

const Main = () => {
  const [count, setCount] = useState(0);
  return (
    <WithTitle title="메인">
      버튼 카운트: {count}
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>스타일 없는 버튼</dt>
        <dd>
          <Button onClick={() => setCount(count + 1)}>버튼</Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>기본 버튼</dt>
        <dd>
          <Button className="btn" onClick={() => setCount(count + 1)}>
            버튼
          </Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>primary 버튼</dt>
        <dd>
          <Button className="btn btn--primary" onClick={() => setCount(count + 1)}>
            버튼
          </Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>secondary 버튼</dt>
        <dd>
          <Button className="btn btn--secondary" onClick={() => setCount(count + 1)}>
            버튼
          </Button>
        </dd>
      </dl>
      <dl className="m-3 flex h-12 items-center gap-4 bg-white">
        <dt>hold 기능 버튼</dt>
        <dd>
          <Button
            className="btn btn--secondary"
            onClick={() => setCount(count + 1)}
            onHold={() => setCount((prev) => prev + 1)}
          >
            버튼
          </Button>
        </dd>
      </dl>
      샘플 컴포넌트 max: 99 min: 1
      <br />
      <Sample max={99} />
      인풋
      <Input>가나다</Input>
      <Input className="inp">가나다</Input>
    </WithTitle>
  );
};

export default Main;
