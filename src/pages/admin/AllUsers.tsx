import {useState} from 'react';
import {useGetUsersQuery} from '@/redux/features/user/user.api';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {role} from '@/constants/role';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import type {UserData} from '@/types';

export default function AllUsers() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');

    const {data, isLoading, error} = useGetUsersQuery({
        page,
        limit,
        search,
        role: selectedRole === 'all' ? undefined : selectedRole,
    });

    const responseData = data?.data;

    const users: UserData[] = Array.isArray(responseData)
        ? responseData
        : responseData?.users || [];

    const meta = data?.meta || {total: 0, page: 1, totalPages: 1};
    const total = Number(meta.total) || 0;
    const currentPage = Number(meta.page) || 1;
    const totalPages = Number(meta.totalPages) || 1;

    const currentPageNum = Number(page);
    const totalPagesNum = Number(totalPages);

    console.log('Full API response:', data);
    console.log('Response data:', responseData);
    console.log('Users array:', users);
    console.log('Meta:', meta);
    console.log('Current page:', currentPageNum, 'Total pages:', totalPagesNum);

    if (isLoading) {
        return (
            <div className='container mx-auto py-8'>
                <div className='text-center'>
                    <div className='text-lg'>Loading users...</div>
                </div>
            </div>
        );
    }

    if (error) {
        console.error('Error loading users:', error);
        return (
            <div className='container mx-auto py-8'>
                <div className='text-center text-red-500'>
                    <h2 className='text-xl font-semibold mb-2'>Error</h2>
                    <p>Failed to load users. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-8'>
            <div className='space-y-6'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            All Users
                        </h1>
                        <p className='text-muted-foreground'>
                            Manage and view all system users
                        </p>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                        Total: {total} users
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>
                            Filter users by role or search by name/email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                            <Input
                                placeholder='Search by name or email...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='max-w-sm'
                            />

                            <Select
                                value={selectedRole}
                                onValueChange={setSelectedRole}
                            >
                                <SelectTrigger className='w-40'>
                                    <SelectValue placeholder='Filter by role' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>
                                        All Roles
                                    </SelectItem>
                                    <SelectItem value={role.ADMIN}>
                                        Admin
                                    </SelectItem>
                                    <SelectItem value={role.SUPER_ADMIN}>
                                        Super Admin
                                    </SelectItem>
                                    <SelectItem value={role.DRIVER}>
                                        Driver
                                    </SelectItem>
                                    <SelectItem value={role.RIDER}>
                                        Rider
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={limit.toString()}
                                onValueChange={(value) =>
                                    setLimit(Number(value))
                                }
                            >
                                <SelectTrigger className='w-32'>
                                    <SelectValue placeholder='Items per page' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='10'>
                                        10 per page
                                    </SelectItem>
                                    <SelectItem value='20'>
                                        20 per page
                                    </SelectItem>
                                    <SelectItem value='50'>
                                        50 per page
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users List</CardTitle>
                        <CardDescription>
                            Showing {users.length} of {total} users (Page{' '}
                            {currentPage} of {totalPages})
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {users.length === 0 ? (
                            <div className='text-center py-8'>
                                <p className='text-muted-foreground'>
                                    No users found
                                </p>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
                                    >
                                        <div className='flex items-center space-x-4 flex-1'>
                                            <div className='shrink-0'>
                                                <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
                                                    <span className='font-medium text-gray-700 text-lg'>
                                                        {user.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            'U'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex-1'>
                                                <div className='flex items-center space-x-2 mb-1'>
                                                    <h3 className='font-semibold text-lg'>
                                                        {user.name || 'No Name'}
                                                    </h3>
                                                    {!user.isVerified && (
                                                        <Badge
                                                            variant='outline'
                                                            className='text-xs'
                                                        >
                                                            Unverified
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className='text-sm text-muted-foreground'>
                                                    {user.email}
                                                </p>
                                                <p className='text-xs text-muted-foreground mt-1'>
                                                    Joined:{' '}
                                                    {new Date(
                                                        user.createdAt,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-end space-y-2'>
                                            <Badge
                                                variant={
                                                    user.role ===
                                                    role.SUPER_ADMIN
                                                        ? 'destructive'
                                                        : user.role ===
                                                          role.ADMIN
                                                        ? 'default'
                                                        : user.role ===
                                                          role.DRIVER
                                                        ? 'secondary'
                                                        : 'outline'
                                                }
                                            >
                                                {user.role?.replace('_', ' ') ||
                                                    'Unknown'}
                                            </Badge>
                                            <div className='flex space-x-2'>
                                                <Badge
                                                    variant={
                                                        user.isActive ===
                                                        'ACTIVE'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {user.isActive === 'ACTIVE'
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </Badge>
                                                {user.isVerified && (
                                                    <Badge variant='outline'>
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {totalPagesNum > 1 && (
                    <Card>
                        <CardContent className='p-4'>
                            <div className='flex items-center justify-between'>
                                <div className='text-sm text-muted-foreground'>
                                    Page {currentPage} of {totalPages} • {total}{' '}
                                    total users
                                </div>
                                <div className='flex space-x-2'>
                                    <Button
                                        variant='outline'
                                        disabled={currentPageNum <= 1}
                                        onClick={() =>
                                            setPage(currentPageNum - 1)
                                        }
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant='outline'
                                        disabled={
                                            currentPageNum >= totalPagesNum
                                        }
                                        onClick={() =>
                                            setPage(currentPageNum + 1)
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
