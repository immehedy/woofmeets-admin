import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {useState} from 'react';
import {useAuth} from '../../../auth'
import {useNavigate} from 'react-router-dom';
import login from '../../lib/hooks/usePostLogin'
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const auth = useAuth();
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
        const values = {
          email,
          password,
        }
        setLoading(true);
        login(values)
            .then((res) => {
              const { access_token, info } = res?.data;
              auth.login(access_token, info);
              setLoading(false);
              navigate('/');
            })
            .catch((err) => {
              setLoading(false);
              setErrorMsg(err?.data?.message);
            });
          }
  return (
    <div className="container mx-auto my-auto w-full xl:w-1/4 md:flex md:items-center py-12 md:mt-20">
  <form onSubmit={onSubmit} className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      {errorMsg && <span className="flex justify-center text-red-400 text-md my-2">{errorMsg}</span>}
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" 
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="flex justify-center">
      <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value={`${loading ? 'Signing in...' : 'Sign in'}`} />
    </div>
  </form>
</div>
  );
};

export default Form;
