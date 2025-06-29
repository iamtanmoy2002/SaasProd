'use server';

import { createClient } from '../../supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function signUpAction(formData: FormData) {
  console.log('SignUpAction: Starting sign-up process');
  
  const supabase = await createClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  console.log('SignUpAction: Form data received', { email, fullName, hasPassword: !!password });

  if (!email || !password || !fullName) {
    console.log('SignUpAction: Missing required fields');
    throw new Error('Missing required fields');
  }

  console.log('SignUpAction: Calling Supabase auth.signUp');
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  console.log('SignUpAction: Supabase response', { 
    hasUser: !!data.user, 
    hasSession: !!data.session, 
    error: error?.message 
  });

  if (error) {
    console.error('SignUpAction: Supabase error:', error);
    throw new Error(error.message);
  }

  if (data.user && !data.session) {
    console.log('SignUpAction: Email confirmation required');
    return { 
      success: true, 
      message: 'Please check your email to confirm your account',
      requiresConfirmation: true 
    };
  }

  if (data.session) {
    console.log('SignUpAction: User signed in immediately, redirecting to role selector');
    revalidatePath('/');
    return { 
      success: true, 
      message: 'Account created successfully',
      redirectTo: '/role-selector'
    };
  }

  console.log('SignUpAction: Default success');
  revalidatePath('/');
  return { 
    success: true, 
    message: 'Account created successfully',
    redirectTo: '/role-selector'
  };
}

export async function signInAction(formData: FormData) {
  console.log('SignInAction: Starting sign-in process');
  
  const supabase = await createClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('SignInAction: Form data received', { email, hasPassword: !!password });

  if (!email || !password) {
    console.log('SignInAction: Missing required fields');
    redirect('/sign-in?error=Missing required fields');
  }

  console.log('SignInAction: Calling Supabase auth.signInWithPassword');
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('SignInAction: Supabase response', { 
    hasUser: !!data.user, 
    hasSession: !!data.session, 
    error: error?.message 
  });

  if (error) {
    console.error('SignInAction: Supabase error:', error);
    redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user && data.session) {
    console.log('SignInAction: User authenticated, checking role');
    
    // Check if user has selected a role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', data.user.id)
      .single();

    console.log('SignInAction: User data query result', { 
      userData, 
      userError: userError?.message 
    });

    revalidatePath('/');
    
    if (userData?.user_type) {
      console.log('SignInAction: User has role, redirecting to dashboard');
      redirect('/dashboard');
    } else {
      console.log('SignInAction: User has no role, redirecting to role selector');
      redirect('/role-selector');
    }
  }

  console.log('SignInAction: No user data, redirecting with error');
  redirect('/sign-in?error=Sign in failed');
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/');
  redirect('/');
}

export async function updateUserRoleAction(userType: 'artist' | 'listener') {
  console.log('updateUserRoleAction: Starting role update for user type:', userType);
  
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.error('updateUserRoleAction: Auth error:', authError);
    throw new Error('User not authenticated');
  }

  console.log('updateUserRoleAction: User authenticated, ID:', user.id);

  // First, let's check if the user record exists
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('user_id, user_type')
    .eq('user_id', user.id)
    .single();

  console.log('updateUserRoleAction: Existing user check:', { existingUser, checkError });

  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error('updateUserRoleAction: Error checking existing user:', checkError);
    throw new Error(`Database error: ${checkError.message}`);
  }

  let result;
  
  if (existingUser) {
    // Update existing user
    console.log('updateUserRoleAction: Updating existing user');
    result = await supabase
      .from('users')
      .update({ user_type: userType })
      .eq('user_id', user.id)
      .select();
  } else {
    // Insert new user record
    console.log('updateUserRoleAction: Creating new user record');
    result = await supabase
      .from('users')
      .insert({
        user_id: user.id,
        email: user.email,
        user_type: userType,
        token_identifier: user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
  }

  console.log('updateUserRoleAction: Database operation result:', result);

  if (result.error) {
    console.error('updateUserRoleAction: Database error:', result.error);
    throw new Error(`Database error: ${result.error.message}`);
  }

  console.log('updateUserRoleAction: Role updated successfully');
  return { success: true, data: result.data };
}

export async function forgotPasswordAction(formData: FormData) {
  const supabase = await createClient();
  
  const email = formData.get('email') as string;

  if (!email) {
    redirect('/forgot-password?error=Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/reset-password`,
  });

  if (error) {
    redirect(`/forgot-password?error=${error.message}`);
  }

  redirect('/forgot-password?message=Check your email for a password reset link');
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();
  
  const password = formData.get('password') as string;

  if (!password) {
    redirect('/dashboard/reset-password?error=Password is required');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    redirect(`/dashboard/reset-password?error=${error.message}`);
  }

  redirect('/dashboard?message=Password updated successfully');
}

export async function checkUserSubscription() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Check if user has an active subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  return subscription;
}

// Shazam API functions
const SHAZAM_API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const SHAZAM_API_HOST = 'shazam.p.rapidapi.com';

export async function searchSongs(query: string) {
  try {
    const response = await fetch(`https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(query)}&locale=en-US&offset=0&limit=20`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SHAZAM_API_KEY || '',
        'X-RapidAPI-Host': SHAZAM_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }

    const data = await response.json();
    return data.tracks?.hits || [];
  } catch (error) {
    console.error('Error searching songs:', error);
    return [];
  }
}

export async function getTopCharts() {
  try {
    const response = await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SHAZAM_API_KEY || '',
        'X-RapidAPI-Host': SHAZAM_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top charts');
    }

    const data = await response.json();
    return data.tracks || [];
  } catch (error) {
    console.error('Error fetching top charts:', error);
    return [];
  }
}

export async function getSongDetails(songId: string) {
  try {
    const response = await fetch(`https://shazam.p.rapidapi.com/songs/get-details?key=${songId}&locale=en-US`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SHAZAM_API_KEY || '',
        'X-RapidAPI-Host': SHAZAM_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch song details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching song details:', error);
    return null;
  }
}

export async function getArtistDetails(artistId: string) {
  try {
    const response = await fetch(`https://shazam.p.rapidapi.com/artists/get-details?id=${artistId}&l=en-US`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SHAZAM_API_KEY || '',
        'X-RapidAPI-Host': SHAZAM_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artist details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artist details:', error);
    return null;
  }
}

export async function getRelatedSongs(songId: string) {
  try {
    const response = await fetch(`https://shazam.p.rapidapi.com/songs/list-recommendations?key=${songId}&locale=en-US`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SHAZAM_API_KEY || '',
        'X-RapidAPI-Host': SHAZAM_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch related songs');
    }

    const data = await response.json();
    return data.tracks || [];
  } catch (error) {
    console.error('Error fetching related songs:', error);
    return [];
  }
} 