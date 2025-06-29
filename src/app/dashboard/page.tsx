import DashboardNavbar from "@/components/dashboard-navbar";
import ArtistDashboard from "@/components/artist-dashboard";
import ListenerDashboard from "@/components/listener-dashboard";
import RoleSelector from "@/components/role-selector";
import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user has a profile and role
  const { data: profile } = await supabase
    .from("users")
    .select("user_type")
    .eq("user_id", user.id)
    .single();

  // If no profile or no user_type, redirect to home
  if (!profile || !profile.user_type) {
    return redirect("/");
  }

  // Show appropriate dashboard based on user type
  if (profile.user_type === "artist") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <DashboardNavbar />
        <div className="pt-16">
          <ArtistDashboard user={user} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-black">
        <ListenerDashboard user={user} />
      </div>
    );
  }
}
