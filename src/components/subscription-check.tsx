import { redirect } from 'next/navigation';
import { checkUserSubscription } from '@/app/actions';
import { createClient } from '../../supabase/server';

interface SubscriptionCheckProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export async function SubscriptionCheck({
    children,
    redirectTo = '/pricing'
}: SubscriptionCheckProps) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/sign-in');
    }

    const isSubscribed = await checkUserSubscription();

    if (!isSubscribed) {
        redirect(redirectTo);
    }

    return <>{children}</>;
}
