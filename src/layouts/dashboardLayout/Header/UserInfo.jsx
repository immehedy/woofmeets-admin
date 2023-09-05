const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="flex w-full flex-1 items-center justify-end space-x-3">
      <div className="flex items-center justify-end space-x-3 text-right">
        <div>
          <p className="text-sm font-semibold">
            {user?.firstName ? user?.firstName : 'Admin'}
          </p>
        </div>
        <a href={'/account'}>
          <img
            className="h-12 w-12 cursor-pointer overflow-hidden rounded-full object-cover"
            src={'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
            }
            alt="profile"
          />
        </a>
      </div>
    </div>
  );
}

export default UserInfo;
