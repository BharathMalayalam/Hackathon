import React, { useState } from 'react';
import type { AxiosError } from 'axios';
import { useForm, useFieldArray, type UseFormRegisterReturn } from 'react-hook-form';
import { registerTeam } from '../services/api';
import {
    CheckCircle2,
    Loader2,
    AlertCircle,
    ArrowRight,
    ChevronLeft,
    UploadCloud,
    FileText,
    User,
    Mail,
    Phone,
    Building2,
    GraduationCap,
    BookOpen,
    Users,
    Plus,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    department: string;
    yearOfStudy: string;
    preferredProblem: string;
    members: { name: string; phone: string; email: string }[];
    paymentScreenshot: FileList;
    pptFile: FileList;
};

const RegisterFormPage = () => {
    const { register, handleSubmit, formState: { errors, touchedFields }, watch, control } = useForm<FormData>({
        mode: "onTouched"
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'members' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const watchPaymentScreenshot = watch("paymentScreenshot");
    const watchPptFile = watch("pptFile");

    const onSubmit = async (data: FormData) => {
        try {
            setStatus('submitting');
            setErrorMessage('');

            const form = new FormData();
            form.append('fullName', data.fullName);
            form.append('email', data.email);
            form.append('phone', data.phone);
            form.append('college', data.college);
            form.append('department', data.department);
            form.append('yearOfStudy', data.yearOfStudy);
            form.append('preferredProblem', data.preferredProblem);
            form.append('qrCode', 'Static QR Displayed');
            form.append('members', JSON.stringify(data.members || []));

            const payment = data.paymentScreenshot?.[0];
            if (payment) form.append('paymentScreenshot', payment);

            const ppt = data.pptFile?.[0];
            if (ppt) form.append('pptFile', ppt);

            await registerTeam(form);
            setStatus('success');
        } catch (error: unknown) {
            console.error(error);
            setStatus('error');
            const e = error as AxiosError<{ error?: unknown }> | undefined;
            const msg = e?.response?.data?.error;
            setErrorMessage(typeof msg === 'string' && msg.trim() ? msg : 'Something went wrong processing your registration.');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-[85vh] flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-lg w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-10 md:p-14 rounded-[2rem] text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-xl shadow-blue-500/30"
                    >
                        <CheckCircle2 className="w-12 h-12 relative z-10" />
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Registration Complete!</h2>
                    <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                        Your team is officially registered for the hackathon. Look out for the confirmation email and next steps.
                    </p>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-hidden transition-all border border-slate-600 hover:border-slate-500 rounded-xl"
                    >
                        Return to Homepage
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative font-sans text-slate-50 selection:bg-blue-500/30 overflow-hidden pb-24">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-medium text-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Applications are open
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight mb-6"
                    >
                        Register Your Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Secure your spot in the next big hackathon. Fill out the details below carefully to ensure a smooth onboarding process.
                    </motion.p>
                </div>

                <AnimatePresence>
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 text-red-400 backdrop-blur-sm">
                                <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-semibold text-red-300">Submission Failed</h4>
                                    <p className="text-sm mt-1 opacity-90">{errorMessage}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:space-y-10">

                    {/* Section 1: Personal Info */}
                    <SectionCard title="Personal Information" description="Lead participant details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup
                                label="Full Name"
                                icon={User}
                                error={errors.fullName?.message}
                                isValid={!errors.fullName && touchedFields.fullName}
                            >
                                <input
                                    className={getInputClass(!!errors.fullName, !errors.fullName && touchedFields.fullName)}
                                    {...register("fullName", { required: "Full Name is required" })}
                                    placeholder="e.g. John Doe"
                                />
                            </InputGroup>

                            <InputGroup
                                label="Email Address"
                                icon={Mail}
                                error={errors.email?.message}
                                isValid={!errors.email && touchedFields.email}
                            >
                                <input
                                    type="email"
                                    className={getInputClass(!!errors.email, !errors.email && touchedFields.email)}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email form" }
                                    })}
                                    placeholder="e.g. name@domain.com"
                                />
                            </InputGroup>

                            <InputGroup
                                label="Phone Number"
                                icon={Phone}
                                error={errors.phone?.message}
                                isValid={!errors.phone && touchedFields.phone}
                            >
                                <input
                                    className={getInputClass(!!errors.phone, !errors.phone && touchedFields.phone)}
                                    {...register("phone", { required: "Phone number is required" })}
                                    placeholder="e.g. +91 9876543210"
                                />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Section 2: Academic Info */}
                    <SectionCard title="Academic Details" description="Tell us about your college">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="College Name" icon={Building2} error={errors.college?.message} isValid={!errors.college && touchedFields.college}>
                                <input className={getInputClass(!!errors.college, !errors.college && touchedFields.college)} {...register("college", { required: "College is required" })} placeholder="e.g. GCE, Erode" />
                            </InputGroup>

                            <InputGroup label="Department" icon={BookOpen} error={errors.department?.message} isValid={!errors.department && touchedFields.department}>
                                <input className={getInputClass(!!errors.department, !errors.department && touchedFields.department)} {...register("department", { required: "Department is required" })} placeholder="e.g. Information Technology" />
                            </InputGroup>

                            <InputGroup label="Year of Study" icon={GraduationCap} error={errors.yearOfStudy?.message} isValid={!errors.yearOfStudy && touchedFields.yearOfStudy}>
                                <div className="relative">
                                    <select className={`${getInputClass(!!errors.yearOfStudy, !errors.yearOfStudy && touchedFields.yearOfStudy)} appearance-none pr-10 bg-slate-900 text-slate-100 [&>option]:bg-slate-800 [&>option]:text-slate-100 hover:[&>option]:bg-blue-600 rounded-2xl cursor-pointer shadow-xl`} {...register("yearOfStudy", { required: "Required" })} defaultValue="">
                                        <option value="" disabled className="text-slate-500 bg-slate-900 py-2">Select Year</option>
                                        <option value="1" className="py-2 hover:bg-slate-700">1st Year</option>
                                        <option value="2" className="py-2 hover:bg-slate-700">2nd Year</option>
                                        <option value="3" className="py-2 hover:bg-slate-700">3rd Year</option>
                                        <option value="4" className="py-2 hover:bg-slate-700">4th Year</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                                        <ChevronLeft className="w-5 h-5 -rotate-90" />
                                    </div>
                                </div>
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Section 3: Team Info */}
                    <SectionCard title="Team Overview" description="Add team members (max 5 including leader)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Preferred Problem Tracker" icon={FileText} error={errors.preferredProblem?.message} isValid={!errors.preferredProblem && touchedFields.preferredProblem}>
                                <div className="relative">
                                    <select className={`${getInputClass(!!errors.preferredProblem, !errors.preferredProblem && touchedFields.preferredProblem)} appearance-none pr-10 bg-slate-900 text-slate-100 [&>option]:bg-slate-800 [&>option]:text-slate-100 hover:[&>option]:bg-blue-600 rounded-2xl cursor-pointer shadow-xl`} {...register("preferredProblem", { required: "Required" })} defaultValue="">
                                        <option value="" disabled className="text-slate-500 bg-slate-900 py-2">Select a track</option>
                                        <option value="PS-101" className="py-2 hover:bg-slate-700">PS-101: Smart Campus</option>
                                        <option value="PS-102" className="py-2 hover:bg-slate-700">PS-102: Web3 Credentials</option>
                                        <option value="PS-103" className="py-2 hover:bg-slate-700">PS-103: AI Mental Health</option>
                                        <option value="PS-104" className="py-2 hover:bg-slate-700">PS-104: Sustainable Food</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                                        <ChevronLeft className="w-5 h-5 -rotate-90" />
                                    </div>
                                </div>
                            </InputGroup>

                            <div className="rounded-2xl border border-slate-700/50 bg-slate-950/30 p-5 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-300" />
                                        Team strength
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">Leader + members</div>
                                </div>
                                <div className="text-2xl font-extrabold text-slate-100">{1 + fields.length}/5</div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm font-semibold text-slate-200">Team Members</div>
                                    <div className="text-xs text-slate-500">Add up to 4 members (leader is already included).</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (fields.length >= 4) return;
                                        append({ name: '', phone: '', email: '' });
                                    }}
                                    disabled={fields.length >= 4}
                                    className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-200 transition-colors disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add member
                                </button>
                            </div>

                            <div className="space-y-4">
                                {fields.map((f, idx) => (
                                    <div key={f.id} className="rounded-3xl border border-slate-700/50 bg-slate-950/20 p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-sm font-semibold text-slate-200">Member {idx + 1}</div>
                                            <button
                                                type="button"
                                                onClick={() => remove(idx)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-200 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <InputGroup label="Member Name" error={errors.members?.[idx]?.name?.message} isValid={!errors.members?.[idx]?.name && touchedFields.members?.[idx]?.name}>
                                                <input
                                                    className={getInputClass(!!errors.members?.[idx]?.name, !errors.members?.[idx]?.name && touchedFields.members?.[idx]?.name)}
                                                    {...register(`members.${idx}.name`, { required: "Name required" })}
                                                    placeholder="e.g. Alice"
                                                />
                                            </InputGroup>
                                            <InputGroup label="Phone" error={errors.members?.[idx]?.phone?.message} isValid={!errors.members?.[idx]?.phone && touchedFields.members?.[idx]?.phone}>
                                                <input
                                                    className={getInputClass(!!errors.members?.[idx]?.phone, !errors.members?.[idx]?.phone && touchedFields.members?.[idx]?.phone)}
                                                    {...register(`members.${idx}.phone`, { required: "Phone required" })}
                                                    placeholder="e.g. +91 9xxxx"
                                                />
                                            </InputGroup>
                                            <InputGroup label="Email" error={errors.members?.[idx]?.email?.message} isValid={!errors.members?.[idx]?.email && touchedFields.members?.[idx]?.email}>
                                                <input
                                                    type="email"
                                                    className={getInputClass(!!errors.members?.[idx]?.email, !errors.members?.[idx]?.email && touchedFields.members?.[idx]?.email)}
                                                    {...register(`members.${idx}.email`, { required: "Email required" })}
                                                    placeholder="e.g. member@email.com"
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                ))}

                                {fields.length === 0 && (
                                    <div className="rounded-3xl border border-slate-800 bg-slate-950/20 p-8 text-center text-slate-400">
                                        No additional members added yet. Click <span className="text-slate-200 font-semibold">Add member</span> to include team members.
                                    </div>
                                )}
                            </div>
                        </div>
                    </SectionCard>

                    {/* Section 4: Payment */}
                    <SectionCard title="Payment Details" description="Complete your registration fee">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            <div className="flex flex-col items-center justify-center p-8 bg-slate-900/40 rounded-3xl border border-slate-700/50 shadow-inner">
                                <span className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    Scan to Pay
                                </span>
                                <div className="w-52 h-52 bg-white rounded-2xl overflow-hidden p-3 shadow-xl shadow-blue-500/10 hover:scale-105 transition-transform duration-300">
                                    <img
                                        src="/src/assets/payment-qr.png"
                                        alt="Payment QR"
                                        className="w-full h-full object-cover rounded-xl"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://ajk-static.s3.amazonaws.com/Payment-QR-Code.png';
                                        }}
                                    />
                                </div>
                                <span className="text-center text-slate-400 text-sm mt-6 bg-slate-800/50 py-2 px-4 rounded-full border border-slate-700/50">
                                    Registration Fee: <span className="text-white font-bold tracking-wide">₹100</span>
                                </span>
                            </div>

                            <div className="h-full flex flex-col justify-center">
                                <div className="mb-2 flex items-center justify-between px-1">
                                    <label className="text-sm font-semibold text-slate-200">
                                        Payment Screenshot <span className="text-red-400">*</span>
                                    </label>
                                    {errors.paymentScreenshot?.message && (
                                        <span className="text-red-400 text-xs font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                            {errors.paymentScreenshot.message}
                                        </span>
                                    )}
                                </div>
                                <FileUploadZone
                                    register={register("paymentScreenshot", { required: "Screenshot is required" })}
                                    accept="image/*,.pdf"
                                    file={watchPaymentScreenshot?.[0]}
                                    isInvalid={!!errors.paymentScreenshot}
                                />
                                <p className="text-xs text-slate-500 mt-2 px-1">
                                    Upload a clear screenshot (or PDF) of the payment confirmation.
                                </p>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Section 5: PPT Submission */}
                    <SectionCard title="PPT Submission" description="Upload your project PPT (PDF only)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            <div className="rounded-3xl border border-slate-700/50 bg-slate-900/40 p-8 shadow-inner flex flex-col justify-center">
                                <div className="text-slate-200 font-semibold">What to include</div>
                                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                    <li>Project title + team name</li>
                                    <li>Problem statement + solution overview</li>
                                    <li>Tech stack + architecture</li>
                                    <li>Demo flow + future scope</li>
                                </ul>
                                <div className="mt-6 text-xs text-slate-500">
                                    File type: <span className="text-slate-300 font-semibold">PDF</span> • Max 15MB
                                </div>
                            </div>

                            <div className="h-full flex flex-col justify-center">
                                <div className="mb-2 flex items-center justify-between px-1">
                                    <label className="text-sm font-semibold text-slate-200">
                                        PPT PDF <span className="text-red-400">*</span>
                                    </label>
                                    {errors.pptFile?.message && (
                                        <span className="text-red-400 text-xs font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                            {errors.pptFile.message as string}
                                        </span>
                                    )}
                                </div>
                                <FileUploadZone
                                    register={register("pptFile", { required: "PPT PDF is required" })}
                                    accept="application/pdf,.pdf"
                                    file={watchPptFile?.[0]}
                                    isInvalid={!!errors.pptFile}
                                />
                                <p className="text-xs text-slate-500 mt-2 px-1">
                                    Upload your PPT converted to PDF.
                                </p>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Action Bar */}
                    <div className="pt-4">
                        <motion.button
                            whileHover={{ scale: 1.01, boxShadow: "0 10px 40px -10px rgba(59,130,246,0.6)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg py-5 rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center gap-3 z-10">
                                {status === 'submitting' ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Registration</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                        <p className="text-center text-slate-500 text-xs mt-6 flex justify-center items-center gap-1.5">
                            By submitting this form, you agree to the hackathon Terms and Conditions.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

/* Helper Components */

const SectionCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-slate-900/50 backdrop-blur-3xl border border-slate-700/50 rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden group"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="mb-8 md:mb-10">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                {title}
            </h3>
            <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
        {children}
    </motion.div>
);

const InputGroup = ({
    label,
    error,
    icon: Icon,
    isValid,
    children
}: {
    label: string,
    error?: string,
    icon?: React.ComponentType<{ className?: string }>,
    isValid?: boolean,
    children: React.ReactNode
}) => (
    <div className="flex flex-col gap-2 relative">
        <div className="flex justify-between items-baseline px-1">
            <label className="text-sm font-semibold text-slate-200">
                {label} <span className="text-red-400">*</span>
            </label>
            <AnimatePresence>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-red-400 text-xs font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20"
                    >
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
        <div className="relative group">
            {Icon && (
                <div className="absolute left-4 top-[1.1rem] text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none z-10">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            {children}
            {isValid && (
                <div className="absolute right-4 top-[1.1rem] text-green-400 transition-colors pointer-events-none z-10">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
            )}
        </div>
    </div>
);

const getInputClass = (isError: boolean, isSuccess?: boolean) => {
    const base = "w-full bg-slate-950/40 border rounded-2xl pl-12 pr-11 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-4 transition-all duration-300 font-medium";

    if (isError) {
        return `${base} border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-500/5`;
    }
    if (isSuccess) {
        return `${base} border-green-500/30 focus:border-blue-500 focus:ring-blue-500/20`;
    }
    return `${base} border-slate-700/60 hover:border-slate-500 focus:border-blue-500 focus:ring-blue-500/20 shadow-inner`;
};

const FileUploadZone = ({ register, accept, file, isInvalid }: { register: UseFormRegisterReturn, accept: string, file?: File, isInvalid?: boolean }) => {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [file]);

    const borderClass = isInvalid
        ? 'border-red-500 hover:border-red-400 bg-red-500/5'
        : file
            ? 'border-blue-500 bg-blue-500/5'
            : 'border-slate-700 hover:border-blue-500/50 bg-slate-950/40 hover:bg-slate-900/60 shadow-inner';

    return (
        <div className="relative w-full h-full min-h-[220px] overflow-hidden transition-all duration-300 ease-in-out group rounded-2xl">
            <input
                type="file"
                accept={accept}
                {...register}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-300 ${borderClass}`}>
                {file ? (
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center w-full z-0">
                        {previewUrl ? (
                            <div className="w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-lg border border-blue-500/30">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
                                <FileText className="w-7 h-7" />
                            </div>
                        )}
                        <span className="text-slate-100 font-semibold text-center truncate w-full px-2 max-w-[200px]">{file.name}</span>
                        <span className="text-blue-400 hover:text-blue-300 transition-colors text-sm mt-2 font-medium bg-blue-500/10 px-3 py-1 rounded-full cursor-pointer z-20 relative">Change file</span>
                    </motion.div>
                ) : (
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center z-0">
                        <div className="w-16 h-16 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:scale-110 shadow-lg">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <span className="text-slate-200 font-semibold mb-2 text-center">Click or Drag to Upload</span>
                        <span className="text-slate-500 text-sm font-medium text-center">Supported: JPG, PNG, PDF (Max 5MB)</span>
                    </motion.div>
                )}
            </div>
        </div >
    );
};

export default RegisterFormPage;
