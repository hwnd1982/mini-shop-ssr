import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function Checkout() {
  const validationSchema = Yup.object({
    name: Yup
      .string()
      .required('Введите Ваше имя'),
    email: Yup
      .string()
      .email('Некорректный формат email')
      .required('Введите Ваш email'),
  });

  return (
    <Formik 
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={() => console.log('Submit')}
    >
      {({ errors }) => (
        <Form className="-mx-3 flex flex-col">
          <div className="mb-4 relative">
            <Field name="name" type="text" placeholder="Имя*" className={clsx("w-full rounded-lg border border-form-stroke py-3 px-4 font-normal text-body-color placeholder-body-color outline-none transition focus:border-indigo-600 active:border-indigo-600", errors.name && "border-red-300 focus:border-red-500 active:border-red-300")} />
            <ErrorMessage className={"rounded-full backdrop-blur-md bg-white/50 py-0 px-2 absolute bottom-[-10px] left-2 text-red-500"} name='name' component={'span'} />
          </div>
          <div className="mb-4 relative">
            <Field type="email" name="email" placeholder="E-mail*" className={clsx("w-full rounded-lg border border-form-stroke py-3 px-4 font-normal text-body-color placeholder-body-color outline-none transition focus:border-indigo-600 active:border-indigo-600", errors.email && "border-red-300 focus:border-red-500 active:border-red-300")} />
            <ErrorMessage className={"rounded-full backdrop-blur-md bg-white/50 py-0 px-2 absolute bottom-[-10px] left-2 text-red-500"} name='name' component={'span'} />
          </div>
          <div className="mb-4 relative">
            <Field as="textarea" name="massage" rows={5} placeholder="Сообщение" className="w-full rounded-lg border border-form-stroke py-3 px-4 px-6 font-normal text-body-color placeholder-body-color outline-none transition focus:border-indigo-600 active:border-indigo-600" />
          </div>
          <button type="submit" className="flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            Отправить заказ
          </button>
        </Form>
      )}
    </Formik>
  )
}