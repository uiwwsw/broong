import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Input from '@/Input';
import Select from '@/Select';
import Loader from '@/Loader';
import Numeric from '@/Numeric';
import { COLOR, SIZE, colorArr, sizeArr } from '#/useTheme';
import Tooltip from '@/Tooltip';
const Main = () => {
  const style = 'm-1 flex items-center gap-4 bg-white p-3';
  const [size, setSize] = useState<SIZE>('md');
  const [color, setColor] = useState<COLOR>('primary');
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('빈값');
  return (
    <Base title="메인" backgroundColor="gray">
      <dl className={style}>
        <dt>정보</dt>
        <dd>
          <Select
            componentName="slt"
            themeColor={color}
            themeSize={size}
            debounce={0}
            defaultValue={color}
            onChange={(e) => setColor(e.target.value as COLOR)}
            options={colorArr.map((x) => ({ label: x, value: x }))}
          >
            컬러
          </Select>
        </dd>
        <dd>
          <Select
            componentName="slt"
            themeColor={color}
            themeSize={size}
            defaultValue={size}
            debounce={0}
            onChange={(e) => setSize(e.target.value as SIZE)}
            options={sizeArr.map((x) => ({ label: x, value: x }))}
          >
            사이즈
          </Select>
        </dd>
        <dd>number: {number}</dd>
        <dd>text: {text}</dd>
      </dl>
      <dl className={style}>
        <dt>셀렉트</dt>
        <dd>라벨없음</dd>
        <dd>
          <Select
            componentName="slt"
            themeColor={color}
            themeSize={size}
            debounce={0}
            defaultValue={color}
            onChange={(e) => setNumber(+e.target.value)}
            options={[1, 2, 3, 4, 5, 6, 7, 8].map((x) => ({ label: x, value: x }))}
          />
        </dd>

        <dd>
          <Select
            componentName="slt"
            themeColor={color}
            themeSize={size}
            defaultValue={size}
            debounce={400}
            onChange={(e) => setNumber(+e.target.value)}
            options={[1, 2, 3, 4, 5, 6, 7, 8].map((x) => ({ label: x, value: x }))}
          >
            디바운스
          </Select>
        </dd>
      </dl>
      <dl className={style}>
        <dt>버튼</dt>
        {/* <dd>
          <Toast show={number1 % 3 === 0} timeout={3000}>
            dawdaw
          </Toast>
          <Numeric
            onChange={(e) => {
              console.log(e);
            }}
            componentName="inp"
            themeColor="secondary"
            themeSize="md"
          />
          <Smooth>{number2 === 9 && <div>dawdawd</div>}</Smooth>
        </dd> */}
        <dd>
          <Tooltip
            timeout={1000}
            slot={
              <Button
                componentName="btn"
                themeColor={color}
                themeSize={size}
                onClick={() => setNumber(number + 1)}
                onHold={() => setNumber((prev) => prev + 1)}
              >
                기본
              </Button>
            }
          >
            홀드해보세요!
          </Tooltip>
        </dd>
        <dd>
          <Loader timeout={1000}>
            <Button
              debounce={1000}
              componentName="btn"
              themeColor={color}
              themeSize={size}
              onClick={() => setNumber(number + 1)}
            >
              디바운스 버튼
            </Button>
          </Loader>
        </dd>
        <dd>
          <Loader show={number % 19 === 0}>
            <Button
              debounce={300}
              componentName="btn"
              themeColor={color}
              themeSize={size}
              onClick={() => setNumber(number + 1)}
              onHold={() => setNumber((prev) => prev + 1)}
            >
              19배수일때 로딩
            </Button>
          </Loader>
        </dd>
      </dl>
      <dl className={style}>
        <dt>인풋</dt>
        <dd>라벨없음</dd>
        <dd>
          <Input
            placeholder="값을 입력해보아요"
            onChange={(e) => setText(e.target.value)}
            componentName="inp"
            themeColor={color}
            themeSize={size}
          />
        </dd>

        <dd>
          <Input
            debounce={400}
            placeholder="값을 입력해보아요"
            onChange={(e) => setText(e.target.value)}
            componentName="inp"
            themeColor={color}
            themeSize={size}
          >
            디바운스
          </Input>
        </dd>
        <dd>
          <Numeric
            placeholder="-10 < x < 100"
            min={-9}
            onChange={(e) => setNumber(+e)}
            componentName="inp"
            themeColor={color}
            themeSize={size}
          >
            뉴메릭
          </Numeric>
        </dd>
      </dl>

      {/* <dl className={style}>
        <dt>인풋</dt>
        <dd>
          <Input
            onChange={(e) => setNumber(+e.target.value)}
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
      </dl> */}
    </Base>
  );
};

export default Main;
