import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Sample from '@/Sample';
import Input from '@/Input';
import Select from '@/Select';
import Smooth from '@/Smooth';
import Loader from '@/Loader';
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
          <Smooth>{count2 === 9 && <div>dawdawd</div>}</Smooth>
        </dd>
        <dd>
          <Loader debounceTime={5000}>
            <Button className="btn btn--primary btn--md overflow-hidden" onClick={() => setCount1(count1 + 1)}>
              버튼
            </Button>
          </Loader>
        </dd>
        <dd>
          <Loader debounceTime={300} loading={count1 === 3}>
            <Button
              debounce={300}
              className="btn btn--primary btn--md"
              onClick={() => setCount1(count1 + 1)}
              onHold={() => setCount1((prev) => prev + 1)}
            >
              디바운스 버튼
            </Button>
          </Loader>
        </dd>
      </dl>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>샘플</dt>
        <dd>{count2}</dd>
        <dd>
          <Sample debounce={0} max={99} min={6} onChange={(value) => setCount2(value)} />
        </dd>
      </dl>
      <dl className="m-1 flex h-12 items-center gap-4 bg-white p-3">
        <dt>인풋</dt>
        <dd>{text1}</dd>
        <dd>
          <Input
            onChange={(e) => setText1(e.target.value)}
            componentName="inp"
            themeColor="secondary"
            themeSize="md"
            debounce={0}
          >
            가나다
          </Input>
        </dd>
        <dd>
          <Input
            onChange={(e) => setText1(e.target.value)}
            componentName="inp"
            themeColor="secondary"
            themeSize="md"
            debounce={300}
          >
            디바운스 가나다
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
            debounce={0}
            onChange={(e) => setText2(e.target.value)}
            options={[
              { label: '0', value: '0' },
              { label: '300', value: '300' },
            ]}
          >
            아이디
          </Select>
        </dd>
        <dd>
          <Select
            componentName="slt"
            themeColor="primary"
            themeSize="lg"
            debounce={300}
            onChange={(e) => setText2(e.target.value)}
            options={[
              { label: '0', value: '0' },
              { label: '300', value: '300' },
            ]}
          >
            디바운스 아이디
          </Select>
        </dd>
      </dl>
    </Base>
  );
};

export default Main;
