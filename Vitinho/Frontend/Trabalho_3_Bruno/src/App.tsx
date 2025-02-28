import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  interface UserEntity {
    id: number,
    name: string,
    email: string,
    password: string,
}

  const api = axios.create({
    baseURL: 'https://localhost:32769/api/users',
  });

  const [Users, setUsers] = useState<UserEntity[]>([]);
  const [Name, setName] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const postUser = async () => {

    await api.post('', {
        name: Name,
        email: Email,
        password: Password,
      }
    );

      setName('');
      setEmail('');
      setPassword('');
      getUsers();

  };

  const putUser = async () => {

    if (selectedUserId === null) return;

    await api.put(`/${selectedUserId}`, {
      name: Name,
      email: Email,
      password: Password,
      }
    );

    setName('');
    setEmail('');
    setPassword('');
    setSelectedUserId(null);
    getUsers();

  };

  const deleteUser = async (id: number) => {

    await api.delete(`/${id}`);
    getUsers();


  };

  const getUsers = async () => {

      const response = await api.get<UserEntity[]>('');
      setUsers(response.data);
    
  };

  const handleEditUser = (user: UserEntity) => {

    setSelectedUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);

  };

  useEffect(() => {

    getUsers();

  }, []);

  return (
    <div className="App">
      <div>
        <h2>{selectedUserId ? 'Update User' : 'Create User'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedUserId ? putUser() : postUser();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{selectedUserId ? 'Update' : 'Create'} User</button>
        </form>
      </div>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
