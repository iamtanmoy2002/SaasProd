'use client'
import { UserCircle, Moon, Sun, Music, Headphones, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { createClient } from '../../supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function UserProfile() {
    const supabase = createClient()
    const router = useRouter()
    const [theme, setTheme] = useState('light')
    const [userType, setUserType] = useState<string | null>(null)
    const [userProfile, setUserProfile] = useState<any>(null)

    useEffect(() => {
        // Get theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
        document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        
        // Get user profile
        const getUserProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('users')
                    .select('user_type, full_name, email, avatar_url')
                    .eq('user_id', user.id)
                    .single()
                setUserType(data?.user_type || 'listener')
                setUserProfile(data)
            }
        }
        getUserProfile()
    }, [supabase])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    const switchRole = async (newRole: 'artist' | 'listener') => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            await supabase
                .from('users')
                .update({ user_type: newRole })
                .eq('user_id', user.id)
            setUserType(newRole)
            router.refresh()
        }
    }

    const getInitials = (name: string, email: string) => {
        if (name) {
            return name
                .split(' ')
                .map(word => word.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2)
        }
        return email.charAt(0).toUpperCase()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar_url} />
                        <AvatarFallback className="bg-orange-500 text-white text-sm font-bold">
                            {getInitials(userProfile?.full_name || '', userProfile?.email || '')}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={toggleTheme} className="flex items-center gap-2">
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                    onClick={() => switchRole('artist')}
                    className={`flex items-center gap-2 ${userType === 'artist' ? 'bg-purple-100 dark:bg-purple-900' : ''}`}
                >
                    <Music className="h-4 w-4" />
                    Switch to Artist
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                    onClick={() => switchRole('listener')}
                    className={`flex items-center gap-2 ${userType === 'listener' ? 'bg-purple-100 dark:bg-purple-900' : ''}`}
                >
                    <Headphones className="h-4 w-4" />
                    Switch to Listener
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => router.push('/profile')} className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Profile Settings
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={async () => {
                    await supabase.auth.signOut()
                    router.push("/")
                }} className="text-red-600 dark:text-red-400">
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}