import { useState } from 'react';
import Base from './_Base';
import Button from '@/Button';
import Tooltip from '@/Tooltip';
import Code from '@/Code';
import Loader from '@/Loader';
const ButtonPage = () => {
  const [number, setNumber] = useState(0);
  return (
    <Base title="버튼">
      number:{number}
      <ul className="flex flex-col gap-4 p-3">
        <li>
          <Code
            code={`
            <Button 
              onClick={() => setNumber(number + 1)} 
              onHold={() => setNumber((prev) => prev + 1)}>
              기본
            </Button>`}
          >
            <Button onClick={() => setNumber(number + 1)}>기본</Button>
          </Code>
        </li>
        <li>
          <Code
            code={`
          <Tooltip
            timeout={3000}
            slot={
              <Button onClick={() => setNumber(number + 1)} onHold={() => setNumber((prev) => prev + 1)}>
                툴팁 + 버튼
              </Button>
            }
          >
            홀드해보세요!
          </Tooltip>`}
          >
            <Tooltip
              timeout={3000}
              slot={
                <Button onClick={() => setNumber(number + 1)} onHold={() => setNumber((prev) => prev + 1)}>
                  툴팁 + 버튼
                </Button>
              }
            >
              홀드해보세요!
            </Tooltip>
          </Code>
        </li>
        <li>
          <Code
            code={`
            <Loader timeout={1000}>
              <Button delay={1000} onClick={() => setNumber(number + 1)}>
                디바운스 버튼
              </Button>
            </Loader>`}
          >
            <Loader timeout={1000}>
              <Button delay={1000} onClick={() => setNumber(number + 1)}>
                디바운스 버튼
              </Button>
            </Loader>
          </Code>
        </li>
        <li>
          <Code
            code={`
            <Tooltip
              timeout={3000}
              slot={
                <Loader show={number !== 0 && number % 19 === 0}>
                  <Button delay={300} onClick={() => setNumber(number + 1)} onHold={() => setNumber((prev) => prev + 1)}>
                    19배수일때 로딩
                  </Button>
                </Loader>
              }
            >
              홀드해보세요!
            </Tooltip>`}
          >
            <Tooltip
              timeout={3000}
              slot={
                <Loader show={number !== 0 && number % 19 === 0}>
                  <Button
                    delay={300}
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
          </Code>
        </li>
      </ul>
    </Base>
  );
};

export default ButtonPage;
