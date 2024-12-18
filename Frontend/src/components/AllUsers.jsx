import { Link } from "react-router-dom";
import { useSocketContext } from "../Context/SocketContext";

const AllUsers = ({ data }) => {
  const { allOnlineUsers } = useSocketContext();
  const isOnline = Object.keys(allOnlineUsers).includes(data._id);

  return (
    <Link to={`/msg/${data._id}`}>
      <div className="flex items-center mb-2 p-2 overflow-hidden rounded-lg bg-slate-50 gap-4">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                data.avatar === "default" ? `/${data.gender}.jpeg` : data.avatar
              }
              alt="profile img"
            />
          </div>
        </div>

        <div>
          <p className="text-slate-700">{data.username}</p>
          <span className="text-slate-300">Enter to chat</span>
        </div>
      </div>
    </Link>
  );
};

export default AllUsers;
