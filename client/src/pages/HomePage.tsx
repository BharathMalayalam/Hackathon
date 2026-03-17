import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-blue-400 text-sm font-medium mb-8">
                        <Rocket className="w-4 h-4" />
                        <span>Registration is now Open</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8 tracking-tight">
                        Build the Future.<br />Deploy Innovation.
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join 500+ student developers for a 48-hour coding marathon.
                        Solve real-world problems, learn modern tech stacks, and win amazing prizes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            Register Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/problems"
                            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-lg transition-all border border-slate-700 hover:border-slate-600"
                        >
                            View Problems
                        </Link>
                    </div>
                </motion.div>
            </section>
            {/* Event Timeline Preview */}
            <section className="w-full max-w-5xl mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold mb-12 text-white">Event Timeline</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500 before:to-transparent">
                    <TimelineItem date="Oct 10, 9:00 AM" title="Opening Ceremony" description="Kickoff and rules introduction." />
                    <TimelineItem date="Oct 10, 10:00 AM" title="Hacking Begins" description="Start formulating your ideas and building." />
                    <TimelineItem date="Oct 11, 2:00 PM" title="Mentorship Sessions" description="Get feedback from industry experts." />
                    <TimelineItem date="Oct 12, 10:00 AM" title="Submission Deadline" description="Push your final commits." />
                    <TimelineItem date="Oct 12, 3:00 PM" title="Award Ceremony" description="Winners announced and prizes distributed." />
                </div>
            </section>
        </div>
    );
};


const TimelineItem = ({ date, title, description }: { date: string, title: string, description: string }) => (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-500 bg-slate-900 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <div className="w-2 h-2 rounded-full bg-current" />
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/80 p-6 border border-slate-700 rounded-2xl text-left hover:border-slate-600 transition-colors">
            <div className="flex flex-col sm:flex-row items-baseline gap-2 mb-2">
                <h4 className="font-bold text-lg text-white">{title}</h4>
                <span className="text-sm font-medium text-blue-400">{date}</span>
            </div>
            <p className="text-slate-400">{description}</p>
        </div>
    </div>
);

export default HomePage;
