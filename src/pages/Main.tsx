import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Input from '@/Input';
import Combo from '@/Combo';
import Loader from '@/Loader';
import Numeric from '@/Numeric';
import { COLOR, SIZE, colorArr, sizeArr } from '#/theme';
import Tooltip from '@/Tooltip';
import Currency from '@/Currency';
import Toast from '@/Toast';
const Main = () => {
  const style = 'm-1 p-3 [&>*]:inline-block [&>*]:m-2 [&>*]:align-middle';
  const [size, setSize] = useState<SIZE>('md');
  const [color, setColor] = useState<COLOR>('secondary');
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('빈값');
  return (
    <Base title="메인">
      <Toast show delay={5000}>
        tab 버튼을 눌러보세요~. 콤보박스가 열리고 옵션이동 후 다음 엘리먼트로 포커스가 잘 이동됩니다.
      </Toast>
      <dl className={style}>
        <dt>테마</dt>
        <dd>
          <Combo
            themeColor={color}
            themeSize={size}
            delay={0}
            defaultValue={color}
            onChange={(e) => setColor(e as COLOR)}
            options={colorArr.map((x) => ({ label: x, value: x }))}
          >
            컬러
          </Combo>
          {/* <Code>
            {`
<Combo
  themeColor={color}
  themeSize={size}
  delay={0}
  defaultValue={color}
  onChange={(e) => setColor(e as COLOR)}
  options={colorArr.map((x) => ({ label: x, value: x }))}
>
  컬러
</Combo>
        `}
          </Code> */}
        </dd>
        <dd>
          <Combo
            themeColor={color}
            themeSize={size}
            defaultValue={size}
            delay={0}
            onChange={(e) => setSize(e as SIZE)}
            options={sizeArr.map((x) => ({ label: x, value: x }))}
          >
            사이즈
          </Combo>
        </dd>
        <dd>number: {number}</dd>
        <dd>text: {text}</dd>
      </dl>
      <dl className={style}>
        <dt>셀렉트</dt>
        <dd>라벨없음</dd>
        <dd>
          <Combo
            themeColor={color}
            themeSize={size}
            delay={0}
            defaultValue={color}
            onChange={(e) => setNumber(+e)}
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
            ]}
          />
        </dd>

        <dd>
          <Combo
            themeColor={color}
            themeSize={size}
            defaultValue={size}
            onChange={(e) => setNumber(+e)}
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
            ]}
          >
            디바운스
          </Combo>
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
            themeColor="secondary"
            themeSize="md"
          />
          <Smooth>{number2 === 9 && <div>dawdawd</div>}</Smooth>
        </dd> */}
        <dd>
          <Tooltip
            timeout={3000}
            slot={
              <Button
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
            <Button delay={1000} themeColor={color} themeSize={size} onClick={() => setNumber(number + 1)}>
              디바운스 버튼
            </Button>
          </Loader>
        </dd>
        <dd>
          <Tooltip
            timeout={3000}
            slot={
              <Loader show={number !== 0 && number % 19 === 0}>
                <Button
                  delay={300}
                  themeColor={color}
                  themeSize={size}
                  onClick={() => setNumber(number + 1)}
                  onHold={() => setNumber((prev) => prev + 1)}
                >
                  19배수일때 로딩
                </Button>
              </Loader>
            }
          >
            홀드해보세요!
          </Tooltip>
        </dd>
      </dl>
      <dl className={style}>
        <dt>인풋</dt>
        <dd>라벨없음</dd>
        <dd>
          <Input placeholder="값을 입력해보아요" onChange={(e) => setText(e)} themeColor={color} themeSize={size} />
        </dd>

        <dd>
          <Input
            delay={400}
            placeholder="값을 입력해보아요"
            onChange={(e) => setText(e)}
            themeColor={color}
            themeSize={size}
          >
            디바운스
          </Input>
        </dd>
        <dd>
          <Numeric onChange={(e) => setNumber(+e)} themeColor={color} themeSize={size}>
            뉴메릭
          </Numeric>
        </dd>
        <dd>
          <Currency onChange={(e) => setNumber(+e)} themeColor={color} themeSize={size}>
            커런시
          </Currency>
        </dd>
      </dl>
    </Base>
  );
};

export default Main;
