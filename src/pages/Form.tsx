import Base from './_Base';
import Button from '@/Button';
import Input from '@/Input';
import Combo from '@/Combo';
import Form from '@/Form';
import { useSignUp, Arg } from '!/test/applications/post-sign-up';
import Code from '@/Code';
const FormPage = () => {
  const { trigger } = useSignUp();
  return (
    <Base title="폼">
      <ul className="flex flex-col gap-4 p-3">
        <li>
          <Code
            code={`<Form<Arg>
            requires={['email', 'pw', 'rpw']}
            button={
              <Button delay={300} type="submit">
                전송
              </Button>
            }
            onSubmit={trigger}
            validations={{
              email: (email) => {
                const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if (!regex.test(email ?? '')) return '이메일 입력하세요.';

                return true;
              },
              pw: (v) => {
                if (!v || v?.length < 3) return '비번입력하세요';
                return true;
              },
              rpw: (x, values) => {
                if (!x || (values && values.pw !== x)) return '비번 같게 입력하세요.';
                return true;
              },
              age: (x) => {
                if (x && (x > '30' || x < '25')) return '25~30';
                return true;
              },
            }}
          >
            <Input className="w-full" name="email" placeholder="test@test.com" themeColor="secondary" themeSize="sm">
              이메일
            </Input>
            <Input className="w-full" name="pw" themeColor="secondary" themeSize="sm" type="password">
              비밀번호
            </Input>

            <Input className="w-full" name="rpw" themeColor="secondary" themeSize="sm" type="password">
              비밀번호확인
            </Input>
            {/* <Numeric placeholder="25~30" name="age" themeColor="secondary" themeSize="sm">
              나이
            </Numeric> */}
            <Combo
              className="w-full"
              name="age"
              themeColor="secondary"
              themeSize="sm"
              emptyAble
              options={[
                ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((x) => ({
                  label: x,
                  value: x,
                  disabled: true,
                })),
                ...[21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((x) => ({
                  label: x,
                  value: x,
                })),
              ]}
            >
              나이
            </Combo>
          </Form>`}
          >
            <Form<Arg>
              requires={['email', 'pw', 'rpw']}
              button={
                <Button delay={300} type="submit">
                  전송
                </Button>
              }
              onSubmit={trigger}
              validations={{
                email: (email) => {
                  const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                  if (!regex.test(email ?? '')) return '이메일 입력하세요.';

                  return true;
                },
                pw: (v) => {
                  if (!v || v?.length < 3) return '비번입력하세요';
                  return true;
                },
                rpw: (x, values) => {
                  if (!x || (values && values.pw !== x)) return '비번 같게 입력하세요.';
                  return true;
                },
                age: (x) => {
                  if (x && (x > '30' || x < '25')) return `25~30`;
                  return true;
                },
              }}
            >
              <Input className="w-full" name="email" placeholder="test@test.com" themeColor="secondary" themeSize="sm">
                이메일
              </Input>
              <Input className="w-full" name="pw" themeColor="secondary" themeSize="sm" type="password">
                비밀번호
              </Input>

              <Input className="w-full" name="rpw" themeColor="secondary" themeSize="sm" type="password">
                비밀번호확인
              </Input>
              {/* <Numeric placeholder="25~30" name="age" themeColor="secondary" themeSize="sm">
              나이
            </Numeric> */}
              <Combo
                className="w-full"
                name="age"
                themeColor="secondary"
                themeSize="sm"
                emptyAble
                options={[
                  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((x) => ({
                    label: x,
                    value: x,
                    disabled: true,
                  })),
                  ...[21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((x) => ({
                    label: x,
                    value: x,
                  })),
                ]}
              >
                나이
              </Combo>
            </Form>
          </Code>
        </li>
      </ul>
    </Base>
  );
};

export default FormPage;
