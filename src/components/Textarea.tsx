import { TextareaHTMLAttributes, forwardRef } from 'react';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return <textarea {...props} ref={ref} />;
});

export default Textarea;
