import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    console.log('DEBUG: User ID:', user.id);

    // Check current user state
    const { data: currentUser, error: currentError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log('DEBUG: Current user data:', currentUser);
    console.log('DEBUG: Current user error:', currentError);

    // Try a simple update without RLS
    const { data: updateResult, error: updateError } = await supabase
      .from('users')
      .update({ user_type: 'listener' })
      .eq('user_id', user.id)
      .select();

    console.log('DEBUG: Update result:', updateResult);
    console.log('DEBUG: Update error:', updateError);

    // Check if the update worked
    const { data: afterUpdate, error: afterError } = await supabase
      .from('users')
      .select('user_id, user_type, email')
      .eq('user_id', user.id)
      .single();

    console.log('DEBUG: After update:', afterUpdate);
    console.log('DEBUG: After update error:', afterError);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email
      },
      currentUser,
      currentError: currentError?.message,
      updateResult,
      updateError: updateError?.message,
      afterUpdate,
      afterError: afterError?.message
    });

  } catch (error: any) {
    console.error('DEBUG: Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 