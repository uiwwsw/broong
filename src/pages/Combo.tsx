import { useState } from 'react';
import Base from './_Base';
import Code from '@/Code';
import Combo from '@/Combo';
const ComboPage = () => {
  const [number, setNumber] = useState(0);
  return (
    <Base title="콤보박스">
      number:{number}
      <ul className="flex flex-col gap-4 p-3">
        <li>
          <Code
            code={`
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
            />`}
          >
            <Combo
              delay={0}
              defaultValue="1"
              onChange={(e) => setNumber(+e)}
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ]}
            />
          </Code>
        </li>
        <li>
          <Code
            code={`
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
            >라벨</Combo>`}
          >
            <Combo
              delay={0}
              defaultValue="1"
              onChange={(e) => setNumber(+e)}
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ]}
            >
              라벨
            </Combo>
          </Code>
        </li>
      </ul>
    </Base>
  );
};

export default ComboPage;
