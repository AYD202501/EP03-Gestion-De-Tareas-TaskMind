import React from 'react';
import useFormData from '@/hooks/useForm';
import { createUser } from '@/utils/api';
import { nanoid } from 'nanoid';

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  return {
    props: { id }, // will be passed to the page component as props
  };
}

const Index = ({ id }: { id: string }) => {
  console.log('User ID:', id);
  const { form, formData, updateFormData } = useFormData({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const password = nanoid(8);
    try {
      await createUser({
        name: formData.name,
        email: formData.email,
        password,
        role: formData.role,
        enabled: formData.enabled === 'on' ? true : false,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
    console.log('User created with password:', password);
  };
  return (
    <div className='container mx-auto p-4 justify-center items-center w-full'>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={handleSubmit}
        className='space-y-4 justify-center items-center'
      >
        <label htmlFor='name'>
          Nombre:
          <input
            type='text'
            id='name'
            name='name'
            className='mt-1 block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>
        <label htmlFor='email'>
          Email:
          <input
            type='email'
            id='email'
            name='email'
            className='mt-1 block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>
        <label htmlFor='role'>
          Role:
          <select
            id='role'
            name='role'
            className='mt-1 block w-full  py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          >
            <option value='ADMIN'>ADMIN</option>
            <option value='USER'>USER</option>
            <option value='RECEPTIONIST'>RECEPTIONIST</option>
          </select>
        </label>
        <label htmlFor='enabled'>
          Enabled:
          <input
            type='checkbox'
            id='enabled'
            name='enabled'
            className='mt-1 block w-full rounded-md py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>
        <button
          type='submit'
          className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Save
        </button>
        <button
          type='button'
          className='text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-600'
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Index;
