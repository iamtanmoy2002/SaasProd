"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Camera, Save } from "lucide-react";
import Navbar from "@/components/navbar";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_type: string;
  avatar_url?: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          router.push('/sign-in');
          return;
        }

        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', authUser.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        setUser(profile);
        setFormData({
          full_name: profile.full_name || "",
          email: profile.email || "",
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [supabase, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile Updated! 🎉",
        description: "Your profile has been updated successfully.",
        duration: 3000,
      });

      // Refresh user data
      const { data: updatedProfile } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (updatedProfile) {
        setUser(updatedProfile);
      }

    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <p>User not found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white relative overflow-hidden pt-16">
        {/* Animated dark background with orange hint */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-800 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-96 h-96 bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:text-orange-500"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                Profile Settings
              </h1>
              <p className="text-gray-300">Manage your account and preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback className="bg-orange-500 text-white text-2xl font-bold">
                        {getInitials(user.full_name || user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-black text-xl">{user.full_name || 'User'}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {user.user_type === 'artist' ? '🎵 Artist' : '🎧 Listener'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm mb-4">
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </p>
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Avatar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Settings Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-black">Account Information</CardTitle>
                  <CardDescription className="text-gray-600">
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-black font-medium">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black font-medium">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-100 border-gray-300 text-gray-600"
                      placeholder="your@email.com"
                    />
                    <p className="text-sm text-gray-500">
                      Email address cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black font-medium">Account Type</Label>
                    <div className="p-3 bg-gray-100 rounded-md">
                      <span className="text-gray-700 capitalize">
                        {user.user_type === 'artist' ? '🎵 Artist Account' : '🎧 Listener Account'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      To change your account type, please contact support.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 