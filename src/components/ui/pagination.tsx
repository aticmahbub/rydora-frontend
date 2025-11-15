import {Button} from '@/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5;

        let start = Math.max(1, currentPage - Math.floor(showPages / 2));
        let end = Math.min(totalPages, start + showPages - 1);

        if (end - start + 1 < showPages) {
            start = Math.max(1, end - showPages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className='flex items-center gap-2'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className='w-4 h-4' />
                    Previous
                </Button>

                <div className='flex items-center gap-1'>
                    {getPageNumbers().map((page) => (
                        <Button
                            key={page}
                            variant={
                                currentPage === page ? 'default' : 'outline'
                            }
                            size='sm'
                            onClick={() => onPageChange(page)}
                            className='w-10 h-10'
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRight className='w-4 h-4' />
                </Button>
            </div>

            <div className='text-sm text-gray-600'>
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
}
