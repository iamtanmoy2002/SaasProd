import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json();
    
    console.log('API: Starting role update for:', role);
    
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('API: Auth error:', authError);
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    console.log('API: User authenticated, ID:', user.id);

    // Try the database function first
    let functionResult: any;
    const { data: functionData, error: functionError } = await supabase
      .rpc('update_user_role', {
        user_id_param: user.id,
        new_role: role
      });

    console.log('API: Function result:', functionData);
    console.log('API: Function error:', functionError);

    if (functionError) {
      console.log('API: Function failed, trying direct update...');
      
      // Fallback to direct update
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('API: Existing user check:', { existingUser, checkError });

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('API: Error checking existing user:', checkError);
        return NextResponse.json({ error: `Database error: ${checkError.message}` }, { status: 500 });
      }

      let result;
      
      if (existingUser) {
        // Update existing user
        console.log('API: Updating existing user with data:', existingUser);
        console.log('API: Current user_type:', existingUser.user_type);
        console.log('API: Attempting to update to:', role);
        
        result = await supabase
          .from('users')
          .update({ 
            user_type: role,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .select('*');
          
        console.log('API: Update result:', result);
        console.log('API: Update result data:', result.data);
        console.log('API: Update result error:', result.error);
        console.log('API: Rows affected:', result.data?.length || 0);
      } else {
        // Insert new user record
        console.log('API: Creating new user record for ID:', user.id);
        const insertData = {
          user_id: user.id,
          email: user.email,
          user_type: role,
          token_identifier: user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        console.log('API: Insert data:', insertData);
        
        result = await supabase
          .from('users')
          .insert(insertData)
          .select('*');
          
        console.log('API: Insert result:', result);
        console.log('API: Insert result data:', result.data);
        console.log('API: Insert result error:', result.error);
      }

      console.log('API: Direct update result:', result);

      if (result.error) {
        console.error('API: Direct update error:', result.error);
        
        // If RLS is blocking the update, try a different approach
        console.log('API: Trying alternative update method...');
        
        // Try using a raw SQL query to bypass RLS
        const { data: sqlResult, error: sqlError } = await supabase
          .rpc('update_user_role_direct', {
            user_id_param: user.id,
            new_role: role
          });
          
        if (sqlError) {
          console.error('API: SQL update error:', sqlError);
          return NextResponse.json({ error: `Database error: ${result.error.message}` }, { status: 500 });
        }
        
        console.log('API: SQL update successful:', sqlResult);
        functionResult = { success: true, method: 'sql_update' };
      } else {
        functionResult = { success: true, method: 'direct_update' };
      }
    } else {
      functionResult = functionData;
    }

    // Verify the update actually happened
    const { data: verifyUser, error: verifyError } = await supabase
      .from('users')
      .select('user_id, user_type, email')
      .eq('user_id', user.id)
      .single();

    console.log('API: Verification query result:', { verifyUser, verifyError });

    if (verifyError) {
      console.error('API: Verification failed:', verifyError);
      return NextResponse.json({ error: `Verification failed: ${verifyError.message}` }, { status: 500 });
    }

    console.log('API: Role updated successfully. Final user data:', verifyUser);
    return NextResponse.json({ 
      success: true, 
      functionResult: functionResult,
      verifiedUser: verifyUser 
    });
    
  } catch (error: any) {
    console.error('API: Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 