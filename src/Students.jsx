import { Tab } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';
import classNames from 'classnames';

const subjectsList = [
  'Али', 'Инкара', 'Дамир', 'Баян', 'Уаис', 'Ермухаммед', 'Нурмухаммед', 'Т Димаш', 'А Димаш',
  'Райана', 'Айым', 'Алемжан', 'Расул', 'Ануар', 'Айша', 'Арнай', 'Айлана',
  'Жанторе', 'Дария', 'Каусар', 'Шынгысхан', 'Бекболат', 'Ансар',
]; 
const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

const firebaseConfig = {
  apiKey: "AIzaSyB1EY2jDfBbjqM7sEmgQs2XJugejAK_P8E",
  authDomain: "a-project-6ab3a.firebaseapp.com",
  databaseURL: "https://a-project-6ab3a-default-rtdb.firebaseio.com",
  projectId: "a-project-6ab3a",
  storageBucket: "a-project-6ab3a.appspot.com",
  messagingSenderId: "1067516925493",
  appId: "1:1067516925493:web:7f7df5a3e5c3426948c37c",
  measurementId: "G-7T0LK2LWEK"
};

const app = initializeApp(firebaseConfig);

const Example = () => {
  const [userInput, setUserInput] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const database = getDatabase(app);

  const fetchData = async () => {
    const userRef = ref(database, `users/${loginName}`);
    const snapshot = await get(userRef);
    const data = snapshot.val();
    setUserInput(data || {});
  };
  const [filteredSubjects, setFilteredSubjects] = useState(subjectsList);

  const handleSubjectSearch = (searchText) => {
    // If loginName is not empty, filter subjects based on it
    const filtered = loginName
      ? subjectsList.filter((subject) =>
          subject.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];
    setFilteredSubjects(filtered);
  };

  useEffect(() => {
    fetchData();
    // Update filtered subjects based on loginName
    handleSubjectSearch('');
  }, [loggedInUser, database, loginName]);
  const saveInfoToFirebase = () => {
    if (!loggedInUser) {
      alert('Please log in to save information.');
      return;
    }

    const userRef = ref(database, `users/${loggedInUser.name}`);
    set(userRef, userInput);
    alert("Information saved!");
  };
  const handleInputChange = (day, subject, value) => {
    if (!loggedInUser) {
      alert('Please log in to modify information.');
      return;
    }
  
    if (loggedInUser.name !== subject) {
      alert('You can only modify information for your own subject.');
      return;
    }
  
    setUserInput((prevState) => ({
      ...prevState,
      [day]: {
        ...(prevState[day] || {}),
        [subject]: value,
      },
    }));
  
    // Save the user input to Firebase
    set(ref(database, `users/${loggedInUser.name}/${day}`), {
      ...(get(ref(database, `users/${loggedInUser.name}/${day}`)).val() || {}),
      [subject]: value,
    });
  };

  const handleLogin = () => {
    // For demonstration purposes only. In real-world scenarios, passwords should be securely hashed.
    const hardcodedPasswords = {
      'Али': '123456',
      'Инкара': '654321',
      'Дамир': '987654',
      'Баян': '234567',
      'Уаис': '876543',
      'Ермухаммед': '345678',
      'Нурмухаммед': '765432',
      'Т Димаш': '456789',
      'А Димаш': '987123',
      'Райана': '321789',
      'Айым': '654987',
      'Алемжан': '789321',
      'Расул': '111222',    
      'Ануар': '333444', 
      'Айша': '555666',    
      'Арнай': '999000',  
      'Айлана': '112233',   
      'Жанторе': '778899',  
      'Дария': '990011',   
      'Каусар': '122344',     
      'Шынгысхан': '566677',
      'Бекболат': '122232',  
      'Ансар': '125344' 
          };

          if (Object.prototype.hasOwnProperty.call(hardcodedPasswords, loginName)) {
            const storedPassword = hardcodedPasswords[loginName];
          
            if (loginPassword === storedPassword) {
              setLoggedInUser({ name: loginName, password: loginPassword });
            } else {
              alert('Invalid password! Password must be 6 digits.');
            }
          } else {
            alert('User not found.');
          }
          
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
    <div className="w-full p-4 md:max-w-md">
      {loggedInUser ? (
        <div className="mb-4">
          <p className="text-lg font-semibold">Здравия Желаю, {loggedInUser.name}!</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2 w-full">
            Выйти
          </button>
        </div>
      ) : (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ученик</label>
            <input
              type="text"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-2 w-full"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль (6 элементов):</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-2 w-full"
            />

            <button onClick={handleLogin} className="bg-green-500 text-white px-3 py-1 rounded-md w-full">
              Логин
            </button>
          </div>
        )}
  <button onClick={saveInfoToFirebase} className="bg-green-500 text-white px-3 py-1 rounded-md w-full">
          Сохранить информацию
        </button>
        <Tab.Group>
          <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1 bg-green-900/20 rounded-xl p-1 text-white-600">
            <Tab className={({ selected }) =>
              classNames(
                'w-full md:w-auto rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-white-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-green-700 shadow'
                  : 'text-dark-500 hover:bg-white/[0.12] hover:text-white'
              )
            }>
              Ученики
            </Tab>
            {daysOfWeek.map((day) => (
              <Tab
                key={day}
                className={({ selected }) =>
                  classNames(
                    'w-full md:w-auto rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-white-400 focus:outline-none focus:ring-2',
                    selected
                    ? 'bg-white text-green-700 shadow'
                    : 'text-dark-500 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {day}
              </Tab>
            ))}
          </div>

          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <ul>
                {subjectsList.map((subject, index) => (
                  <li key={index} className="relative rounded-md text-dark-600 p-3 hover:bg-gray-100">
                    <h3 className="text-sm font-medium leading-5">{subject}</h3>
                  </li>
                ))}
              </ul>
            </Tab.Panel>

            {daysOfWeek.map((day, idx) => (
              <Tab.Panel key={idx} className={classNames('rounded-xl bg-white p-3')}>
                <ul>
                  {subjectsList.map((subject, subjectIndex) => (
                    <li key={subjectIndex} className="relative rounded-md p-3 hover:bg-gray-100">
                      <h3 className="text-sm font-medium leading-5">{subject}</h3>
                      {loggedInUser ? (
                        <input
                          type="text"
                          placeholder={`Enter information for ${day}`}
                          value={userInput[day]?.[subject] || ''}
                          onChange={(e) => handleInputChange(day, subject, e.target.value)}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      ) : (
                        <div className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                          {userInput[day]?.[subject] || 'Напишите имя чтобы увидеть'}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        
        {loggedInUser && (
          <button onClick={saveInfoToFirebase} className="bg-blue-500 text-white px-3 py-1 rounded-md w-full mt-4">
            Сохранить информацию
          </button>
        )}
      </div>
    </div>
  );
};

export default Example;