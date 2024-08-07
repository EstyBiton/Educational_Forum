// // components/UserList.tsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAndAddUser } from '../../redux/user/user.slice';
// import { selectUsers } from '../../redux/user/user.selector';
// import { FullUserType } from '../../types/user.types';
// import { AppDispatch } from '../../redux/store';

// const UserList: React.FC = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const users = useSelector(selectUsers);

//     useEffect(() => {
//         const newUser: FullUserType = {
//             name: "John Doe",
//             email: "john.doe@example.com",
//             password: "password123",
//         };
//         dispatch(fetchAndAddUser(newUser));
//     }, [dispatch]);

//     return (
//         <div>
//             <h2>User List</h2>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>{user.name} - {user.email}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;
export {}