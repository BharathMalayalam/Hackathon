import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const GitGuidePage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Git Guide</h1>
                    <p className="text-slate-400 text-lg">
                        Master the basics of version control to collaborate efficiently with your team.
                    </p>
                </div>
                <a
                    href="/src/assets/git-guide.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-xl transition-colors shrink-0 font-medium"
                >
                    <Download className="w-5 h-5 text-blue-400" />
                    Download PDF Guide
                </a>
            </div>

            <div className="space-y-12">
                <GuideSection
                    step="Step 1"
                    title="Install Git"
                    content="Download and install Git from the official website corresponding to your operating system. Once installed, verify the installation by opening your terminal and typing git --version."
                />

                <GuideSection
                    step="Step 2"
                    title="Create a GitHub Account"
                    content="Head over to github.com and sign up for a free account. GitHub will be the remote server where your team's code repository resides."
                />

                <GuideSection
                    step="Step 3"
                    title="Git Initialize"
                    content="Initialize a new Git repository in your project directory by running git init. This creates a .git directory where Git stores all the repository data."
                    code='git init'
                />

                <GuideSection
                    step="Step 4"
                    title="Add the files to the repository"
                    content="Add the files to the repository by running git add ."
                    code='git add .'
                />

                <GuideSection
                    step="Step 5"
                    title="Commit the changes"
                    content="Commit the changes by running git commit -m "
                    code='git commit -m "initial commit"'
                />

                <GuideSection
                    step="Step 6"
                    title="Connect to github"
                    code="git remote add origin <repository-url>"
                />

                <GuideSection
                    step="Step 7"
                    title="Push the changes to github"
                    code="git push -u origin main"
                />
                <GuideSection
                    step="Step 8"
                    title="Collaborate your team members"
                    content="Collaborate with your team members by inviting them to your repository via the 'Settings' tab on GitHub under 'Collaborators'. Once they accept the invitation, they can clone the project to their local machine to start contributing."
                />
                <GuideSection
                    step="Step 9"
                    title="Clone the repository"
                    content="Clone the repository to your local machine by running git clone <repository-url>"
                    code="git clone <repository-url>"
                />
                
            </div>
        </div>
    );
};

const GuideSection = ({ step, title, content, code }: { step: string, title: string, content?: string, code?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
    >
        <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-bold rounded-lg uppercase tracking-wider">
                    {step}
                </span>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            {content && <p className="text-slate-300 leading-relaxed max-w-3xl mb-6">{content}</p>}

            {code && (
                <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 overflow-hidden">
                    <div className="flex items-center px-4 py-2 border-b border-slate-800 bg-slate-900">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                        </div>
                        <div className="w-full flex justify-center text-xs font-mono text-slate-500">terminal</div>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="text-blue-300 font-mono text-sm leading-relaxed">
                            <code>{code}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    </motion.div>
);

export default GitGuidePage;
