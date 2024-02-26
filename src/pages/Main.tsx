import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Input from '@/Input';
import Combo from '@/Combo';
import Loader from '@/Loader';
import Numeric from '@/Numeric';
import { COLOR, SIZE, colorArr, sizeArr } from '#/useTheme';
import Tooltip from '@/Tooltip';
import Form from '@/Form';
import Currency from '@/Currency';
import Toast from '@/Toast';
import Delay from '@/Delay';
import Modal from '@/Modal';
import Map from '@/Map';
const Main = () => {
  const style = 'm-1 bg-white p-3 [&>*]:inline-block [&>*]:m-2';
  const [test, setTest] = useState<boolean>();
  const [size, setSize] = useState<SIZE>('md');
  const [color, setColor] = useState<COLOR>('secondary');
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('빈값');

  return (
    <Base title="메인">
      <Map />
      <Modal show={test}>가입이 완료됐습니닷</Modal>
      <Delay before={5000} show>
        <Toast show>
          tab 버튼을 눌러보세요~. 콤보박스가 열리고 옵션이동 후 다음 엘리먼트로 포커스가 잘 이동됩니다.
        </Toast>
      </Delay>
      <dl className={style}>
        <dt>정보</dt>
        <dd>
          <Combo
            themeColor={color}
            themeSize={size}
            debounce={0}
            defaultValue={color}
            onChange={(e) => setColor(e as COLOR)}
            options={colorArr.map((x) => ({ label: x, value: x }))}
          >
            컬러
          </Combo>
        </dd>
        <dd>
          <Combo
            themeColor={color}
            themeSize={size}
            defaultValue={size}
            debounce={0}
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
            debounce={0}
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
            <Button debounce={1000} themeColor={color} themeSize={size} onClick={() => setNumber(number + 1)}>
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
                  debounce={300}
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
      <dl className={style}>
        <dt>폼</dt>
        <dd>
          <Form
            requires={['email', 'pw', 'rpw']}
            button={
              <Button debounce={300} type="submit">
                전송
              </Button>
            }
            onSubmit={async (x) => {
              console.log(x);
              await new Promise((res) => setTimeout(() => res(true), 1000));
              const newTest = test === false ? true : false;
              setTest(newTest);
              if (!newTest) {
                return { email: '중복된 아이디가 있어요. 바꿔주세요옷' };
              }
              return true;
            }}
            messages={{
              email: '이메일을 입력해주세요.',
              pw: '비밀번호를 입력해주세요.',
              rpw: '동일한 비밀번호를 입력해주세요.',
              age: '나이를 올바르게 입력하세요.',
            }}
            validations={{
              email: (email) => {
                const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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
            <Combo
              name="age"
              themeColor="secondary"
              themeSize="sm"
              options={[
                { label: '성인', value: '27' },
                { label: '청소년', value: '0' },
              ]}
            >
              나이
            </Combo>
          </Form>
        </dd>
      </dl>
    </Base>
  );
};

export default Main;
