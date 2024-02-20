import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Input from '@/Input';
import Select from '@/Select';
import Loader from '@/Loader';
import Numeric from '@/Numeric';
import { COLOR, SIZE, colorArr, sizeArr } from '#/useTheme';
import Tooltip from '@/Tooltip';
import Form from '@/Form';
const Main = () => {
  const style = 'm-1 bg-white p-3 [&>*]:inline-block [&>*]:m-2';
  const [size, setSize] = useState<SIZE>('md');
  const [color, setColor] = useState<COLOR>('secondary');
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('빈값');
  return (
    <Base title="메인" backgroundColor="gray">
      <dl className={style}>
        <dt>정보</dt>
        <dd>
          <Select
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
            <Button debounce={1000} themeColor={color} themeSize={size} onClick={() => setNumber(number + 1)}>
              디바운스 버튼
            </Button>
          </Loader>
        </dd>
        <dd>
          <Loader show={number % 19 === 0}>
            <Button
              debounce={300}
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
            themeColor={color}
            themeSize={size}
          />
        </dd>

        <dd>
          <Input
            debounce={400}
            placeholder="값을 입력해보아요"
            onChange={(e) => setText(e.target.value)}
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
            themeColor={color}
            themeSize={size}
          >
            뉴메릭
          </Numeric>
        </dd>
      </dl>
      <dl className={style}>
        <dt>폼</dt>
        <dd>
          <Form
            requires={['email', 'pw', 'rpw']}
            button={
              <Loader>
                <Button debounce={300} type="submit">
                  전송
                </Button>
              </Loader>
            }
            onSubmit={async (x) => {
              console.log(x);
              await new Promise((res) => setTimeout(() => res(true), 3000));
              return { age: '서버에서 내려온 에러. 그냥 나이는 오류' };
            }}
            messages={{
              email: '이메일형태를 입력해주세요.',
              pw: '비밀번호를 길게입력하세여',
              rpw: '비밀번호를 동일하게 입력하세요.',
              age: '나이를 올바르게 입력하세요.',
            }}
            validations={{
              email: (email) => {
                const regex =
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(email ?? '');
              },
              pw: (v) => {
                console.log(v);
                if (v) {
                  return v?.length > 3;
                }
                return false;
              },
              rpw: (x, values) => {
                if (x && values) {
                  return values.pw === x;
                }
                return false;
              },
              age: (x) => {
                if (!x) return false;
                if (+x > 25 && +x < 30) {
                  console.log(x);

                  return true;
                }
                return false;
              },
            }}
          >
            <Input name="email" themeColor="secondary" themeSize="sm">
              이메일
            </Input>
            <Input name="pw" themeColor="secondary" themeSize="sm" type="password">
              비밀번호
            </Input>

            <Input name="rpw" themeColor="secondary" themeSize="sm" type="password">
              비밀번호확인
            </Input>
            {/* <Numeric placeholder="25~30" name="age" themeColor="secondary" themeSize="sm">
              나이
            </Numeric> */}
            <Select
              name="age"
              ableEmpty
              options={[
                { label: 26, value: 26 },
                { label: 30, value: 30 },
              ]}
            >
              나이
            </Select>
          </Form>
        </dd>
      </dl>
    </Base>
  );
};

export default Main;
