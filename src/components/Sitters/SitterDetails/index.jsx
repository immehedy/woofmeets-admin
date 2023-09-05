import { useState, useEffect } from 'react';
import getSitter from '../lib/hooks/useGetSitterDetails';
import { useLocation } from 'react-router-dom';

import Profile from './sections/Profile';
import About from './sections/About';
import OtherInfo from './sections/OtherInfo';
import Services from './sections/Services';
import MembershipPlan from './sections/MembershipPlan';
import SitterAppointments from './sections/SitterAppointments';
import CheckrReport from './sections/CheckrReport';
import CheckrInvitations from './sections/CheckrInvitations';
import ProviderDetails from './sections/ProviderDetails';
const UserDetailsPage = () => {
  const [active, setActive] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');
  useEffect(() => {
    getSitter(email)
      .then((res) => {
        setUser(res?.data);
        setActive(res?.data?.user?.deletedAt ? true : false);
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
            <Profile user={user} active={active} setActive={setActive} />
            <div className="w-full md:w-9/12 mx-2 h-64">
              <About user={user} />
              <div className="my-4"></div>
              <ProviderDetails details={user?.providerDetails} />
              <div className="my-4"></div>
              <CheckrInvitations invitations={user?.providerCheckrCandidate?.ProviderCheckrInvitation} />
              <div className="my-4"></div>
              <CheckrReport reports={user?.providerCheckrCandidate?.ProviderCheckrReport} />
              <div className="my-4"></div>
              <OtherInfo user={user} />
              <div className="my-4"></div>
              <MembershipPlan user={user} />
              <div className="my-4"></div>
              <Services user={user} />
              <div className="my-4"></div>
              <SitterAppointments
                appointment={user?.appointment}
                providerId={user?.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
