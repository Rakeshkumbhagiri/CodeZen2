import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("https://codezen2-server.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    // <div className="p-8 text-black">
    //   <h2 className="mb-4 text-2xl font-bold">Profile</h2>
    //   <p>Email: {user.email}</p>
    //   <p>Role: {user.role}</p>
    //   <p>
    //     Joined: {new Date(user.createdAt).toLocaleDateString()}
    //   </p>
    // </div>
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
  <div className="w-full max-w-md p-8 text-white border shadow-xl backdrop-blur-lg bg-white/10 border-white/20 rounded-2xl">

    <h2 className="mb-6 text-3xl font-bold text-center">
      User Information
    </h2>

    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-white/5">
        <p className="text-sm text-gray-300">Email</p>
        <p className="text-lg font-medium">{user.email}</p>
      </div>

      <div className="p-3 rounded-lg bg-white/5">
        <p className="text-sm text-gray-300">Role</p>
        <p className="text-lg font-medium capitalize">{user.role}</p>
      </div>

      <div className="p-3 rounded-lg bg-white/5">
        <p className="text-sm text-gray-300">Joined</p>
        <p className="text-lg font-medium">
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

  </div>
</div>

  );
};

export default Profile;
