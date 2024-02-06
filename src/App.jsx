import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Students from './Students';
import Subjects from './Subjects';
import Questions from './Questions';
import MainPage from './Main-Page';

const navigation = [
  { name: 'Главная', to: '/' },
  { name: 'Ученики', to: '/Students' },
  { name: 'Дополнительные', to: '/Subjects' },
  { name: 'Вопросы или Предложения', to: '/Questions' },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <span className="sr-only">9A ❤️</span>
              <img
                className="h-10 w-auto"
                src="/nis.icon.jpg.png"  
                alt="NIS"
              />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Открыть главное меню</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <span className="sr-only">9A ❤️</span>
                <img
  className="h-10 w-auto"
  src="/nis.icon.jpg.png" 
  alt="NIS"
/>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Закрыть меню</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <Routes>
          <Route path="/Students" element={<Students />} />
          <Route path="/Subjects" element={<Subjects />} />
          <Route path="/Questions" element={<Questions />} />
         <Route path='/' element={<MainPage/>}/>
        </Routes>
    </Router>
  )
}