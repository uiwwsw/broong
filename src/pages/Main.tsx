import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Sample from '@/Sample';
import Input from '@/Input';
import Select from '@/Select';
const Main = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  return (
    <Base title="메인" backgroundColor="gray">
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>버튼</dt>
        <dd>{count1}</dd>
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
        <dt>샘플</dt>
        <dd>{count2}</dd>
        <dd>
          <Sample max={99} min={6} onChange={(value) => setCount2(value)} debounce={300} />
        </dd>
      </dl>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>인풋</dt>
        <dd>{text1}</dd>
        <dd>
          <Input
            onChange={(e) => setText1(e.target.value)}
            debounce={300}
            componentName="inp"
            themeColor="secondary"
            themeSize="md"
          >
            가나다
          </Input>
        </dd>
      </dl>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>셀렉</dt>
        <dd>{text2}</dd>
        <dd>
          <Select
            componentName="slt"
            themeColor="primary"
            themeSize="lg"
            onChange={(e) => setText2(e.target.value)}
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
          >
            아이디
          </Select>
        </dd>
      </dl>
    </Base>
  );
};

export default Main;
