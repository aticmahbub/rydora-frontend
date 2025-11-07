import {
    useId,
    useMemo,
    useState,
    forwardRef,
    type ChangeEvent,
    type FocusEvent,
} from 'react';
import {CheckIcon, EyeIcon, EyeOffIcon, XIcon} from 'lucide-react';
import {Input} from '@/components/ui/input';

// Define props type for RHF compatibility
interface PasswordProps {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    name?: string;
}

const Password = forwardRef<HTMLInputElement, PasswordProps>(
    ({value = '', onChange, onBlur, name}, ref) => {
        const id = useId();
        const [isVisible, setIsVisible] = useState(false);

        const toggleVisibility = () => setIsVisible((prev) => !prev);

        const checkStrength = (pass: string) => {
            const requirements = [
                {regex: /.{8,}/, text: 'At least 8 characters'},
                {regex: /[0-9]/, text: 'At least 1 number'},
                {regex: /[a-z]/, text: 'At least 1 lowercase letter'},
                {regex: /[A-Z]/, text: 'At least 1 uppercase letter'},
            ];
            return requirements.map((req) => ({
                met: req.regex.test(pass),
                text: req.text,
            }));
        };

        const strength = useMemo(() => checkStrength(value), [value]);
        const strengthScore = strength.filter((req) => req.met).length;

        const getStrengthColor = (score: number) => {
            if (score === 0) return 'bg-border';
            if (score <= 1) return 'bg-red-500';
            if (score <= 2) return 'bg-orange-500';
            if (score === 3) return 'bg-amber-500';
            return 'bg-emerald-500';
        };

        const getStrengthText = (score: number) => {
            if (score === 0) return 'Enter a password';
            if (score <= 2) return 'Weak password';
            if (score === 3) return 'Medium password';
            return 'Strong password';
        };

        return (
            <div>
                <div className='*:not-first:mt-2'>
                    <div className='relative'>
                        <Input
                            id={id}
                            name={name}
                            type={isVisible ? 'text' : 'password'}
                            placeholder='Password'
                            className='pe-9'
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                            aria-describedby={`${id}-description`}
                        />
                        <button
                            type='button'
                            onClick={toggleVisibility}
                            className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground'
                        >
                            {isVisible ? (
                                <EyeOffIcon size={16} />
                            ) : (
                                <EyeIcon size={16} />
                            )}
                        </button>
                    </div>
                </div>

                <div
                    className='mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border'
                    role='progressbar'
                    aria-valuenow={strengthScore}
                    aria-valuemin={0}
                    aria-valuemax={4}
                >
                    <div
                        className={`h-full ${getStrengthColor(
                            strengthScore,
                        )} transition-all duration-500 ease-out`}
                        style={{width: `${(strengthScore / 4) * 100}%`}}
                    />
                </div>

                <p
                    id={`${id}-description`}
                    className='mb-2 text-sm font-medium text-foreground'
                >
                    {getStrengthText(strengthScore)}. Must contain:
                </p>

                <ul className='space-y-1.5' aria-label='Password requirements'>
                    {strength.map((req, i) => (
                        <li key={i} className='flex items-center gap-2'>
                            {req.met ? (
                                <CheckIcon
                                    size={16}
                                    className='text-emerald-500'
                                />
                            ) : (
                                <XIcon
                                    size={16}
                                    className='text-muted-foreground/80'
                                />
                            )}
                            <span
                                className={`text-xs ${
                                    req.met
                                        ? 'text-emerald-600'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {req.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
);

Password.displayName = 'Password';
export default Password;
