import { useRef, useState } from 'react';

interface FormDataObject {
  [key: string]: string;
}

interface UseFormDataReturn {
  form: React.MutableRefObject<object>;
  formData: Record<string, FormDataObject>;
  updateFormData: () => void;
}

const useFormData = (initial): UseFormDataReturn => {
  const form = useRef(initial);

  const [formData, setFormData] = useState<Record<string, FormDataObject>>({});

  const getFormData: () => Record<string, FormDataObject> = () => {
    const fd = new FormData(form.current);

    const obj: Record<string, FormDataObject> = {};
    fd.forEach((value, key) => {
      const str = key.split(':');

      if (str.length > 1) {
        obj[str[0]] = {
          ...obj[str[0]],

          [str[1]]: value,
        };
      } else {
        obj[str[0]] = value;
      }
    });

    return obj;
  };

  const updateFormData = () => {
    setFormData(getFormData());
  };

  return { form, formData, updateFormData } as const;
};

export default useFormData;
