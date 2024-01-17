import Button from '@/Button';
import Base from './_Base';
import { useState } from 'react';
import Sample from '@/Sample';
import Input from '@/Input';

const Main = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState('');
  const [text1, setText1] = useState('');
  return (
    <Base title="메인" style={{ background: 'gray' }}>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>primary 버튼 {count1}</dt>
        <dd>
          <Button
            className="btn btn--primary btn--md"
            onClick={() => setCount1(count1 + 1)}
            onHold={() => setCount1((prev) => prev + 1)}
          >
            버튼
          </Button>
        </dd>
      </dl>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>샘플 컴포넌트 max: 99 min: 1// {count2}</dt>
        <dd>
          <Sample max={99} onChange={(value) => setCount2(value)} />
        </dd>
      </dl>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>인풋</dt>
        <dd>
          <Input className="inp inp--md inp--primary">가나다</Input>
        </dd>
      </dl>
    </Base>
  );
};

export default Main;
