import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json();
    
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Try to update using the force update function
    let updateResult: any;
    const { data: forceUpdateData, error: updateError } = await supabase
      .rpc('force_update_user_role', {
        user_id_param: user.id,
        new_role: role
      });

    if (updateError) {
      // Fallback to direct update if function doesn't exist
      const { data: directResult, error: directError } = await supabase
        .from('users')
        .update({ 
          user_type: role,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select();

      if (directError) {
        return NextResponse.json({ error: `Update failed: ${directError.message}` }, { status: 500 });
      }

      if (!directResult || directResult.length === 0) {
        return NextResponse.json({ error: 'No rows were updated' }, { status: 500 });
      }

      updateResult = { success: true, method: 'direct_update', data: directResult };
    } else {
      updateResult = forceUpdateData;
    }

    // Verify the update worked
    const { data: verifyUser, error: verifyError } = await supabase
      .from('users')
      .select('user_id, user_type, email')
      .eq('user_id', user.id)
      .single();

    if (verifyError) {
      return NextResponse.json({ error: `Verification failed: ${verifyError.message}` }, { status: 500 });
    }

    if (verifyUser.user_type !== role) {
      return NextResponse.json({ 
        error: 'Role update failed - user_type not updated',
        currentRole: verifyUser.user_type,
        expectedRole: role
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      updateResult: updateResult,
      verifiedUser: verifyUser
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 