import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function ProfileCard({
  user,
  showRole = true,
}) {
  const avatar =
    user?.avatar ||
    "https://ui-avatars.com/api/?background=6366f1&color=fff&name=" +
      encodeURIComponent(user?.name || "User");

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="relative px-6 pb-6">
        <div className="-mt-12">
          <img
            src={avatar}
            alt={user?.name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900">
              {user?.name}
            </h3>

            {showRole && user?.role && (
              <Badge>
                {user.role}
              </Badge>
            )}
          </div>

          <p className="mt-1 text-slate-500">
            {user?.email}
          </p>
        </div>

        {(user?.city || user?.country) && (
          <div className="mt-5">
            <p className="text-sm text-slate-600">
              📍 {user?.city} {user?.country}
            </p>
          </div>
        )}

        {user?.bio && (
          <div className="mt-4">
            <p className="text-sm leading-relaxed text-slate-600">
              {user.bio}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}