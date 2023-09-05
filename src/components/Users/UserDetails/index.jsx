import { useState, useEffect } from 'react';
import getUser from '../lib/hooks/useGetUserDetails';
import { useLocation } from 'react-router-dom';

import Profile from './sections/Profile';
import About from './sections/About';
import OtherInfo from './sections/OtherInfo';
import UserAppointments from './sections/UserAppointments';
const UserDetailsPage = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');

  useEffect(() => {
    getUser(email)
      .then((res) => {
        setUser(res?.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [email]);
  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <Profile user={user} />
            <div className="w-full md:w-9/12 mx-2 h-64">
              <About user={user} />
              <div className="my-4"></div>
              <OtherInfo user={user} />
              <div className="my-4"></div>
              <UserAppointments userId={user?.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
