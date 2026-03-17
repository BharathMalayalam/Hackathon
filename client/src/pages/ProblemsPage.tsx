
import ProblemCard from '../components/ProblemCard';
import { motion } from 'framer-motion';

const problems = [
    {
        id: 'PS-101',
        title: 'Smart Campus Parking Assistant',
        description: 'Develop an AI-driven, highly optimized system using IoT sensors to manage and route students to available parking spots in real-time, reducing morning congestion.',
        tags: ['IoT', 'AI', 'Mobile App']
    },
    {
        id: 'PS-102',
        title: 'Blockchain Credential Verification',
        description: 'Create a decentralized platform for universities to issue and verify student diplomas and certificates instantly, combating credential fraud.',
        tags: ['Blockchain', 'Web3', 'Security']
    },
    {
        id: 'PS-103',
        title: 'AI Mental Health Companion',
        description: 'Build an empathetic, responsive AI chatbot that can provide early intervention strategies and resources for students dealing with academic stress.',
        tags: ['AI/NLP', 'Healthcare', 'Bot']
    },
    {
        id: 'PS-104',
        title: 'Sustainable Food Distribution',
        description: 'Design a platform connecting local restaurants and campus dining with food banks to predict and smoothly process food donations in real time.',
        tags: ['Logistics', 'Web App', 'Social Good']
    }
];

const ProblemsPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Problem Statements</h1>
                <p className="text-slate-400 text-lg max-w-2xl">
                    Choose a challenge that inspires you. Your solution could have a massive impact on the real world. You will need to specify your preferred track during registration.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {problems.map((problem, idx) => (
                    <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                    >
                        <ProblemCard {...problem} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProblemsPage;
